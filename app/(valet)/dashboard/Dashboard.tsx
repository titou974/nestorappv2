import { StringsFR } from "@/constants/fr_string";
import FeedTickets from "./FeedTickets";
import NavbarDashboard from "./NavbarDashboard";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import FooterBarLayout from "@/components/layouts/footerbarlayout";
import { Button, Spinner } from "@heroui/react";

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
