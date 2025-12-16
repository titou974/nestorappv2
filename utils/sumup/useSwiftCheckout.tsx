"use client";

import { useEffect, useState } from "react";
import { configPublic } from "@/constants/sumup";
import injectScript from "@/lib/injectScript";

const useSumUp = (merchantPublicId: string) => {
  const [sumUpClient, setSumUpClient] = useState(null);
  useEffect(() => {
    injectScript({
      scriptSrc: configPublic.swift_checkout_sdk,
    }).then(({ SumUp }) => {
      setSumUpClient(new SumUp.SwiftCheckout(merchantPublicId));
    });
  }, [merchantPublicId]); // Added merchantPublicId to dependencies

  return [sumUpClient];
};

export default useSumUp;
