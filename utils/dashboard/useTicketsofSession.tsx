import useSWR from "swr";
import { APIROUTES } from "@/constants/api_routes";
import { fetcher } from "@/lib/fetcher";
import { Ticket } from "@/generated/prisma/client";

export function useTicketsOfSession(siteId: string, startedAt: Date) {
  const { data, error, isLoading, isValidating } = useSWR(
    {
      url: APIROUTES.TICKETS_OF_WORK_SESSION,
      args: {
        siteId: siteId,
        startedAt: startedAt.toString(),
      },
    },
    fetcher,
    { refreshInterval: 5000 }
  );

  const numberOfTicketsToCompleteImmat = data?.tickets?.filter(
    (ticket: Ticket) => !ticket.immatriculation
  ).length;

  return {
    tickets: data,
    isTicketsLoading: isLoading,
    isTicketsError: error,
    isValidating,
    numberOfTicketsToCompleteImmat: numberOfTicketsToCompleteImmat,
  };
}
