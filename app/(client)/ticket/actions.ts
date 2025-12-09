"use server";

import { emailSchema } from "@/constants/validations";
import { EmailProps, EmailTicketActionProps } from "@/types/site";
import sendEmailTicket from "@/utils/email/sendEmail";
import patchUser from "@/utils/user/patchUser";

export default async function sendTicketByEmail(
  userId: string,
  emailContent: EmailTicketActionProps,
  initialState: any,
  formData: FormData
) {
  const email = formData.get("email");
  console.log("data", email, emailContent, userId);
  const validatedFields = emailSchema.safeParse({
    email: email,
  });

  if (!validatedFields.success) {
    console.log("non");
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await patchUser(userId, email as string);
    await sendEmailTicket({
      ...emailContent,
      email: email as string,
    });
    console.log("c'est envoyé");
  } catch (error) {
    return {
      message: "Something went wrong",
    };
  }
}
