import Navbar from "@/components/navbar";
import { ApiTicket, Company } from "@/types/site";
import TicketDrawer from "@/components/ticket/TicketDrawer";
import { StringsFR } from "@/constants/fr_string";
import ConfettiAnimation from "@/components/animations/Confetti";
import FooterTicket from "@/components/ticket/FooterTicket";

export default async function Ticket(
  ticketData: ApiTicket,
  companyData: Company
) {
  return (
    <>
      <Navbar
        subtitle={StringsFR.welcomeTo}
        title={ticketData?.restaurant.name}
        position="static"
        isLoading={false}
      />
      <ConfettiAnimation />
      <TicketDrawer ticketData={ticketData} companyData={companyData} />
      <FooterTicket ticketData={ticketData} cgu={companyData?.cgu} />
    </>
  );
}
