import { APIROUTES } from "@/constants/api_routes";
import { WorkSession } from "@/types/site";

export default async function getWorkSession(id: string) {
  const baseUrl = process.env.BASE_URL || "";
  const url = new URL(
    `${baseUrl}${APIROUTES.WORK_SESSION.replace("[id]", id)}`
  );
  const res = await fetch(url);
  const data = (await res.json()) as WorkSession;
  return data;
}
