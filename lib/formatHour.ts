"use client";
import { DateTime } from "luxon";

export default function formatHour(startingHour: string | Date) {
  const startingHourUTC = DateTime.fromISO(startingHour as string);
  const startingHourFrance = startingHourUTC.setZone("Europe/Paris");
  const startingHourFormat = startingHourFrance
    .toFormat("HH:mm")
    .replace(":", "h");

  return startingHourFormat;
}
