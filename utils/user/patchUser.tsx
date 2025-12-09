import { APIROUTES } from "@/constants/routes";
import { UserUpdateInput } from "@/generated/prisma/models";

export default async function patchUser(userId: string, email: string | null) {
  const baseUrl = process.env.BASE_URL || "";
  const url = new URL(`${baseUrl}${APIROUTES.USER.replace("[id]", userId)}`);
  const res = await fetch(url.toString(), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email } as UserUpdateInput),
  });
  const data = await res.json();
  return data;
}
