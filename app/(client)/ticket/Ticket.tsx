import Navbar from "@/components/Navbar";
import { ApiTicket, Company } from "@/types/site";
import TicketDrawer from "@/components/ticket/TicketDrawer";
import { StringsFR } from "@/constants/fr_string";
import ConfettiAnimation from "@/components/animations/Confetti";
import FooterTicket from "@/components/ticket/FooterTicket";
import SwiftCheckout from "@/components/sumup/SwiftCheckout";

export default async function Ticket(
  ticketData: ApiTicket,
  companyData: Company
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
      <SwiftCheckout
        merchantPublicKey={
          process.env.NEXT_PUBLIC_SUMUP_PUBLIC_MERCHANT_KEY as string
        }
        paymentAmount={"10"}
      />
      <FooterTicket ticketData={ticketData} cgu={companyData?.cgu} />
    </>
  );
}
