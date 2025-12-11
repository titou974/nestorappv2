"use server";

import EmailTemplate from "@/components/ticket/EmailTemplate";
import { StringsFR } from "@/constants/fr_string";
import { emailSchema } from "@/constants/validations";
import prisma from "@/lib/prisma";
import { EmailTicketActionProps } from "@/types/site";
import { render } from "@react-email/components";
import { Resend } from "resend";
import z from "zod";

const resend = new Resend(process.env.RESEND_KEY);

export default async function sendTicketByEmail(
  userId: string,
  emailContent: EmailTicketActionProps,
  initialState: any,
  formData: FormData
) {
  const email = formData.get("email");

  const { siteName, scannedAt, ticketPrice, ticketNumber, companyCgu } =
    emailContent;

  const validatedFields = emailSchema.safeParse(email);

  if (!validatedFields.success) {
    return {
      message: StringsFR.emailAdressError,
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
        }
      ),
    });
    return {
      message: StringsFR.emailTicketSent,
      status: "SUCCESS" as const,
    };
  } catch (error) {
    return {
      message: StringsFR.emailTicketError,
      status: "ERROR" as const,
    };
  }
}
