"use client";
import { Ticket } from "@/generated/prisma/client";
import { useTicketsOfSession } from "@/utils/dashboard/useTicketsofSession";
import { motion } from "framer-motion";
import TicketCard from "./TicketCard";
import { slideIn } from "@/lib/motion";
import patchTicket from "@/utils/ticket/patchTicket";
import useSWRMutation from "swr/mutation";
import TicketsLoading from "@/components/valet/TicketsLoading";

export default function Tickets({
  siteId,
  startedAt,
}: {
  siteId: string;
  startedAt: Date;
}) {
  const { tickets, isTicketsLoading, swrKey } = useTicketsOfSession(
    siteId,
    startedAt
  );

  const { trigger } = useSWRMutation(swrKey, patchTicket, {
    revalidate: false,
  });

  if (isTicketsLoading) {
    return <TicketsLoading />;
  }
  return (
    <div className="grid min-h-fit grid-cols-1 gap-4 text-white">
      {tickets.tickets &&
        tickets.tickets
          .slice()
          .sort(
            (a: Ticket, b: Ticket) =>
              new Date(b.scannedAt).getTime() - new Date(a.scannedAt).getTime()
          )
          .map((ticket: Ticket, index: number) => {
            return (
              <motion.div
                key={ticket.id}
                initial="hidden"
                variants={slideIn("left", "tween", index * 0.25, 0.5)}
                whileInView="show"
                viewport={{ once: true }}
              >
                <TicketCard ticket={ticket} trigger={trigger} />
              </motion.div>
            );
          })}
    </div>
  );
}
