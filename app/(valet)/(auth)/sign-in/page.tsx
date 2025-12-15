import getSite from "@/utils/site/getSite";
import LoginError from "./LoginError";
import LoginWelcome from "./LoginWelcome";
import Login from "./Login";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { auth } from "@/utils/auth/auth";
import { headers } from "next/headers";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ site: string }>;
}) {
  const { site } = await searchParams;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect(ROUTES.DASHBOARD);
  }

  const siteData = await getSite(site);

  if (!siteData.name && site) {
    return <LoginError />;
  }

  if (!siteData.name) {
    return <LoginWelcome />;
  }

  return (
    <Login
      siteId={siteData.id}
      siteName={siteData.name}
      companyId={siteData.companyId}
    />
  );
}
