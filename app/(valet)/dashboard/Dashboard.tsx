import FeedTickets from "./FeedTickets";
import NavbarDashboard from "./NavbarDashboard";

export default function Dashboard({
  startedAt,
  siteId,
  siteName,
  workSessionId,
}: {
  startedAt: Date;
  siteId: string;
  siteName: string;
  workSessionId: string;
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
      />
    </>
  );
}
