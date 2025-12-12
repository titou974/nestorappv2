import Navbar from "@/components/navbar";
import RegisterForm from "./RegisterForm";
import { StringsFR } from "@/constants/fr_string";

export default function Register({ siteId }: { siteId: string }) {
  return (
    <>
      <Navbar subtitle={StringsFR.complete} title={StringsFR.yourDetails} />
      <RegisterForm siteId={siteId} />
    </>
  );
}
