import CheckAnimation from "@/components/animations/Check";
import { StringsFR } from "@/constants/fr_string";
import { licensePlateSchema } from "@/constants/validations";
import { Ticket } from "@/generated/prisma/client";
import createToast from "@/lib/createToast";
import { formatHour, getMinutesUntil } from "@/lib/formatHour";
import { TicketPatchData } from "@/types/site";
import {
  ClockIcon,
  ArrowRightCircleIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import {
  Alert,
  Button,
  Card,
  Description,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { LottieRefCurrentProps } from "lottie-react";
import { useState, useRef } from "react";
import React from "react";
import { TriggerWithArgs } from "swr/dist/mutation";

export default function TicketCard({
  ticket,
  enablePhysicalTicket,
  triggerUpdate,
  setIsOpenModalCarRetrieve,
  setIsOpenModalCompleteTicket,
}: {
  ticket: Ticket;
  enablePhysicalTicket: boolean;
  triggerUpdate: TriggerWithArgs<
    Response,
    unknown,
    string,
    { id: string } & TicketPatchData
  >;
  setIsOpenModalCarRetrieve: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      id: string | null;
    }>
  >;
  setIsOpenModalCompleteTicket: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      id: string | null;
    }>
  >;
}) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const [fieldValue, setFieldValue] = useState<string>(
    enablePhysicalTicket
      ? ticket.physicalTicketNumber || ""
      : ticket.immatriculation || "",
  );

  const [displayAnimation, setDisplayAnimation] = useState<boolean>(false);

  const timeInMinutesUntil = () => {
    if (ticket.requestedPickupTime) {
      if (getMinutesUntil(ticket.requestedPickupTime) > 1) {
        return `dans ${getMinutesUntil(ticket.requestedPickupTime)} minutes`;
      }
      if (getMinutesUntil(ticket.requestedPickupTime) === 1) {
        return `dans ${getMinutesUntil(ticket.requestedPickupTime)} minute`;
      }
      return "maintenant";
    } else {
      return null;
    }
  };

  const handleFieldBlur = async () => {
    const currentValue = enablePhysicalTicket
      ? ticket.physicalTicketNumber
      : ticket.immatriculation;

    if (fieldValue && fieldValue !== currentValue) {
      try {
        const patchData: { id: string } & TicketPatchData = enablePhysicalTicket
          ? { id: ticket.id, physicalTicketNumber: fieldValue }
          : { id: ticket.id, immatriculation: fieldValue };
        await triggerUpdate(patchData);
        if (!displayAnimation) {
          setDisplayAnimation(true);
          queueMicrotask(() => {
            lottieRef.current?.play();
          });
        }
      } catch (error: unknown) {
        createToast(
          StringsFR.aErrorOccured,
          StringsFR.ourServerHasProblems,
          false,
        );
      }
    }
  };

  const handleFieldChange = (value: string) => {
    setFieldValue(value);

    if (displayAnimation) {
      setDisplayAnimation(false);
      queueMicrotask(() => {
        lottieRef.current?.stop();
      });
    }
  };

  const isInvalid = enablePhysicalTicket
    ? false
    : !!fieldValue && !licensePlateSchema.safeParse(fieldValue).success;

  return (
    <Card
      className={`col-span-12 w-full ${ticket.requestedPickupTime && "animate-pulse border-2 border-accent shadow shadow-accent"}`}
    >
      <Card.Header className="gap-3">
        <div className="w-full flex justify-between">
          {enablePhysicalTicket ? (
            <div className="flex flex-col items-start gap-4">
              <TextField name="ticketPhysicalNumber">
                <Label className="inline-flex items-center text-sm">
                  {StringsFR.physicalTicketNumber}
                </Label>
                <div className="relative w-full">
                  <Input
                    className="w-full uppercase max-w-31"
                    placeholder={StringsFR.physicalTicketNumberPlaceholder}
                    value={fieldValue}
                    onBlur={handleFieldBlur}
                    onChange={(e) => handleFieldChange(e.target.value)}
                  />
                  {displayAnimation && <CheckAnimation lottieRef={lottieRef} />}
                </div>
                {!fieldValue && (
                  <Description className="flex items-center gap-1 text-accent">
                    <Icon icon="jam:alert" />
                    <p>{StringsFR.toComplete}</p>
                  </Description>
                )}
              </TextField>
              <Button
                className="w-full border border-foreground/40 max-w-fit"
                variant="tertiary"
                size="sm"
                onClick={() =>
                  setIsOpenModalCompleteTicket({
                    isOpen: true,
                    id: ticket.id,
                  })
                }
              >
                {StringsFR.completeTicket}
                <PlusIcon className="size-4" />
              </Button>
            </div>
          ) : (
            <TextField name="immatriculation" isInvalid={isInvalid}>
              <Label className="inline-flex items-center">
                {StringsFR.immatriculation}
              </Label>
              <div className="relative w-full">
                <Input
                  className="w-full uppercase"
                  placeholder={StringsFR.immatriculationPlaceholder}
                  value={fieldValue}
                  onBlur={handleFieldBlur}
                  onChange={(e) => handleFieldChange(e.target.value)}
                />
                {displayAnimation && <CheckAnimation lottieRef={lottieRef} />}
              </div>
              {!fieldValue && (
                <Description className="flex items-center gap-1 text-accent">
                  <Icon icon="jam:alert" />
                  <p>{StringsFR.toComplete}</p>
                </Description>
              )}
            </TextField>
          )}
          <div className="h-fit rounded-md border-2 border-solid border-foreground bg-surface/80 px-2 py-1 shadow-xl text-sm">
            {StringsFR.numero}
            {ticket.ticketNumber}
          </div>
        </div>
      </Card.Header>
      <Card.Footer className="mt-6 w-full flex justify-between">
        {!ticket.requestedPickupTime && (
          <>
            <div className="flex items-center justify-start gap-1 text-foreground/80 text-sm">
              <ClockIcon className="h-4 w-4 text-foreground/80" />
              <p>
                {StringsFR.createdAt} {formatHour(ticket.createdAt)}
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() =>
                setIsOpenModalCarRetrieve({ id: ticket.id, isOpen: true })
              }
            >
              {StringsFR.retrievedCar} <ArrowRightCircleIcon />
            </Button>
          </>
        )}
        {ticket.requestedPickupTime && (
          <Alert
            status="warning"
            className="bg-background p-2 font-bold z-20 rounded-3xl basis-full"
          >
            <Alert.Indicator />
            <Alert.Content className="space-y-2">
              <Alert.Title>
                {StringsFR.clientWantToPickupHisCar}{" "}
                {(() => {
                  const label = timeInMinutesUntil();
                  if (!label || label === "maintenant")
                    return `maintenant (à ${formatHour(ticket.requestedPickupTime)})`;
                  return `${label} (à ${formatHour(ticket.requestedPickupTime)})`;
                })()}
              </Alert.Title>
              <Button
                className="self-end"
                variant="primary"
                size="sm"
                onClick={() =>
                  setIsOpenModalCarRetrieve({ id: ticket.id, isOpen: true })
                }
              >
                {StringsFR.retrievedCar} <ArrowRightCircleIcon />
              </Button>
            </Alert.Content>
          </Alert>
        )}
      </Card.Footer>
    </Card>
  );
}
