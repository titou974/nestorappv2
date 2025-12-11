"use client";
import LoadingModal from "@/components/home/LoadingModal";
import Navbar from "@/components/navbar";
import { StringsFR } from "@/constants/fr_string";
import { Restaurant } from "@/types/site";
import { useEffect, useTransition } from "react";
import { createTicket } from "./actions";

export default function CreateTicket({ siteData }: { siteData: Restaurant }) {
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      await createTicket(siteData.id, siteData.companyId);
    });
  }, []);

  return (
    <>
      <Navbar
        subtitle={StringsFR.welcomeTo}
        title={siteData.name}
        transparent
      />
      <LoadingModal isOpen={true} title={StringsFR.creationOfYourTicket} />
    </>
  );
}
