"use server";
import { ROUTES } from "@/constants/routes";
import { buildRouteWithParams } from "@/lib/buildroutewithparams";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createTicket(siteId: string, companyId: string | null) {
  let ticketId: string | null = null;
  const twentyFourHoursAgo = new Date();
  twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
  try {
    const newUser = await prisma.user.create({
      data: {
        role: "CLIENT",
      },
    });
    const workSession = await prisma.workSession.findFirst({
      where: {
        createdAt: {
          gte: twentyFourHoursAgo,
        },
        siteId: siteId,
        endAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const newTicket = await prisma.ticket.create({
      data: {
        userId: newUser.id,
        siteId: siteId,
        scannedAt: new Date(),
        workSessionId: workSession?.id,
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
