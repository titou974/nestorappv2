import { getCompany } from "@/utils/company/getCompany";
import getTicket from "@/utils/ticket/getTicket";
import Ticket from "./Ticket";

export default async function TicketPage({
  searchParams,
}: {
  searchParams: Promise<{ ticket: string; c: string }>;
}) {
  const { ticket, c } = await searchParams;
  const companyData = getCompany(c);
  const ticketData = getTicket(ticket);

  const [ticketFetched, companyFetched] = await Promise.all([
    ticketData,
    companyData,
  ]);

  return Ticket(ticketFetched, companyFetched);
}
