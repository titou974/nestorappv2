import Navbar from "@/components/navbar";
import LoginForm from "./LoginForm";
import { StringsFR } from "@/constants/fr_string";

export default function Login({
  companyId,
  siteId,
  siteName,
}: {
  companyId: string;
  siteId: string;
  siteName: string;
}) {
  return (
    <>
      <Navbar subtitle={StringsFR.complete} title={siteName} />
      <LoginForm companyId={companyId} siteId={siteId} />
    </>
  );
}
