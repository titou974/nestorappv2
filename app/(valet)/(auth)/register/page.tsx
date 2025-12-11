import RegisterError from "@/app/(valet)/(auth)/register/RegisterError";
import RegisterWelcome from "@/app/(valet)/(auth)/register/RegisterWelcome";
import getSite from "@/utils/site/getSite";
import Register from "./Register";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ site: string }>;
}) {
  const { site } = await searchParams;
  const siteData = await getSite(site);

  if (!siteData.name && site) {
    return <RegisterError />;
  }

  if (!siteData.name) {
    return <RegisterWelcome />;
  }

  return <Register />;
}
