"use server";
import { ROUTES } from "@/constants/routes";
import { buildRouteWithParams } from "@/lib/buildroutewithparams";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createTicket(siteId: string, companyId: string | null) {
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
        siteId: siteId,
        scannedAt: new Date(),
      },
    });

    ticketId = newTicket.id;
  } catch (error) {
    throw error;
  }

  if (ticketId && companyId) {
    const url = buildRouteWithParams(ROUTES.TICKET, {
      ticket: ticketId,
      c: companyId,
    });
    redirect(url);
  }

  if (ticketId) {
    const url = buildRouteWithParams(ROUTES.TICKET, {
      ticket: ticketId,
    });
    redirect(url);
  }
}
