"use client";
import CheckAnimation from "@/components/animations/Check";
import TemplateToast from "@/components/Toast";
import { APIROUTES } from "@/constants/api_routes";
import { StringsFR } from "@/constants/fr_string";
import { licensePlateSchema } from "@/constants/validations";
import { Ticket } from "@/generated/prisma/client";
import formatHour from "@/lib/formatHour";
import patchTicket from "@/utils/ticket/patchTicket";
import { ClockIcon } from "@heroicons/react/20/solid";
import { Card, Description, Input, Label, TextField } from "@heroui/react";
import { Icon } from "@iconify/react";
import { LottieRefCurrentProps } from "lottie-react";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import useSWRMutation from "swr/mutation";

export default function TicketCard({
  ticket,
  trigger,
}: {
  ticket: Ticket;
  trigger: (arg: any) => Promise<any>;
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
        if (!displayAnimation) {
          setDisplayAnimation(true);
          queueMicrotask(() => {
            lottieRef.current?.play();
          });
          toast(TemplateToast, {
            className:
              "max-w-[90%] sm:w-full !rounded-xl !bg-surface backdrop-blur-lg shadow-inner shadow-zinc-600 border !border-foreground/30 !text-foreground overflow-visible group !py-4",
            data: {
              title: "Plaque enregistrée",
              content: `La plaque ${immatriculation.toUpperCase()} pour le ticket ${ticket.ticketNumber}`,
            },
            closeButton: true,
          });
        }
      } catch (error) {
        console.error(error);
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
      <Card.Footer className="mt-6">
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
