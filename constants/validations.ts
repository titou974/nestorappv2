import z from "zod";

export const emailSchema = z.email(
  "Le format de l'adresse e-mail est invalide"
);
