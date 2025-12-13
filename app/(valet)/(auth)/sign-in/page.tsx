import getSite from "@/utils/site/getSite";
import LoginError from "./LoginError";
import LoginWelcome from "./LoginWelcome";
import Login from "./Login";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ site: string }>;
}) {
  const { site } = await searchParams;
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
