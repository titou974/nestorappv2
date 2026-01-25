import { ROUTES } from "@/constants/routes";
import { auth } from "@/utils/auth/auth";
import getSite from "@/utils/site/getSite";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import VerifyPhone from "./VerifyPhone";

export default async function VerifyPhonePage({
  searchParams,
}: {
  searchParams: Promise<{ site: string; phone: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect(ROUTES.DASHBOARD);
  }

  const { site, phone } = await searchParams;
  const siteData = await getSite(site);
  return (
    <VerifyPhone
      companyId={siteData.companyId}
      siteId={siteData.id}
      phone={phone}
    />
  );
}
