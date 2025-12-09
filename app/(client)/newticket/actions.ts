"use server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createTicket(siteId: string, companyId: string) {
  let ticketId: string | null = null;
  try {
    const newUser = await prisma.user.create({
      data: {
        role: "CLIENT",
      },
    });
    const newTicket = await prisma.ticket.create({
      data: {
        userId: newUser.id,
        restaurantId: siteId,
        scannedAt: new Date(),
      },
    });

    ticketId = newTicket.id;
  } catch (error) {
    console.error("Error in createTicketAction:", error);
    throw error;
  }

  if (ticketId && companyId) {
    redirect(`/ticket?ticket=${ticketId}&c=${companyId}`);
  }

  if (ticketId) {
    redirect(`/ticket?ticket=${ticketId}`);
  }
}
