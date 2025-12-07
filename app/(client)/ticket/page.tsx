import Navbar from "@/components/navbar";
import { getCompany } from "@/utils/company/getCompany";
import getTicket from "@/utils/ticket/getTicket";
import Link from "next/link";
import Ticket from "./Ticket";

export default async function TicketPage({
  searchParams,
}: {
  searchParams: Promise<{ ticket: string; c: string }>;
}) {
  const { ticket, c } = await searchParams;
  const companyData = await getCompany(c);
  const ticketData = await getTicket(ticket);

  return Ticket(ticketData, companyData);
}
