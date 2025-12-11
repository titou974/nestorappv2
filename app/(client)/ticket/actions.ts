"use server";

import EmailTemplate from "@/components/ticket/EmailTemplate";
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
    console.log("email pas bon");

    return {
      message: "Invalid email address", // ✅ Now has message
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
      from: `Nestor App <${process.env.RESEND_MAIL}>`,
      to: [email as string],
      subject: "Votre ticket",
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
      message: "Email sent successfully",
      status: "SUCCESS" as const,
    };
  } catch (error) {
    return {
      message: "Something went wrong",
      status: "ERROR" as const,
    };
  }
}
