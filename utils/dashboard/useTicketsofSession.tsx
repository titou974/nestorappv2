import useSWR from "swr";
import { APIROUTES } from "@/constants/api_routes";
import { fetcher } from "@/lib/fetcher";
import { Ticket } from "@/types/site";
export function useTicketsOfSession(siteId: string, startedAt: Date) {
  const { data, error, isLoading } = useSWR(
    {
      url: APIROUTES.TICKETS_OF_WORK_SESSION,
      args: {
        siteId: siteId,
        startedAt: startedAt,
      },
    },
    fetcher,
    { refreshInterval: 5000 }
  );

  return {
    tickets: data,
    isTicketsLoading: isLoading,
    isTicketsError: error,
  };
}
