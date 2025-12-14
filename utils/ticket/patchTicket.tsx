import { APIROUTES } from "@/constants/api_routes";

export default async function patchTicket(
  url,
  { arg }: { arg: { id: string; immatriculation: string } }
) {
  console.log("arg", arg);
  return fetch(APIROUTES.TICKET.replace("[id]", arg.id), {
    method: "PATCH",
    body: JSON.stringify({ immatriculation: arg.immatriculation }),
  });
}
