"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState, useActionState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

import { StringsFR } from "@/constants/fr_string";
import {
  Button,
  Label,
  Spinner,
  RadioGroup,
  Radio,
  TextArea,
} from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { submitReview } from "@/app/(client)/ticket/actions";
import { withCallbacks, toastCallback } from "@/lib/toastCallback";
import Image from "next/image";
import Lottie from "lottie-react";
import carParkingValet from "@/assets/car_parking_valet.json";

const ANIMATION_DURATION = 3000;
const initialState = null;

const RATING_OPTIONS = [
  { value: "false", label: StringsFR.satisfactionBad, image: "/bad.png" },
  { value: "true", label: StringsFR.satisfactionGood, image: "/good.png" },
];

export default function SatisfactionModal({ ticketId }: { ticketId: string }) {
  const [isOpen, setIsOpen] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState<string>("true");
  const [comment, setComment] = useState("");

  const [, formAction, pending] = useActionState(
    withCallbacks(
      submitReview.bind(null, ticketId, rating === "true", comment),
      toastCallback(() => setIsOpen(false)),
    ),
    initialState,
  );

  useEffect(() => {
    if (isOpen && !showForm) {
      const timer = setTimeout(() => {
        setShowForm(true);
      }, ANIMATION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [isOpen, showForm]);

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
            className="fixed inset-0 bg-black/30"
          />
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel
              as={motion.div}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-md w-full bg-white p-6 shadow-xl rounded-2xl overflow-hidden relative min-h-80"
            >
              <AnimatePresence mode="wait">
                {!showForm ? (
                  <motion.div
                    key="animation"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center min-h-80"
                  >
                    <Lottie
                      animationData={carParkingValet}
                      className="w-64 h-64"
                      autoPlay={true}
                      loop={false}
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      {StringsFR.satisfactionModalTitle}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2 min-h-80"
                  >
                    <DialogTitle className="text-lg font-semibold text-foreground text-center">
                      {StringsFR.satisfactionModalTitle}
                    </DialogTitle>

                    <form
                      action={formAction}
                      className="flex flex-col space-y-8 w-full items-center justify-center"
                    >
                      <RadioGroup value={rating} onChange={setRating}>
                        <Label className="text-sm font-medium text-foreground text-center w-full text-balance">
                          {StringsFR.satisfactionQuestion}
                        </Label>
                        <div className="flex gap-4 justify-center">
                          {RATING_OPTIONS.map((option) => (
                            <Radio
                              key={option.value}
                              value={option.value}
                              className="relative flex-col items-center gap-2 rounded-xl border border-transparent bg-surface px-5 py-4 transition-all data-[selected=true]:border-primary data-[selected=true]:bg-primary/10 min-w-30"
                            >
                              <Radio.Control className="absolute top-3 right-4 size-5">
                                <Radio.Indicator />
                              </Radio.Control>
                              <Radio.Content className="flex flex-col items-center gap-2">
                                <Image
                                  src={option.image}
                                  alt={option.label}
                                  width={64}
                                  height={64}
                                />
                                <Label>{option.label}</Label>
                              </Radio.Content>
                            </Radio>
                          ))}
                        </div>
                      </RadioGroup>
                      <TextArea
                        rows={4}
                        placeholder={StringsFR.satisfactionCommentPlaceholder}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full"
                      />
                      <Button
                        type="submit"
                        isPending={pending}
                        className="w-full max-w-[256px]"
                      >
                        {({ isPending }) =>
                          isPending ? (
                            <>
                              <p>{StringsFR.satisfactionSubmitting}</p>
                              <Spinner color="current" size="sm" />
                            </>
                          ) : (
                            <>
                              <p>{StringsFR.satisfactionSubmit}</p>
                              <ArrowRightIcon className="w-5 h-5" />
                            </>
                          )
                        }
                      </Button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
