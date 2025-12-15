"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState, useActionState, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";

import { EmailTemplateProps } from "@/types/site";
import { StringsFR } from "@/constants/fr_string";
import {
  Button,
  FieldError,
  Input,
  Label,
  Spinner,
  TextField,
} from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import sendTicketByEmail from "@/app/(client)/ticket/actions";
import { resetFieldError } from "@/lib/resetFieldError";
import { emailSchema } from "@/constants/validations";
import { withCallbacks, toastCallback } from "@/lib/toastCallback";
import CheckAnimationBlue from "../animations/CheckBlue";
import { LottieRefCurrentProps } from "lottie-react";

const initialState = null;

export default function EmailModal({
  isOpen,
  setIsOpen,
  siteName,
  scannedAt,
  ticketPrice,
  ticketNumber,
  userId,
  companyCgu,
}: EmailTemplateProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [displayAnimation, setDisplayAnimation] = useState<boolean>(false);
  const [email, setEmail] = useState("");

  const [state, formAction, pending] = useActionState(
    withCallbacks(
      sendTicketByEmail.bind(null, userId, {
        siteName,
        scannedAt,
        ticketPrice,
        ticketNumber,
        companyCgu,
      }),
      toastCallback(() => setIsOpen(false))
    ),
    initialState
  );

  const handleFieldValidation = (value: string) => {
    setEmail(value);
    resetFieldError(state, "0");
    const isValid = emailSchema.safeParse(value).success;

    if (!displayAnimation && isValid) {
      setDisplayAnimation(true);
      queueMicrotask(() => {
        lottieRef.current?.play();
      });
    } else if (!isValid && displayAnimation) {
      setDisplayAnimation(false);
      queueMicrotask(() => {
        lottieRef.current?.stop();
      });
    }
  };

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
              className="max-w-md w-full space-y-8 bg-white p-6 shadow-xl rounded-2xl flex flex-col items-center justify-center"
            >
              <DialogTitle className="text-lg font-semibold text-foreground">
                {StringsFR.enterYourEmail}
              </DialogTitle>
              <form
                action={formAction}
                className="flex flex-col space-y-6 w-full items-center"
              >
                <div className="flex flex-col gap-1 w-full">
                  <Label htmlFor="input-type-email">
                    {StringsFR.emailLabel}
                  </Label>
                  <TextField
                    isInvalid={
                      !emailSchema.safeParse(email).success &&
                      state?.errors &&
                      !!state?.errors.formErrors["0"]
                    }
                  >
                    <div className="relative w-full">
                      <Input
                        value={email}
                        onChange={(e) => {
                          handleFieldValidation(e.target.value);
                        }}
                        type="email"
                        name="email"
                        required
                        placeholder={StringsFR.emailPlaceholder}
                        className="w-full hover:bg-neutral-200"
                      />
                      {displayAnimation && (
                        <CheckAnimationBlue lottieRef={lottieRef} />
                      )}
                    </div>
                    <FieldError>{StringsFR.emailAdressError}</FieldError>
                  </TextField>
                </div>
                <Button type="submit" isPending={pending}>
                  {({ isPending }) =>
                    isPending ? (
                      <>
                        <p>{StringsFR.isSending}</p>
                        <Spinner color="current" size="sm" />
                      </>
                    ) : (
                      <>
                        <p>{StringsFR.receiveTicket}</p>
                        <PaperAirplaneIcon />
                      </>
                    )
                  }
                </Button>
              </form>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
