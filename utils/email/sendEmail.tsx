import { APIROUTES } from "@/constants/routes";
import { EmailTicketProps } from "@/types/site";

export default async function sendEmailTicket(props: EmailTicketProps) {
  const baseUrl = process.env.BASE_URL || "";
  const url = new URL(`${baseUrl}${APIROUTES.SEND_TICKET}`);
  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  });
  const data = await res.json();
  return data;
}
