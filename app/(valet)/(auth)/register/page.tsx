import RegisterError from "@/app/(valet)/(auth)/register/RegisterError";
import RegisterWelcome from "@/app/(valet)/(auth)/register/RegisterWelcome";
import getSite from "@/utils/site/getSite";
import Register from "./Register";
import { auth } from "@/utils/auth/auth";
import { headers } from "next/headers";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ site: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log("voilou session", session);

  if (!session) {
    console.log("pas de session");
  } else {
    console.log("session");
  }
  const { site } = await searchParams;
  const siteData = await getSite(site);

  if (!siteData.name && site) {
    return <RegisterError />;
  }

  if (!siteData.name) {
    return <RegisterWelcome />;
  }

  return <Register companyId={siteData.companyId} siteId={siteData.id} />;
}
