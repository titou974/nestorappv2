import { APIROUTES } from "@/constants/api_routes";
import { Restaurant } from "@/types/site";

export default async function getSite(siteId: string) {
  const baseUrl = process.env.BASE_URL || "";
  const url = new URL(`${baseUrl}${APIROUTES.SITE.replace("[id]", siteId)}`);
  const res = await fetch(url);
  const data = (await res.json()) as Restaurant;
  return data;
}
