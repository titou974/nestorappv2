import Navbar from "@/components/Navbar";
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
      <Navbar subtitle={StringsFR.youAreIn} title={siteName} />
      <LoginForm companyId={companyId} siteId={siteId} />
    </>
  );
}
