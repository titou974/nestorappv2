"use client";
import Navbar from "@/components/Navbar";
import NavbarLoading from "@/components/NavbarLoading";
import { StringsFR } from "@/constants/fr_string";
import { useTicketsOfSession } from "@/utils/dashboard/useTicketsofSession";
import { BuildingStorefrontIcon } from "@heroicons/react/20/solid";
import TicketAlert from "./TicketAlert";

export default function NavbarDashboard({
  siteId,
  startedAt,
  siteName,
  workSessionId,
}: {
  siteId: string;
  startedAt: Date;
  siteName: string;
  workSessionId: string;
}) {
  const { tickets, isTicketsLoading } = useTicketsOfSession(
    siteId,
    startedAt,
    workSessionId
  );

  if (isTicketsLoading || !tickets?.tickets) {
    return (
      <NavbarLoading
        withBottomContent={true}
        endContent={
          <div className="bg-surface rounded-xl p-2 self-start text-sm mt-4 flex items-center gap-2">
            <BuildingStorefrontIcon width={16} />
            {siteName}
          </div>
        }
      />
    );
  }

  return (
    <Navbar
      subtitle={StringsFR.youHave}
      title={`${tickets?.tickets.length} ticket${tickets?.tickets.length > 1 ? "s" : ""}`}
      endContent={
        <div className="bg-surface rounded-xl p-2 self-start text-sm mt-4 flex items-center gap-2">
          <BuildingStorefrontIcon width={16} />
          {siteName}
        </div>
      }
      bottomContent={
        <TicketAlert
          siteId={siteId}
          startedAt={startedAt}
          workSessionId={workSessionId}
        />
      }
    />
  );
}
