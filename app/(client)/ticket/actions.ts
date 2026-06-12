"use server";

import EmailTemplate from "@/emails/EmailTemplate";
import { StringsFR } from "@/constants/fr_string";
import { emailSchema } from "@/constants/validations";
import prisma from "@/lib/prisma";
import { EmailTicketActionProps } from "@/types/site";
import { render } from "@react-email/components";
import { Resend } from "resend";
import z from "zod";
import sendSms from "@/app/actions";
import { PICKUP_TIME_OPTIONS } from "@/constants";
import { revalidateTag } from "next/cache";
import { createSumUpCheckout, getSumUpCheckout } from "@/lib/sumup";

const resend = new Resend(process.env.RESEND_KEY);

export async function sendTicketByEmail(
  userId: string,
  emailContent: EmailTicketActionProps,
  initialState: any,
  formData: FormData,
) {
  let success;
  const email = formData.get("email");

  const {
    siteName,
    scannedAt,
    ticketPrice,
    ticketNumber,
    companyCgu,
    ticketId,
    emailSentHour,
  } = emailContent;

  const validatedFields = emailSchema.safeParse(email);

  if (!validatedFields.success) {
    return {
      title: StringsFR.emailAdressError,
      content: StringsFR.emailAdressErrorDescription,
      errors: z.flattenError(validatedFields.error),
    };
  }

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        email: email as string,
      },
    });
    await resend.emails.send({
      from: `${StringsFR.emailAuthor} <${process.env.RESEND_MAIL}>`,
      to: [email as string],
      subject: StringsFR.emailSubject,
      html: await render(
        EmailTemplate({
          siteName,
          scannedAt,
          ticketPrice,
          ticketNumber,
          companyCgu,
          email: email as string,
        }),
        {
          pretty: true,
        },
      ),
    });
    if (!emailSentHour) {
      await prisma.ticket.update({
        where: {
          id: ticketId,
        },
        data: {
          emailSentHour: new Date(),
        },
      });
    }
    success = true;
  } catch {
    return {
      title: StringsFR.oupsError,
      content: StringsFR.emailTicketError,
      status: "ERROR" as const,
    };
  }
  if (success) {
    revalidateTag("ticket", "max");
    return {
      title: StringsFR.emailTicketSent,
      content: StringsFR.emailTicketSentDescription,
      status: "SUCCESS" as const,
    };
  }
}

export async function askToPickupCar(
  ticketId: string,
  requestedPickupTime: string,
) {
  let messageResponse;
  const selectedOption = PICKUP_TIME_OPTIONS.find(
    (opt) =>
      opt.id === requestedPickupTime || opt.value === requestedPickupTime,
  );
  const minutesToAdd = selectedOption?.minutes ?? 10;

  const dateRequestToPickupCar = new Date(
    Date.now() + minutesToAdd * 60 * 1000,
  );
  try {
    const ticket = await prisma.ticket.update({
      where: {
        id: ticketId,
      },
      data: {
        requestedPickupTime: dateRequestToPickupCar,
      },
    });
    messageResponse = await sendAMessageToValet(
      ticket.siteId,
      ticket.ticketNumber,
      ticket.immatriculation,
    );
  } catch {
    return {
      title: StringsFR.oupsError,
      content: StringsFR.retrieveCarError,
      status: "ERROR" as const,
    };
  }

  if (messageResponse.from) {
    revalidateTag("ticket", "max");
    return {
      title: StringsFR.retrieveCarAsked,
      content: StringsFR.retrieveCarAskedDescription,
      status: "SUCCESS" as const,
    };
  }
}

export async function submitReview(
  ticketId: string,
  rating: boolean,
  comment: string,
) {
  try {
    await prisma.review.create({
      data: {
        ticketId,
        rating,
        comment: comment || null,
      },
    });
  } catch {
    return {
      title: StringsFR.oupsError,
      content: StringsFR.satisfactionError,
      status: "ERROR" as const,
    };
  }

  revalidateTag("ticket", "max");
  return {
    title: StringsFR.satisfactionSuccess,
    content: StringsFR.satisfactionSuccessDescription,
    status: "SUCCESS" as const,
  };
}

export async function createTicketCheckout(ticketId: string) {
  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
      include: { site: true },
    });

    if (!ticket) {
      return { status: "ERROR" as const, message: StringsFR.paymentUnavailable };
    }

    // Paiement activé uniquement sur les sites configurés pour (comme les autres features).
    if (!ticket.site.enablePayment) {
      return { status: "ERROR" as const, message: StringsFR.paymentUnavailable };
    }

    if (ticket.paidAt) {
      return { status: "ALREADY_PAID" as const };
    }

    // Le montant provient de la base (jamais du client) pour éviter toute falsification.
    const amount = Number.parseFloat(ticket.site.ticketPrice ?? "0");
    if (!Number.isFinite(amount) || amount <= 0) {
      return { status: "ERROR" as const, message: StringsFR.paymentUnavailable };
    }

    const checkout = await createSumUpCheckout({
      reference: `ticket-${ticket.id}-${Date.now()}`,
      amount,
      currency: "EUR",
      description: `${StringsFR.valetService} · #${ticket.ticketNumber}`,
    });

    await prisma.ticket.update({
      where: { id: ticket.id },
      data: { sumupCheckoutId: checkout.id },
    });

    return {
      status: "OK" as const,
      checkoutId: checkout.id,
      amount: amount.toFixed(2),
    };
  } catch (error) {
    console.error("createTicketCheckout", error);
    return { status: "ERROR" as const, message: StringsFR.paymentUnavailable };
  }
}

export async function confirmTicketPayment(
  ticketId: string,
  checkoutId: string,
) {
  try {
    // On ne fait jamais confiance au seul callback client : on revérifie auprès de SumUp.
    const checkout = await getSumUpCheckout(checkoutId);

    if (checkout.status !== "PAID") {
      return {
        title: StringsFR.paymentErrorTitle,
        content: StringsFR.paymentErrorContent,
        status: "ERROR" as const,
      };
    }

    const transactionCode =
      checkout.transactions?.find((t) => t.status === "SUCCESSFUL")?.id ??
      checkout.transactions?.[0]?.id ??
      null;

    await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        paidAt: new Date(),
        sumupCheckoutId: checkout.id,
        sumupTransactionCode: transactionCode,
      },
    });

    revalidateTag("ticket", "max");
    return {
      title: StringsFR.paymentSuccessTitle,
      content: StringsFR.paymentSuccessContent,
      status: "SUCCESS" as const,
    };
  } catch (error) {
    console.error("confirmTicketPayment", error);
    return {
      title: StringsFR.paymentErrorTitle,
      content: StringsFR.paymentErrorContent,
      status: "ERROR" as const,
    };
  }
}

async function sendAMessageToValet(
  siteId: string,
  ticketNumber: number,
  immatriculation: string | null,
) {
  const workSession = await prisma.workSession.findFirst({
    where: {
      siteId,
      endAt: null,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          name: true,
          phoneNumber: true,
        },
      },
    },
  });

  const response = await sendSms(
    workSession?.user.phoneNumber as string,
    `Nestor: un client souhaite récupérer sa voiture: le ticket ${ticketNumber} ${immatriculation ? `avec la plaque ${immatriculation}` : "."}`,
  );

  return response;
}
