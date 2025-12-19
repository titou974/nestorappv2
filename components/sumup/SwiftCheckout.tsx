"use client";
import { useEffect, useState, useRef } from "react";

import sumupApiClient from "@/lib/sumupApiClient";
import useSwiftCheckout from "@/utils/sumup/useSwiftCheckout";

type OnEventHandler = (event: { message: string }) => void;

function SwiftCheckout({
  merchantPublicKey,
  paymentAmount,
}: {
  merchantPublicKey: string;
  paymentAmount: string;
}) {
  const paymentContainerRef = useRef(null);
  const [issuePaymentRequest, setIssuePaymentRequest] = useState("");

  const [sumUpClient] = useSwiftCheckout(merchantPublicKey);

  useEffect(() => {
    if (!sumUpClient || !paymentContainerRef.current) {
      return;
    }

    const googlePayMerchantInfo = {
      merchantName: process.env.NEXT_PUBLIC_GOOGLE_PAY_MERCHANT_NAME,
      merchantId: process.env.NEXT_PUBLIC_GOOGLE_PAY_MERCHANT_ID,
    };

    const paymentRequest = sumUpClient.paymentRequest({
      countryCode: "DE",
      total: {
        label: "A small contribution",
        amount: { currency: "EUR", value: paymentAmount },
      },

      methodData: [
        {
          supportedMethods: "google_pay",

          data: {
            merchantInfo: googlePayMerchantInfo,
          },
        },
      ],

      shippingOptions: [
        {
          id: "free",
          label: "Free shipping",
          amount: { currency: "EUR", value: "0.00" },
          description: "Delivered within 5 days.",
        },
        {
          id: "express",
          label: "Express shipping",
          amount: { currency: "EUR", value: "1.00" },
          description: "Delivered within 2 days.",
        },
        {
          id: "express pluss",
          label: "Express pluss shipping",
          amount: { currency: "EUR", value: "2.00" },
          description: "Delivered same day.",
        },
      ],
    });

    console.log("payment request", paymentRequest);

    const paymentElement = sumUpClient
      .elements()
      .onSubmit(async (paymentEvent: unknown) => {
        try {
          const paymentResponse = await paymentRequest.show(paymentEvent);

          const checkout = await sumupApiClient.createCheckout({
            paymentType: paymentResponse.details.paymentMethod,
          });

          const processResult = await sumUpClient.processCheckout(
            checkout.id,
            paymentResponse
          );

          if (processResult.status === "PAID") {
          } else {
          }
        } catch (e) {
          console.log("error", e);
        }
      });

    paymentRequest.onShippingOptionsChange((shippingOption: any) => {
      const value =
        parseFloat(shippingOption.amount.value) + parseFloat(paymentAmount);
      return {
        total: {
          label: "A small contribution + shipping",
          amount: {
            currency: shippingOption.amount.currency,
            value: value.toFixed(2),
          },
        },
      };
    });

    paymentRequest.canMakePayment().then((isAvailable: boolean) => {
      if (isAvailable) {
        paymentRequest
          .availablePaymentMethods()
          .then((paymentMethods: unknown) => {
            paymentElement.mount({
              paymentMethods,
              container: paymentContainerRef.current,
            });
          });
      } else {
        console.log("et non");
        setIssuePaymentRequest(
          "No payment method is available for this browser. Try using Safari for ApplePay."
        );
      }
    });
  }, [sumUpClient, paymentContainerRef.current]);

  return (
    <>
      {issuePaymentRequest && <p>Problème</p>}
      <div ref={paymentContainerRef} className="w-full" />
    </>
  );
}

export default SwiftCheckout;
