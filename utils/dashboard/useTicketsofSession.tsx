import useSWR from "swr";
import { APIROUTES } from "@/constants/api_routes";
import { fetcher } from "@/lib/fetcher";
export function useTicketsOfSession(siteId: string, startedAt: string) {
  const { data, error, isLoading } = useSWR(
    {
      url: APIROUTES.TICKETS,
      args: {
        siteId: siteId,
        startedAt: startedAt,
      },
    },
    fetcher
  );

  return { tickets: data, isTicketsLoading: isLoading, isTicketsError: error };
}
