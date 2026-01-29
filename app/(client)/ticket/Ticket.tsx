import Navbar from "@/components/Navbar";
import { ApiTicket, Company } from "@/types/site";
import TicketDrawer from "@/components/ticket/TicketDrawer";
import { StringsFR } from "@/constants/fr_string";
import ConfettiAnimation from "@/components/animations/Confetti";
import FooterTicket from "@/components/ticket/FooterTicket";
import FooterTicketWithSms from "@/components/ticket/FooterTicketWithSms";

export default async function Ticket(
  ticketData: ApiTicket,
  companyData: Company,
) {
  return (
    <>
      <Navbar
        subtitle={StringsFR.welcomeTo}
        title={ticketData?.site.name}
        position="static"
      />
      <ConfettiAnimation />
      <TicketDrawer ticketData={ticketData} companyData={companyData} />
      {ticketData.site.enableSmsRetrieval ? (
        <FooterTicketWithSms ticketData={ticketData} cgu={companyData?.cgu} />
      ) : (
        <FooterTicket ticketData={ticketData} cgu={companyData?.cgu} />
      )}
    </>
  );
}
