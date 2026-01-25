import Navbar from "@/components/Navbar";
import { StringsFR } from "@/constants/fr_string";
import VerifyPhoneForm from "./VerifyPhoneForm";

export default function VerifyPhone({
  companyId,
  siteId,
  phone,
}: {
  companyId: string | null;
  siteId: string;
  phone: string;
}) {
  return (
    <>
      <Navbar subtitle={StringsFR.enterCode} title={StringsFR.receivedBySms} />
      <VerifyPhoneForm companyId={companyId} siteId={siteId} phone={phone} />
    </>
  );
}
