import Toast from "@/components/Toast";
import FeedTickets from "./FeedTickets";
import NavbarDashboard from "./NavbarDashboard";

export default function Dashboard({
  startedAt,
  siteId,
  siteName,
}: {
  startedAt: Date;
  siteId: string;
  siteName: string;
}) {
  return (
    <>
      <NavbarDashboard
        siteId={siteId}
        startedAt={startedAt}
        siteName={siteName}
      />
      <FeedTickets siteId={siteId} startedAt={startedAt} />
    </>
  );
}
