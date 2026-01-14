import { APIROUTES } from "@/constants/api_routes";
import { Site } from "@/types/site";

export default async function getSite(siteId: string) {
  const baseUrl = process.env.BASE_URL || "";
  const url = new URL(`${baseUrl}${APIROUTES.SITE.replace("[id]", siteId)}`);
  const res = await fetch(url, { next: { revalidate: 3600 } });
  const data = (await res.json()) as Site;
  return data;
}
