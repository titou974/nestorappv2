import { APIROUTES } from "@/constants/api_routes";
import { ApiTicket, WorkSession } from "@/types/site";

export default async function getLastWorkSession(userId: string) {
  const baseUrl = process.env.BASE_URL || "";
  const url = new URL(
    `${baseUrl}${APIROUTES.LAST_WORK_SESSION.replace("[userId]", userId)}`
  );
  const res = await fetch(url);
  const data = (await res.json()) as WorkSession;
  return data;
}
