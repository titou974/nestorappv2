"use client";
import CheckAnimation from "@/components/animations/Check";
import { StringsFR } from "@/constants/fr_string";
import { licensePlateSchema } from "@/constants/validations";
import { Ticket } from "@/generated/prisma/client";
import createToast from "@/lib/createToast";
import formatHour from "@/lib/formatHour";
import { ClockIcon, ArrowRightCircleIcon } from "@heroicons/react/20/solid";
import {
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
import { TriggerWithArgs } from "swr/dist/mutation";

export default function TicketCard({
  ticket,
  trigger,
}: {
  ticket: Ticket;
  trigger: TriggerWithArgs<
    Response,
    unknown,
    string,
    {
      id: string;
      immatriculation: string;
    }
  >;
}) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const [immatriculation, setImmatriculation] = useState<string>(
    ticket.immatriculation || ""
  );
  const [displayAnimation, setDisplayAnimation] = useState<boolean>(false);

  const handleImmatriculationBlur = async () => {
    if (immatriculation && immatriculation !== ticket.immatriculation) {
      try {
        await trigger({ id: ticket.id, immatriculation });
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
          false
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
    <Card className="col-span-12 w-full">
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
        <Button variant="primary" size="sm">
          Véhicule récupéré ? <ArrowRightCircleIcon />
        </Button>
        <div className="flex items-center justify-start gap-2 text-foreground/80 text-sm">
          <ClockIcon className="h-4 w-4 text-foreground/80" />
          <p>
            {StringsFR.createdAt} {formatHour(ticket.createdAt)}
          </p>
        </div>
      </Card.Footer>
    </Card>
  );
}
