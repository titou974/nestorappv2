import { APIROUTES } from "@/constants/routes";
import { Company } from "@/types/site";
export async function getCompany(id: string) {
  const baseUrl = process.env.BASE_URL || "";
  const url = new URL(`${baseUrl}${APIROUTES.COMPANY.replace("[id]", id)}`);
  const res = await fetch(url);
  const data = (await res.json()) as unknown;
  return data;
}
