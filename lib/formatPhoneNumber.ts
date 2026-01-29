export function formatPhoneNumber(phone: string): string {
  // Enlever tous les espaces, tirets, etc.
  let cleaned = phone.replace(/[\s\-\.\(\)]/g, "");

  // Si le numéro commence par 0, on l'enlève
  if (cleaned.startsWith("0")) {
    cleaned = cleaned.substring(1);
  }

  // Si le numéro ne commence pas déjà par +33, on l'ajoute
  if (!cleaned.startsWith("+33")) {
    cleaned = "+33" + cleaned;
  }

  return cleaned;
}
