import prisma from "@/lib/prisma";
import { Ticket } from "@/prisma/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const siteId = req.nextUrl.searchParams.get("siteId") as string;
  const startDateString = req.nextUrl.searchParams.get("startedAt") as string;
  const workSessionId = req.nextUrl.searchParams.get("workSessionId") as string;
  const startDate = new Date(startDateString);
  try {
    const ticketsRequest = await prisma.site.findUnique({
      where: { id: siteId },
      select: {
        tickets: {
          where: {
            createdAt: { gte: startDate },
            workSessionId: workSessionId,
            retrievedAt: null,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    const tickets = ticketsRequest?.tickets;
    console.log("tickets", tickets);

    const numberOfTicketsToCompleteImmat = tickets?.filter(
      (ticket: Ticket) => !ticket.immatriculation,
    ).length;

    console.log(
      "numberOfTicketsToCompleteImmateee",
      numberOfTicketsToCompleteImmat,
    );

    const numberOfCarsToPickup = tickets?.filter(
      (ticket: Ticket) => !!ticket.requestedPickupTime,
    ).length;

    console.log("numberOfCarsToPickup", numberOfCarsToPickup);

    return NextResponse.json({
      tickets,
      numberOfTicketsToCompleteImmat,
      numberOfCarsToPickup,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
