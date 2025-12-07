import { APIROUTES } from "@/constants/routes";
import { TicketCreated } from "@/types/site";

export default async function createTicket(siteId: string) {
  const baseUrl = process.env.BASE_URL || "";
  const url = new URL(`${baseUrl}${APIROUTES.TICKETS}`);
  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ siteId }),
  });

  const data = (await res.json()) as TicketCreated;
  console.log("Created ticket data:", data);
  return data;
}
