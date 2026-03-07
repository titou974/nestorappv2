import AddPhoneNumberModal from "./AddPhoneNumberModal";
import FeedTickets from "./FeedTickets";
import NavbarDashboard from "./NavbarDashboard";

export default function DashboardWithRetrieval({
  startedAt,
  siteId,
  siteName,
  workSessionId,
  hasPhoneNumber,
}: {
  startedAt: Date;
  siteId: string;
  siteName: string;
  workSessionId: string;
  hasPhoneNumber: boolean;
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
      {!hasPhoneNumber && (
        <AddPhoneNumberModal hasPhoneNumber={hasPhoneNumber} />
      )}
    </>
  );
}
