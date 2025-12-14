import Navbar from "@/components/Navbar";
import RegisterForm from "./RegisterForm";
import { StringsFR } from "@/constants/fr_string";

export default function Register({
  companyId,
  siteId,
}: {
  companyId: string;
  siteId: string;
}) {
  return (
    <>
      <Navbar subtitle={StringsFR.complete} title={StringsFR.yourDetails} />
      <RegisterForm companyId={companyId} siteId={siteId} />
    </>
  );
}
