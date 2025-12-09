import { Accordion, Skeleton } from "@heroui/react";
import style from "@/styles/ticket.module.css";
import { StringsFR } from "@/constants/fr_string";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function TicketLoading() {
  return (
    <>
      <div className="static bg-gradient-to-b from-background from-60% to-transparent min-h-40 left-0 right-0 top-0 z-50 w-full pb-4 pt-10 flex-col space-y-2">
        <Skeleton className="rounded-sm h-8 w-30" />
        <Skeleton className="rounded-sm h-10 w-40" />
      </div>
      <Accordion
        className={`${style.digitalTicket} data-[hover=true]:bg-default-100`}
      >
        <Accordion.Item>
          <Accordion.Heading>
            <Accordion.Trigger className="w-full">
              <div className="flex flex-col gap-2 rounded-md text-primary-foreground w-full">
                <div className="flex items-center gap-4">
                  <p className="text-xl font-bold">
                    {StringsFR.yourTicketWithoutEmoji}
                  </p>
                  <Skeleton className="rounded-sm h-7 w-14" />
                </div>
                <Skeleton className="rounded-sm h-6 w-10" />
                <div className="mb-4 w-full border border-surface"></div>

                <div className="space-y-2 text-base text-primary-foreground">
                  <Skeleton className="rounded-sm h-6 w-50" />
                  <Skeleton className="rounded-sm h-6 w-30" />
                </div>
              </div>

              <Accordion.Indicator className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-surface">
                <ChevronDownIcon className="mx-auto h-6 w-6 transition-all" />
              </Accordion.Indicator>
            </Accordion.Trigger>
          </Accordion.Heading>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
