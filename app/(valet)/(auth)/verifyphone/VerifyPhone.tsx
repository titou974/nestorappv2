import Navbar from "@/components/Navbar";
import { StringsFR } from "@/constants/fr_string";
import VerifyPhoneForm from "./VerifyPhoneForm";

export default function VerifyPhone({
  userId,
  siteId,
  phone,
}: {
  userId: string;
  siteId: string;
  phone: string;
}) {
  return (
    <>
      <Navbar subtitle={StringsFR.enterCode} title={StringsFR.receivedBySms} />
      <VerifyPhoneForm siteId={siteId} phone={phone} userId={userId} />
    </>
  );
}
