"use client";
import { Button } from "@heroui/react";
import FooterBarLayout from "../layouts/footerbarlayout";
import { StringsFR } from "@/constants/fr_string";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import EmailModal from "./EmailModal";
import { ApiTicket, CguPart } from "@/types/site";
import { useState } from "react";
// import PayButton from "./PayButton"; // Paiement par carte — à réactiver quand la feature sera prête.

export default function FooterTicket({
  ticketData,
  cgu,
}: {
  ticketData: ApiTicket;
  cgu: CguPart[] | null | undefined;
}) {
  const [emailModal, setEmailModal] = useState(false);

  return (
    <>
      <FooterBarLayout>
        {/* Paiement par carte — désactivé pour l'instant. Réactiver et repasser le bouton
            email en variant="secondary" quand le paiement sera en place.
        {ticketData.site.enablePayment && <PayButton ticketData={ticketData} />} */}
        <Button
          onClick={() => setEmailModal(true)}
          className="fill-primary-foreground w-full"
          size="lg"
          variant="primary"
        >
          {StringsFR.receiveByEmail}
          <EnvelopeIcon width={20} />
        </Button>
      </FooterBarLayout>
      <EmailModal
        companyCgu={cgu}
        isOpen={emailModal}
        setIsOpen={(e) => setEmailModal(e)}
        siteName={ticketData?.site.name}
        scannedAt={ticketData?.scannedAt}
        ticketPrice={ticketData?.site.ticketPrice || "0"}
        ticketNumber={ticketData?.ticketNumber}
        userId={ticketData?.user.id}
        ticketId={ticketData?.id}
        emailSentHour={ticketData?.emailSentHour}
      />
    </>
  );
}
