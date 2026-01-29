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
import { revalidatePath } from "next/cache";
import { ROUTES } from "@/constants/routes";

const resend = new Resend(process.env.RESEND_KEY);

export async function sendTicketByEmail(
  userId: string,
  emailContent: EmailTicketActionProps,
  initialState: any,
  formData: FormData,
) {
  const email = formData.get("email");

  const { siteName, scannedAt, ticketPrice, ticketNumber, companyCgu } =
    emailContent;

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
    return {
      title: StringsFR.emailTicketSent,
      content: StringsFR.emailTicketSentDescription,
      status: "SUCCESS" as const,
    };
  } catch (error) {
    return {
      title: StringsFR.oupsError,
      content: StringsFR.emailTicketError,
      status: "ERROR" as const,
    };
  }
}

export async function askToPickupCar(
  ticketId: string,
  requestedPickupTime: string,
) {
  const selectedOption = PICKUP_TIME_OPTIONS.find(
    (opt) =>
      opt.id === requestedPickupTime || opt.value === requestedPickupTime,
  );
  const minutesToAdd = selectedOption?.minutes ?? 10; // Fallback 10min

  // ✅ Calculer la date de pickup
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
    const sms = await sendAMessageToValet(
      ticket.siteId,
      ticket.ticketNumber,
      ticket.immatriculation,
    );
    console.log("sms envoyéééé", sms);
    revalidatePath(ROUTES.NEW_TICKET);
    return {
      title: StringsFR.retrieveCarAsked,
      content: StringsFR.retrieveCarAskedDescription,
      status: "SUCCESS" as const,
    };
  } catch (error) {
    return {
      title: StringsFR.oupsError,
      content: StringsFR.retrieveCarError,
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

  await sendSms(
    workSession?.user.phoneNumber as string,
    `Un client souhaite récupérer sa voiture: le ticket ${ticketNumber} ${immatriculation ? `avec la plaque ${immatriculation}` : "."}`,
  );
}
