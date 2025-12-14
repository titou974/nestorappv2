"use client";
import { Ticket } from "@/generated/prisma/client";
import { useTicketsOfSession } from "@/utils/dashboard/useTicketsofSession";
import { motion } from "framer-motion";
import TicketCard from "./TicketCard";
import { slideIn } from "@/lib/motion";
import patchTicket from "@/utils/ticket/patchTicket";
import useSWRMutation from "swr/mutation";

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
    return <p>Loading...</p>;
  }
  return (
    <div className="grid min-h-fit grid-cols-1 gap-4 text-white">
      {tickets.tickets &&
        tickets.tickets
          .slice()
          .sort((a, b) => new Date(b.scannedAt) - new Date(a.scannedAt))
          .map((ticket: Ticket, index: number) => {
            return (
              <motion.div
                key={index}
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
