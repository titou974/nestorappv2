import getSite from "@/utils/site/getSite";
import Register from "./Register";
import RegisterError from "./RegisterError";
import CreateTicket from "./CreateTicket";
import { createTicket } from "./actions";

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

  await createTicket(siteData.id, siteData.companyId);

  return <CreateTicket siteData={siteData} />;
}
