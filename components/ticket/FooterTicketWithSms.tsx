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
        <Button
          onClick={() => setEmailModal(true)}
          className="fill-primary-foreground w-full"
          size="lg"
          variant={`${!!ticketData?.retrievedAt ? "primary" : "secondary"}`}
        >
          {StringsFR.receiveByEmail}
          <EnvelopeIcon width={20} />
        </Button>
        {!ticketData?.retrievedAt && (
          <Button
            onClick={() => setRetrieveCarModal(true)}
            className="fill-primary-foreground w-full"
            size="lg"
          >
            {StringsFR.retrieveMyCar}
            <KeyIcon width={20} />
          </Button>
        )}
      </FooterBarLayout>
      {!ticketData?.retrievedAt && (
        <RetrieveCarModal
          ticketId={ticketData.id}
          requestedPickupTimeData={ticketData.requestedPickupTime}
          isOpen={retrieveCarModal}
          setIsOpen={(e) => setRetrieveCarModal(e)}
        />
      )}
      <EmailModal
        companyCgu={cgu}
        isOpen={emailModal}
        setIsOpen={(e) => setEmailModal(e)}
        siteName={ticketData?.site.name}
        scannedAt={ticketData?.scannedAt}
        ticketPrice={ticketData?.site.ticketPrice || "0"}
        ticketNumber={ticketData?.ticketNumber}
        userId={ticketData?.user.id}
      />
    </>
  );
}
