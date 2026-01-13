import { APIROUTES } from "@/constants/api_routes";
import { TicketPatchData } from "@/types/site";

export default async function patchTicket(
  url: string,
  { arg }: { arg: { id: string } & TicketPatchData }
) {
  const { id, ...dataToUpdate } = arg;

  return fetch(APIROUTES.TICKET.replace("[id]", id), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToUpdate),
  });
}
