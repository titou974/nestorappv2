import Navbar from "@/components/Navbar";
import LoginForm from "./LoginForm";
import { StringsFR } from "@/constants/fr_string";
import LoginFormWithPhone from "./LoginFormWithPhone";

export default function Login({
  companyId,
  siteId,
  siteName,
  enableSmsRetrieval,
}: {
  companyId: string | null;
  siteId: string;
  siteName: string;
  enableSmsRetrieval: boolean;
}) {
  return (
    <>
      <Navbar subtitle={StringsFR.youAreIn} title={siteName} />
      {enableSmsRetrieval ? (
        <LoginFormWithPhone siteId={siteId} />
      ) : (
        <LoginForm companyId={companyId} siteId={siteId} />
      )}
    </>
  );
}
