import CheckAnimation from "@/components/animations/Check";
import { StringsFR } from "@/constants/fr_string";
import { licensePlateSchema } from "@/constants/validations";
import { Ticket } from "@/generated/prisma/client";
import createToast from "@/lib/createToast";
import { formatHour, getMinutesUntil } from "@/lib/formatHour";
import { TicketPatchData } from "@/types/site";
import { ClockIcon, ArrowRightCircleIcon } from "@heroicons/react/20/solid";
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
import { animate } from "framer-motion";
import { LottieRefCurrentProps } from "lottie-react";
import { useState, useRef } from "react";
import React from "react";
import { TriggerWithArgs } from "swr/dist/mutation";

export default function TicketCard({
  ticket,
  triggerImmatriculation,
  setIsOpenModalCarRetrieve,
}: {
  ticket: Ticket;
  triggerImmatriculation: TriggerWithArgs<
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
}) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const [immatriculation, setImmatriculation] = useState<string>(
    ticket.immatriculation || "",
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

  const handleImmatriculationBlur = async () => {
    if (immatriculation && immatriculation !== ticket.immatriculation) {
      try {
        await triggerImmatriculation({ id: ticket.id, immatriculation });
        const modalContent = `${StringsFR.theImmat} ${immatriculation.toUpperCase()} ${StringsFR.savedForTheTicket} ${ticket.ticketNumber}`;
        createToast(StringsFR.immatriculationSaved, modalContent, true);
        if (!displayAnimation) {
          setDisplayAnimation(true);
          queueMicrotask(() => {
            lottieRef.current?.play();
          });
        }
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      } catch (error: unknown) {
        createToast(
          StringsFR.aErrorOccured,
          StringsFR.ourServerHasProblems,
          false,
        );
      }
    }
  };

  const handleFieldValidation = (value: string) => {
    setImmatriculation(value);

    if (displayAnimation) {
      setDisplayAnimation(false);
      queueMicrotask(() => {
        lottieRef.current?.stop();
      });
    }
  };

  return (
    <Card
      className={`col-span-12 w-full ${ticket.requestedPickupTime && "animate-pulse border-2 border-accent shadow shadow-accent"}`}
    >
      <Card.Header className="gap-3">
        <div className="w-full flex justify-between">
          <TextField
            name="name"
            isInvalid={
              !!immatriculation &&
              !licensePlateSchema.safeParse(immatriculation)
            }
          >
            <Label className="inline-flex items-center">
              {StringsFR.immatriculation}
            </Label>
            <div className="relative w-full">
              <Input
                className="w-full uppercase"
                placeholder={StringsFR.immatriculationPlaceholder}
                value={immatriculation}
                onBlur={handleImmatriculationBlur}
                onChange={(e) => handleFieldValidation(e.target.value)}
              />
              {displayAnimation && <CheckAnimation lottieRef={lottieRef} />}
            </div>
            {!immatriculation && (
              <Description className="flex items-center gap-1 text-accent">
                <Icon icon="jam:alert" />
                <p>{StringsFR.toComplete}</p>
              </Description>
            )}
          </TextField>
          <div className="h-fit rounded-md border-2 border-solid border-foreground bg-surface/80 px-2 py-1 shadow-xl text-sm">
            {StringsFR.numero}
            {ticket.ticketNumber}
          </div>
        </div>
      </Card.Header>
      <Card.Footer className="mt-6 w-full flex justify-between">
        <div className="flex items-center justify-start gap-1 text-foreground/80 text-sm">
          <ClockIcon className="h-4 w-4 text-foreground/80" />
          <p>
            {StringsFR.createdAt} {formatHour(ticket.createdAt)}
          </p>
        </div>
        {!ticket.requestedPickupTime && (
          <Button
            variant="primary"
            size="sm"
            onClick={() =>
              setIsOpenModalCarRetrieve({ id: ticket.id, isOpen: true })
            }
          >
            {StringsFR.retrievedCar} <ArrowRightCircleIcon />
          </Button>
        )}
      </Card.Footer>
      {ticket.requestedPickupTime && (
        <Alert
          status="warning"
          className="absolute bg-background p-2 font-bold max-w-70 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 rounded-3xl"
        >
          <Alert.Indicator />
          <Alert.Content className="space-y-2">
            <Alert.Title>
              {StringsFR.clientWantToPickupHisCar} {timeInMinutesUntil()} (à{" "}
              {formatHour(ticket.requestedPickupTime)})
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
    </Card>
  );
}
