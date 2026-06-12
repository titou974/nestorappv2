"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { StringsFR } from "@/constants/fr_string";
import createToast from "@/lib/createToast";
import {
  createTicketCheckout,
  confirmTicketPayment,
} from "@/app/(client)/ticket/actions";
import type { SumUpWidget, SumUpResponseType } from "@/types/sumup";

const SUMUP_SDK_SRC = "https://gateway.sumup.com/gateway/ecom/card/v2/sdk.js";
const WIDGET_CONTAINER_ID = "sumup-card";

/** Charge le SDK SumUp une seule fois et résout dès que window.SumUpCard est prêt. */
function loadSumUpSdk(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject(new Error("no window"));
    if (window.SumUpCard) return resolve();

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SUMUP_SDK_SRC}"]`,
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("sdk error")));
      return;
    }

    const script = document.createElement("script");
    script.src = SUMUP_SDK_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("sdk error"));
    document.body.appendChild(script);
  });
}

export default function PaymentModal({
  isOpen,
  setIsOpen,
  ticketId,
  onPaid,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  ticketId: string;
  onPaid?: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const widgetRef = useRef<SumUpWidget | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;

    async function init() {
      setLoading(true);
      setError(null);
      try {
        const checkout = await createTicketCheckout(ticketId);

        if (checkout.status === "ALREADY_PAID") {
          if (!cancelled) {
            createToast(
              StringsFR.paymentSuccessTitle,
              StringsFR.paymentSuccessContent,
              true,
            );
            setIsOpen(false);
            onPaid?.();
          }
          return;
        }

        if (checkout.status !== "OK") {
          if (!cancelled)
            setError(checkout.message ?? StringsFR.paymentUnavailable);
          return;
        }

        await loadSumUpSdk();
        if (cancelled || !window.SumUpCard) return;

        widgetRef.current = window.SumUpCard.mount({
          id: WIDGET_CONTAINER_ID,
          checkoutId: checkout.checkoutId,
          locale: "fr-FR",
          currency: "EUR",
          amount: checkout.amount,
          showSubmitButton: true,
          onLoad: () => {
            if (!cancelled) setLoading(false);
          },
          onResponse: async (type: SumUpResponseType) => {
            if (type === "success") {
              const result = await confirmTicketPayment(
                ticketId,
                checkout.checkoutId,
              );
              createToast(
                result.title,
                result.content,
                result.status === "SUCCESS",
              );
              if (result.status === "SUCCESS") {
                setIsOpen(false);
                onPaid?.();
              }
            } else if (type === "fail" || type === "error") {
              createToast(
                StringsFR.paymentErrorTitle,
                StringsFR.paymentErrorContent,
                false,
              );
            }
          },
        });
      } catch (err) {
        console.error("PaymentModal init", err);
        if (!cancelled) setError(StringsFR.paymentUnavailable);
      }
    }

    init();

    return () => {
      cancelled = true;
      widgetRef.current?.unmount();
      widgetRef.current = null;
    };
  }, [isOpen, ticketId, setIsOpen, onPaid]);

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50"
          data-theme="nestor"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          />
          <div className="fixed inset-0 flex w-screen items-end justify-center p-4 sm:items-center">
            <DialogPanel
              as={motion.div}
              initial={
                reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }
              }
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.25, ease: "easeOut" },
              }}
              exit={
                reduceMotion ? undefined : { opacity: 0, y: 24, scale: 0.98 }
              }
              className="w-full max-w-md space-y-6 rounded-3xl bg-white p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <DialogTitle className="text-lg font-semibold text-foreground">
                  {StringsFR.paymentTitle}
                </DialogTitle>
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <Icon icon="logos:visa" className="h-6 w-auto" />
                  <Icon icon="logos:mastercard" className="h-7 w-auto" />
                </div>
              </div>

              <div className="min-h-[180px]">
                {error ? (
                  <p className="rounded-xl bg-danger-50 p-4 text-center text-sm text-danger">
                    {error}
                  </p>
                ) : (
                  <>
                    {loading && (
                      <div className="flex flex-col items-center justify-center gap-3 py-10 text-default-500">
                        <Spinner color="current" />
                        <p className="text-sm">{StringsFR.paymentLoading}</p>
                      </div>
                    )}
                    <div id={WIDGET_CONTAINER_ID} />
                  </>
                )}
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-default-500">
                <LockClosedIcon className="h-4 w-4 text-success" />
                <span>{StringsFR.securedBySumup}</span>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
