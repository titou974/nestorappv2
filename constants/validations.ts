import z from "zod";

export const emailSchema = z.email();

export const nameSchema = z.string().min(3);

export const frenchPhoneNumberSchema = z
  .string()
  .regex(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/)
  .transform((val) => val.replace(/[\s.-]/g, ""));

export const passwordSchema = z.string().min(6);
