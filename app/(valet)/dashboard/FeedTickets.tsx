"use client";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button, Spinner } from "@heroui/react";
import TicketAlert from "./TicketAlert";
import Tickets from "./Tickets";
import FooterBarLayout from "@/components/layouts/footerbarlayout";
import { StringsFR } from "@/constants/fr_string";
import signout from "./actions";
import { startTransition, useActionState } from "react";

export default function FeedTickets({
  siteId,
  startedAt,
  workSessionId,
}: {
  siteId: string;
  startedAt: Date;
  workSessionId: string;
}) {
  const [state, action, pending] = useActionState(
    signout.bind(null, {
      siteId: siteId,
      workSessionId: workSessionId,
      startedAt: startedAt,
    }),
    null
  );

  return (
    <>
      <Tickets siteId={siteId} startedAt={startedAt} />
      <FooterBarLayout>
        <Button
          className="w-full"
          isPending={pending}
          onClick={() => startTransition(action)}
        >
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
