import FeedTickets from "./FeedTickets";
import NavbarDashboard from "./NavbarDashboard";

export default function Dashboard({
  startedAt,
  siteId,
  siteName,
  workSessionId,
  enablePhysicalTicket,
}: {
  startedAt: Date;
  siteId: string;
  siteName: string;
  workSessionId: string;
  enablePhysicalTicket: boolean;
}) {
  return (
    <>
      <NavbarDashboard
        siteId={siteId}
        startedAt={startedAt}
        siteName={siteName}
        workSessionId={workSessionId}
      />
      <FeedTickets
        siteId={siteId}
        startedAt={startedAt}
        workSessionId={workSessionId}
        siteName={siteName}
        enablePhysicalTicket={enablePhysicalTicket}
      />
    </>
  );
}
