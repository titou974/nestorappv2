"use client";
import { Ticket } from "@/prisma/generated/prisma/client";
import { useTicketsOfSession } from "@/utils/dashboard/useTicketsofSession";
import { AnimatePresence, motion } from "framer-motion";
import TicketCard from "./TicketCard";
import { slideIn } from "@/lib/motion";
import patchTicket from "@/utils/ticket/patchTicket";
import useSWRMutation from "swr/mutation";
import TicketsLoading from "@/components/valet/TicketsLoading";
import { useState } from "react";
import CarRetrieveModal from "@/components/valet/CarRetrieveModal";
import CompleteTicketModal from "@/components/valet/CompleteTicketModal";

export default function Tickets({
  siteId,
  startedAt,
  workSessionId,
  enablePhysicalTicket,
}: {
  siteId: string;
  startedAt: Date;
  workSessionId: string;
  enablePhysicalTicket: boolean;
}) {
  const [isOpenModalCarRetrieve, setIsOpenModalCarRetrieve] = useState<{
    isOpen: boolean;
    id: string | null;
  }>({
    isOpen: false,
    id: null,
  });

  const [isOpenModalCompleteTicket, setIsOpenModalCompleteTicket] = useState<{
    isOpen: boolean;
    id: string | null;
  }>({
    isOpen: false,
    id: null,
  });

  const { tickets, isTicketsLoading, swrKey } = useTicketsOfSession(
    siteId,
    startedAt,
    workSessionId,
  );

  const { trigger: triggerUpdate } = useSWRMutation(swrKey, patchTicket, {
    revalidate: false,
  });

  const { trigger: triggerCarRetrieve, isMutating } = useSWRMutation(
    swrKey,
    patchTicket,
    {
      revalidate: false,
    },
  );

  const completeTicket = tickets?.tickets?.find(
    (t: Ticket) => t.id === isOpenModalCompleteTicket.id,
  );

  if (isTicketsLoading) {
    return <TicketsLoading />;
  }
  return (
    <div
      className="grid min-h-fit grid-cols-1 gap-4 text-white pb-40"
      data-theme="nestor-dark"
    >
      <AnimatePresence>
        {tickets.tickets &&
          tickets.tickets
            .slice()
            .sort(
              (a: Ticket, b: Ticket) =>
                new Date(b.scannedAt).getTime() -
                new Date(a.scannedAt).getTime(),
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
                    enablePhysicalTicket={enablePhysicalTicket}
                    triggerUpdate={triggerUpdate}
                    setIsOpenModalCarRetrieve={setIsOpenModalCarRetrieve}
                    setIsOpenModalCompleteTicket={setIsOpenModalCompleteTicket}
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
      {isOpenModalCompleteTicket.isOpen && completeTicket && (
        <CompleteTicketModal
          isOpen={isOpenModalCompleteTicket.isOpen}
          ticketId={isOpenModalCompleteTicket.id || ""}
          initialImmatriculation={completeTicket.immatriculation || ""}
          initialPhotos={completeTicket.photos || []}
          setIsOpen={setIsOpenModalCompleteTicket}
        />
      )}
    </div>
  );
}
