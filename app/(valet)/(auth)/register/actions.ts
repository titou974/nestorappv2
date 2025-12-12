"use server";

import {
  frenchPhoneNumberSchema,
  nameSchema,
  passwordSchema,
} from "@/constants/validations";
import z from "zod";

const schema = z.object({
  name: nameSchema,
  phone: frenchPhoneNumberSchema,
  password: passwordSchema,
});

export default async function register(
  siteId: string,
  initialState: any,
  formData: FormData
) {
  const data = Object.fromEntries(formData.entries());
  console.log("data", data);

  const validatedFields = schema.safeParse(data);

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error),
    };
  }
}
