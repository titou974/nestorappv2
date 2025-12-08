import EmailTemplate from "@/components/ticket/EmailTemplate";

export default function EmailPage() {
  return (
    <EmailTemplate
      email="titouanhirsch@gmail.com"
      siteName="Gourmet Galaxy"
      scannedAt="2023-10-26T12:18:30.883Z"
      ticketPrice="12"
      ticketNumber={55}
    />
  );
}
