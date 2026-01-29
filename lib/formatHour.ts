"use client";
import { DateTime } from "luxon";

export function formatHour(startingHour: string | Date) {
  const startingHourUTC = DateTime.fromISO(startingHour as string);
  const startingHourFrance = startingHourUTC.setZone("Europe/Paris");
  const startingHourFormat = startingHourFrance
    .toFormat("HH:mm")
    .replace(":", "h");

  return startingHourFormat;
}

export function getMinutesUntil(targetDate: string | Date): number {
  const now = DateTime.now().setZone("Europe/Paris");
  const target = DateTime.fromISO(targetDate as string).setZone("Europe/Paris");

  const diffInMinutes = Math.round(target.diff(now, "minutes").minutes);

  return diffInMinutes;
}
