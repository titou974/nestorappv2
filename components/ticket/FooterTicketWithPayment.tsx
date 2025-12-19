"use client";
import { Button, Link } from "@heroui/react";
import FooterBarLayout from "../layouts/footerbarlayout";
import { StringsFR } from "@/constants/fr_string";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import EmailModal from "./EmailModal";
import { ApiTicket, CguPart } from "@/types/site";
import { useState } from "react";

export default function FooterTicketWithPayment({
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
        <Link
          href="https://tally.so/r/3qKl18"
          target="_blank"
          className="text-center text-sm text-accent transition-all hover:font-bold"
        >
          {StringsFR.problemContactUs}
        </Link>
        <Button
          onClick={() => setEmailModal(true)}
          className="fill-primary-foreground w-full"
          size="lg"
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
      />
    </>
  );
}
