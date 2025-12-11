import { APIROUTES } from "@/constants/api_routes";
import { ApiTicket } from "@/types/site";

export default async function getTicket(id: string) {
  const baseUrl = process.env.BASE_URL || "";
  const url = new URL(`${baseUrl}${APIROUTES.TICKET.replace("[id]", id)}`);
  const res = await fetch(url);
  const data = (await res.json()) as ApiTicket;
  return data;
}
