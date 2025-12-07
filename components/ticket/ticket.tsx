"use client";
import { Accordion } from "@heroui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { formatDateToFrench } from "@/lib/formatdate";
import style from "@/styles/ticket.module.css";
import { cguContent } from "@/constants";
import { HashtagIcon } from "@heroicons/react/20/solid";
import { ApiTicket } from "@/types/site";
import { StringsFR } from "@/constants/fr_string";

const TicketDrawer = ({
  ticketData,
  companyData,
}: {
  ticketData: ApiTicket;
  companyData: unknown;
}) => {
  return (
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
                <div className="font-bold text-base pt-px px-2 !background-transparent border-surface border-2 radius-md inline-flex items-center gap-1 rounded-sm">
                  {" "}
                  <HashtagIcon width={14} />
                  {ticketData?.ticketNumber}
                </div>
              </div>
              <p className="text-xl font-semibold">
                {ticketData?.restaurant?.ticketPrice} €
              </p>
              <div className="mb-4 w-full border border-surface"></div>

              <div className="space-y-2 text-base text-primary-foreground">
                {ticketData?.scannedAt &&
                  formatDateToFrench(ticketData.scannedAt)}
                <p className="font-semibold italic">
                  au {ticketData?.restaurant.name}
                </p>
              </div>
            </div>

            <Accordion.Indicator className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-surface">
              <ChevronDownIcon className="mx-auto h-6 w-6 transition-all" />
            </Accordion.Indicator>
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body className="pb-5 text-background">
            <p className="pb-5">{StringsFR.cguTitle}</p>
            {companyData?.cgu
              ? companyData?.cgu.map((part, index) => (
                  <div key={index} className="pb-5">
                    <h3 className="font-semibold">{part.subtitle}</h3>
                    <p>{part.text}</p>
                  </div>
                ))
              : cguContent?.map((part, index) => (
                  <div key={index} className="pb-5">
                    <h3 className="font-semibold">{part.subtitle}</h3>
                    <p>{part.text}</p>
                  </div>
                ))}
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default TicketDrawer;
