"use client";

import { Ticket } from "@/generated/prisma/client";
import { useTicketsOfSession } from "@/utils/dashboard/useTicketsofSession";

export default function Dashboard({
  startedAt,
  siteId,
}: {
  startedAt: Date;
  siteId: string;
}) {
  const { tickets, isTicketsLoading, isTicketsError } = useTicketsOfSession(
    siteId,
    startedAt
  );

  console.log("tickets", tickets);
  if (tickets && tickets.tickets) {
    return tickets.tickets.map((ticket: Ticket) => (
      <div key={ticket.id}>{ticket.id}</div>
    ));
  }
}
