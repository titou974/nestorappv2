import { DateTime } from "luxon";

export function formatDateToFrench(dateString: string) {
  // Convert to the French timezone
  const date = DateTime.fromISO(dateString)
    .setZone("Europe/Paris")
    .setLocale("fr");

  const hours = date.toFormat("HH");
  const minutes = date.toFormat("mm");
  const day = date.toFormat("dd");
  const month = date.toFormat("MM");
  const year = date.toFormat("yyyy");

  return `crée à ${hours}h${minutes} le ${day}/${month}/${year}`;
}

export function formatDayDateToFrench(dateString: string) {
  // Convert to the French timezone
  const date = DateTime.fromISO(dateString)
    .setZone("Europe/Paris")
    .setLocale("fr");
  const day = date.toFormat("dd");
  const month = date.toFormat("MM");
  const year = date.toFormat("yyyy");

  return `${day}/${month}/${year}`;
}
