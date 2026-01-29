import z from "zod";

export const emailSchema = z.email();

export const nameSchema = z.string().min(3);

export const frenchPhoneNumberSchema = z
  .string()
  .regex(/^(?:(?:\+|00)33|0)?[67](?:[\s.-]*\d{2}){4}$/, {
    message: "Le numéro doit être un mobile français valide (06 ou 07)",
  })
  .transform((val) => {
    // Enlever tous les espaces, tirets, points
    let cleaned = val.replace(/[\s.-]/g, "");

    // Si le numéro commence par 0, on l'enlève
    if (cleaned.startsWith("0")) {
      cleaned = cleaned.substring(1);
    }

    // Si le numéro commence par +33 ou 0033, on garde seulement les 9 derniers chiffres
    if (cleaned.startsWith("+33")) {
      cleaned = cleaned.substring(3);
    } else if (cleaned.startsWith("0033")) {
      cleaned = cleaned.substring(4);
    }

    // Ajouter le préfixe +33
    return `+33${cleaned}`;
  });

export const passwordSchema = z.string().min(6);

export const licensePlateSchema = z
  .string()
  .trim()
  .min(4, "La plaque doit contenir au moins 4 caractères")
  .max(10, "La plaque ne peut pas dépasser 10 caractères")
  .regex(
    /^[A-Z0-9\s\-]+$/i,
    "La plaque ne peut contenir que des lettres, chiffres, espaces et tirets",
  )
  .transform((val) => val.toUpperCase().replace(/\s+/g, " ").trim());

export const verificationCodeSchema = z
  .string()
  .length(6, "Le code doit contenir exactement 6 chiffres")
  .regex(/^\d{6}$/, "Le code doit contenir uniquement des chiffres");

export const schemaRegisterWithMail = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const schemaRegisterWithPhone = z.object({
  name: nameSchema,
  phone: frenchPhoneNumberSchema,
  password: passwordSchema,
});

export const schemaLoginWithEmail = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const schemaLoginWithPhone = z.object({
  name: nameSchema,
  phone: frenchPhoneNumberSchema,
  password: passwordSchema,
});
