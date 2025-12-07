import getSite from "@/utils/site/getSite";
import Register from "./Register";
import RegisterError from "./RegisterError";
import CreateTicket from "./CreateTicket";

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
    return <Register />;
  }

  return <CreateTicket siteData={siteData} />;
}
