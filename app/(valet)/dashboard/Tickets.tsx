"use client";
import { Ticket } from "@/generated/prisma/client";
import { useTicketsOfSession } from "@/utils/dashboard/useTicketsofSession";
import { AnimatePresence, motion } from "framer-motion";
import TicketCard from "./TicketCard";
import { slideIn } from "@/lib/motion";
import patchTicket from "@/utils/ticket/patchTicket";
import useSWRMutation from "swr/mutation";
import TicketsLoading from "@/components/valet/TicketsLoading";
import { useState } from "react";
import CarRetrieveModal from "@/components/valet/CarRetrieveModal";

export default function Tickets({
  siteId,
  startedAt,
  workSessionId,
}: {
  siteId: string;
  startedAt: Date;
  workSessionId: string;
}) {
  const [isOpenModalCarRetrieve, setIsOpenModalCarRetrieve] = useState<{
    isOpen: boolean;
    id: string | null;
  }>({
    isOpen: false,
    id: null,
  });

  const { tickets, isTicketsLoading, swrKey } = useTicketsOfSession(
    siteId,
    startedAt,
    workSessionId
  );

  const { trigger: triggerImmatriculation } = useSWRMutation(
    swrKey,
    patchTicket,
    {
      revalidate: false,
    }
  );

  const { trigger: triggerCarRetrieve, isMutating } = useSWRMutation(
    swrKey,
    patchTicket,
    {
      revalidate: false,
    }
  );

  if (isTicketsLoading) {
    return <TicketsLoading />;
  }
  return (
    <div
      className="grid min-h-fit grid-cols-1 gap-4 text-white"
      data-theme="nestor-dark"
    >
      <AnimatePresence>
        {tickets.tickets &&
          tickets.tickets
            .slice()
            .sort(
              (a: Ticket, b: Ticket) =>
                new Date(b.scannedAt).getTime() -
                new Date(a.scannedAt).getTime()
            )
            .map((ticket: Ticket, index: number) => {
              return (
                <motion.div
                  key={ticket.id}
                  initial="hidden"
                  whileInView="show"
                  exit="hidden"
                  viewport={{ once: false }}
                  variants={slideIn("left", "tween", index * 0.25, 0.5)}
                >
                  <TicketCard
                    ticket={ticket}
                    triggerImmatriculation={triggerImmatriculation}
                    setIsOpenModalCarRetrieve={setIsOpenModalCarRetrieve}
                  />
                </motion.div>
              );
            })}
      </AnimatePresence>
      <CarRetrieveModal
        ticketId={isOpenModalCarRetrieve.id || ""}
        isOpen={isOpenModalCarRetrieve.isOpen}
        setIsOpen={setIsOpenModalCarRetrieve}
        triggerCarRetrieved={triggerCarRetrieve}
        isLoading={isMutating}
      />
    </div>
  );
}
