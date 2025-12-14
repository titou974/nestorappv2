import { StringsFR } from "@/constants/fr_string";
import { useTicketsOfSession } from "@/utils/dashboard/useTicketsofSession";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { Alert, Button, Skeleton } from "@heroui/react";

export default function TicketAlert({
  siteId,
  startedAt,
}: {
  siteId: string;
  startedAt: Date;
}) {
  const { isTicketsLoading, numberOfTicketsToCompleteImmat, isValidating } =
    useTicketsOfSession(siteId, startedAt);

  if (isTicketsLoading) {
    return <Skeleton className="w-full rounded-3xl min-h-[76px]" />;
  }

  if (numberOfTicketsToCompleteImmat === 0) {
    return (
      <Alert status="success">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>{StringsFR.allTicketsCompleted}</Alert.Title>
        </Alert.Content>
      </Alert>
    );
  }
  return (
    <Alert status="accent">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>
          {StringsFR.youHave} {numberOfTicketsToCompleteImmat}{" "}
          {numberOfTicketsToCompleteImmat > 1
            ? StringsFR.tickets
            : StringsFR.ticket}{" "}
          {StringsFR.toComplete}
        </Alert.Title>
        <Alert.Description>
          {StringsFR.addTheImmatMissingOnTicket}
        </Alert.Description>
      </Alert.Content>
      <Button
        isDisabled
        className="hidden sm:block"
        size="sm"
        variant="primary"
        isPending={isValidating}
      >
        {({ isPending }) =>
          isPending ? (
            <ArrowPathIcon width={20} className="animate-spin" />
          ) : (
            <ArrowPathIcon width={20} />
          )
        }
      </Button>
    </Alert>
  );
}
