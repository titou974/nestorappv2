import z from "zod";

export const emailSchema = z.email();

export const nameSchema = z.string().min(3);

export const frenchPhoneNumberSchema = z
  .string()
  .regex(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/)
  .transform((val) => val.replace(/[\s.-]/g, ""));

export const passwordSchema = z.string().min(6);

export const licensePlateSchema = z
  .string()
  .trim()
  .min(4, "La plaque doit contenir au moins 4 caractères")
  .max(10, "La plaque ne peut pas dépasser 10 caractères")
  .regex(
    /^[A-Z0-9\s\-]+$/i,
    "La plaque ne peut contenir que des lettres, chiffres, espaces et tirets"
  )
  .transform((val) => val.toUpperCase().replace(/\s+/g, " ").trim());
