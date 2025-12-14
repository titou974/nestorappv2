"use client";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button, Spinner } from "@heroui/react";
import TicketAlert from "./TicketAlert";
import Tickets from "./Tickets";
import FooterBarLayout from "@/components/layouts/footerbarlayout";
import { StringsFR } from "@/constants/fr_string";

export default function FeedTickets({
  siteId,
  startedAt,
}: {
  siteId: string;
  startedAt: Date;
}) {
  return (
    <>
      <Tickets siteId={siteId} startedAt={startedAt} />
      <FooterBarLayout>
        <Button className="w-full">
          {({ isPending }) =>
            isPending ? (
              <>
                <p>{StringsFR.deconnection}</p>
                <Spinner color="current" size="sm" />
              </>
            ) : (
              <>
                <p>{StringsFR.finished}</p>
                <ArrowRightIcon width={20} />
              </>
            )
          }
        </Button>
      </FooterBarLayout>
    </>
  );
}
