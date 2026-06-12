"use client";

import { Button } from "@heroui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { StringsFR } from "@/constants/fr_string";
import { ApiTicket } from "@/types/site";
import PaymentModal from "./PaymentModal";

export default function PayButton({ ticketData }: { ticketData: ApiTicket }) {
  const [open, setOpen] = useState(false);
  const [paid, setPaid] = useState(!!ticketData.paidAt);

  const price = ticketData.site.ticketPrice;

  // Rien à payer si pas de prix configuré pour le site.
  if (!price || Number.parseFloat(price) <= 0) return null;

  if (paid) {
    return (
      <Button isDisabled size="lg" className="w-full opacity-100">
        <CheckCircleIcon className="h-5 w-5 text-success" />
        {StringsFR.alreadyPaid}
      </Button>
    );
  }

  return (
    <>
      {/* Les logos Visa/Mastercard sont affichés en haut à droite du ticket (TicketDrawer),
          pas sur le bouton. */}
      <Button
        onClick={() => setOpen(true)}
        size="lg"
        variant="primary"
        className="w-full cursor-pointer font-semibold"
      >
        {StringsFR.payAmount(Number.parseFloat(price).toFixed(2))}
      </Button>
      <PaymentModal
        isOpen={open}
        setIsOpen={setOpen}
        ticketId={ticketData.id}
        onPaid={() => setPaid(true)}
      />
    </>
  );
}
