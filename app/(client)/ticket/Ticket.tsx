import Navbar from "@/components/Navbar";
import { ApiTicket, Company } from "@/types/site";
import TicketDrawer from "@/components/ticket/TicketDrawer";
import { StringsFR } from "@/constants/fr_string";
import ConfettiAnimation from "@/components/animations/Confetti";
import FooterTicket from "@/components/ticket/FooterTicket";
import FooterTicketWithSms from "@/components/ticket/FooterTicketWithSms";
import SatisfactionModal from "@/components/ticket/SatisfactionModal";
import { Link } from "@heroui/react";

const THREE_HOURS_MS = 3 * 60 * 60 * 1000;

export default async function Ticket(
  ticketData: ApiTicket,
  companyData?: Company,
) {
  const shouldShowReview =
    ticketData.site.enableClientReviewModal &&
    !ticketData.review &&
    (!!ticketData.retrievedAt ||
      Date.now() - new Date(ticketData.scannedAt).getTime() >= THREE_HOURS_MS);

  return (
    <>
      <Navbar
        subtitle={StringsFR.welcomeTo}
        title={ticketData?.site.name}
        position="static"
        endContent={
          <Link
            href="https://tally.so/r/3qKl18"
            target="_blank"
            underline="none"
            className="text-center text-sm text-success transition-all hover:bg-default/80 bg-default w-fit justify-center p-2 rounded-full self-start text-xs"
          >
            {StringsFR.problemContactUs}
          </Link>
        }
      />
      <ConfettiAnimation />
      <TicketDrawer ticketData={ticketData} companyData={companyData} />
      {ticketData.site.enableSmsRetrieval ? (
        <FooterTicketWithSms ticketData={ticketData} cgu={companyData?.cgu} />
      ) : (
        <FooterTicket ticketData={ticketData} cgu={companyData?.cgu} />
      )}
      {shouldShowReview && (
        <SatisfactionModal ticketId={ticketData.id} />
      )}
    </>
  );
}
