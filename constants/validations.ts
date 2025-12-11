import z from "zod";

export const emailSchema = z.email({
  message: "Votre adresse mail est invalide",
});
