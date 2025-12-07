import FooterBarLayout from "@/components/layouts/footerbarlayout";
import Navbar from "@/components/navbar";
import { Company } from "@/generated/prisma/client";
import { ApiTicket } from "@/types/site";
import Link from "next/link";
import TicketDrawer from "@/components/ticket/ticket";
import { Button } from "@heroui/react";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import { StringsFR } from "@/constants/fr_string";
import ConfettiAnimation from "@/components/animations/Confetti";

export default async function Ticket(
  ticketData: ApiTicket,
  companyData: unknown
) {
  return (
    <>
      <Navbar
        subtitle={StringsFR.welcomeTo}
        title={ticketData?.restaurant.name}
        position="static"
        isLoading={false}
      />
      <TicketDrawer ticketData={ticketData} companyData={companyData} />
      <ConfettiAnimation />
      <FooterBarLayout>
        <Button
          // onClick={(e) => setEmailModal(true)}
          className="fill-primary-foreground w-full"
          size="lg"
        >
          Recevoir par email
          <EnvelopeIcon width={20} />
        </Button>
        <Link
          href="https://tally.so/r/3qKl18"
          target="_blank"
          className="text-center text-sm text-accent transition-all hover:font-bold hover:underline"
        >
          Un problème ? Contactez-nous ici
        </Link>
      </FooterBarLayout>
      {/* <EmailModal
        companyCgu={companyData?.cgu}
        isOpen={emailModal}
        setIsOpen={(e) => setEmailModal(e)}
        siteName={ticketData?.restaurant.name}
        scannedAt={ticketData?.scannedAt}
        ticketPrice={ticketData?.restaurant.ticketPrice}
        ticketNumber={ticketData?.ticketNumber}
        userId={ticketData?.user.id}
      /> */}
    </>
  );
}
