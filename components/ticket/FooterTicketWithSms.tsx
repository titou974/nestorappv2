"use client";
import { Button, Link } from "@heroui/react";
import FooterBarLayout from "../layouts/footerbarlayout";
import { StringsFR } from "@/constants/fr_string";
import { EnvelopeIcon, KeyIcon } from "@heroicons/react/20/solid";
import EmailModal from "./EmailModal";
import { ApiTicket, CguPart } from "@/types/site";
import { useState } from "react";
import RetrieveCarModal from "./RetrieveCarModal";

export default function FooterTicketWithSms({
  ticketData,
  cgu,
}: {
  ticketData: ApiTicket;
  cgu: CguPart[] | null | undefined;
}) {
  const [emailModal, setEmailModal] = useState(false);
  const [retrieveCarModal, setRetrieveCarModal] = useState(false);

  return (
    <>
      <FooterBarLayout>
        <Link
          href="https://tally.so/r/3qKl18"
          target="_blank"
          underline="none"
          className="text-center text-sm text-success transition-all hover:bg-default/80 bg-default w-full justify-center py-2 rounded-full"
        >
          {StringsFR.problemContactUs}
        </Link>
        <Button
          onClick={() => setEmailModal(true)}
          className="fill-primary-foreground w-full"
          size="lg"
          variant="secondary"
        >
          {StringsFR.receiveByEmail}
          <EnvelopeIcon width={20} />
        </Button>
        <Button
          onClick={() => setRetrieveCarModal(true)}
          className="fill-primary-foreground w-full"
          size="lg"
        >
          {StringsFR.retrieveMyCar}
          <KeyIcon width={20} />
        </Button>
      </FooterBarLayout>
      <RetrieveCarModal
        ticketId={ticketData.id}
        requestedPickupTimeData={ticketData.requestedPickupTime}
        isOpen={retrieveCarModal}
        setIsOpen={(e) => setRetrieveCarModal(e)}
      />
    </>
  );
}
