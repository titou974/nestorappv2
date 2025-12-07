"use server";
import createTicket from "@/utils/ticket/createTicket";
import { redirect } from "next/navigation";

export async function createTicketAction(siteId: string, companyId: string) {
  try {
    const data = await createTicket(siteId);
    if (data.ticketId && companyId) {
      redirect(`/ticket?ticket=${data.ticketId}&c=${companyId}`);
    }

    if (data.ticketId) {
      redirect(`/ticket?ticket=${data.ticketId}`);
    }
  } catch (error) {
    console.error("Error in createTicketAction:", error);
    throw error;
  }
}
