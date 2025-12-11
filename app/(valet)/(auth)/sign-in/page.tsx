import getSite from "@/utils/site/getSite";

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

  return <Login />;
}
