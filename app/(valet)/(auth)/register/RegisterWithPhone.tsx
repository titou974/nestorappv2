import Navbar from "@/components/Navbar";
import { StringsFR } from "@/constants/fr_string";
import RegisterFormWithPhone from "./RegisterFormWithPhone";

export default function RegisterWithPhone({
  companyId,
  siteId,
}: {
  companyId: string | null;
  siteId: string;
}) {
  return (
    <>
      <Navbar subtitle={StringsFR.enter} title={StringsFR.yourPhoneNumber} />
      <RegisterFormWithPhone companyId={companyId} siteId={siteId} />
    </>
  );
}
