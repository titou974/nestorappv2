import useSWR from "swr";
import { APIROUTES } from "@/constants/api_routes";
import { fetcher } from "@/lib/fetcher";
import { refreshInterval } from "@/constants/swrparameters";

export function useTicketsOfSession(
  siteId: string,
  startedAt: Date,
  workSessionId: string,
) {
  const swrKey = `${APIROUTES.TICKETS_OF_WORK_SESSION}?siteId=${siteId}&startedAt=${startedAt.toString()}&workSessionId=${workSessionId}`;

  const { data, error, isLoading, isValidating } = useSWR(swrKey, fetcher, {
    refreshInterval: refreshInterval,
  });

  return {
    ...data,
    isTicketsLoading: isLoading,
    isTicketsError: error,
    isValidating,
    swrKey,
  };
}
