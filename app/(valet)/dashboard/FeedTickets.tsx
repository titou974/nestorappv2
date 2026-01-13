"use client";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button, Spinner } from "@heroui/react";
import Tickets from "./Tickets";
import FooterBarLayout from "@/components/layouts/footerbarlayout";
import { StringsFR } from "@/constants/fr_string";
import { signout } from "./actions";
import { startTransition, useActionState } from "react";
import ModalQrCode from "./ModalQrCode";

export default function FeedTickets({
  siteId,
  startedAt,
  workSessionId,
  siteName,
}: {
  siteId: string;
  startedAt: Date;
  workSessionId: string;
  siteName: string;
}) {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
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
      <Tickets
        siteId={siteId}
        startedAt={startedAt}
        workSessionId={workSessionId}
      />
      <FooterBarLayout>
        <ModalQrCode siteName={siteName} siteId={siteId} />
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
