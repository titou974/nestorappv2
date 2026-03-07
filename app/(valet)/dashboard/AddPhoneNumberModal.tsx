"use client";
import { useState, useTransition } from "react";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  Button,
  FieldError,
  InputGroup,
  InputOTP,
  Label,
  Spinner,
  TextField,
} from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import { StringsFR } from "@/constants/fr_string";
import createToast from "@/lib/createToast";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { frenchPhoneNumberSchema } from "@/constants/validations";
import { formatPhoneNumber } from "@/lib/formatPhoneNumber";
import { addPhoneNumber, verifyAddedPhone } from "./actions";
import { sendOtp } from "@/app/(valet)/actions";

export default function AddPhoneNumberModal({
  hasPhoneNumber,
}: {
  hasPhoneNumber: boolean;
}) {
  const [isOpen, setIsOpen] = useState(!hasPhoneNumber);
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [rawPhone, setRawPhone] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [isPending, startTransition] = useTransition();

  const isPhoneValid = frenchPhoneNumberSchema.safeParse(rawPhone).success;

  const handleSendCode = () => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("phone", rawPhone);
      const result = await addPhoneNumber(null, formData);

      if (result?.status === "ERROR") {
        createToast(result.title, result.content, false);
        return;
      }

      setPhone(formatPhoneNumber(rawPhone));
      setStep("otp");
    });
  };

  const handleVerifyCode = () => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("code", otpCode);
      const result = await verifyAddedPhone(phone, null, formData);

      if (result?.status === "ERROR") {
        createToast(result.title, result.content, false);
        return;
      }

      if (result?.status === "SUCCESS") {
        createToast(result.title, result.content, true);
        setIsOpen(false);
      }
    });
  };

  const handleResend = () => {
    startTransition(async () => {
      await sendOtp(phone);
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          open={isOpen}
          onClose={() => {}}
          className="relative z-50"
          data-theme="nestor-dark"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-2xl"
          />
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel
              as={motion.div}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-md w-full bg-surface/60 p-6 shadow-xl rounded-2xl flex flex-col items-center justify-center text-center"
            >
              <DialogTitle className="text-base font-semibold text-foreground">
                {StringsFR.titleAddPhoneModal}
              </DialogTitle>
              <Description className="text-foreground/80 mt-1 text-sm text-balance">
                {step === "phone"
                  ? StringsFR.descriptionAddPhoneModal
                  : `${StringsFR.weHaveSentACodeAtYourPhoneNumber} ${phone}`}
              </Description>

              {step === "phone" ? (
                <div className="w-full mt-6 text-left">
                  <TextField
                    isRequired
                    name="phone"
                    type="tel"
                    className="w-full"
                    isInvalid={!!rawPhone && !isPhoneValid}
                  >
                    <Label>{StringsFR.phoneNumber}</Label>
                    <InputGroup>
                      <InputGroup.Prefix className="text-foreground border-r-2 border-foreground/20 mr-2">
                        {StringsFR.frenchNumberPrefix}
                      </InputGroup.Prefix>
                      <InputGroup.Input
                        type="tel"
                        value={rawPhone}
                        onChange={(e) => setRawPhone(e.target.value)}
                      />
                    </InputGroup>
                    <FieldError>{StringsFR.phoneError}</FieldError>
                  </TextField>
                  <div className="flex justify-center mt-6">
                    <Button
                      onClick={handleSendCode}
                      variant="primary"
                      isDisabled={!isPhoneValid || isPending}
                      isPending={isPending}
                    >
                      {({ isPending }) =>
                        isPending ? (
                          <>
                            <p>{StringsFR.sendingCode}</p>
                            <Spinner color="current" size="sm" />
                          </>
                        ) : (
                          <>
                            <p>{StringsFR.sendCode}</p>
                            <ArrowRightIcon width={20} />
                          </>
                        )
                      }
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="w-full mt-6 flex flex-col items-center gap-4">
                  <InputOTP
                    maxLength={6}
                    value={otpCode}
                    onChange={setOtpCode}
                    name="code"
                  >
                    <InputOTP.Group>
                      <InputOTP.Slot index={0} />
                      <InputOTP.Slot index={1} />
                      <InputOTP.Slot index={2} />
                    </InputOTP.Group>
                    <InputOTP.Separator />
                    <InputOTP.Group>
                      <InputOTP.Slot index={3} />
                      <InputOTP.Slot index={4} />
                      <InputOTP.Slot index={5} />
                    </InputOTP.Group>
                  </InputOTP>
                  <div className="flex items-center gap-[5px]">
                    <p className="text-sm text-muted">
                      {StringsFR.youDidntReceivedTheCode}
                    </p>
                    <button
                      type="button"
                      className="text-sm text-foreground underline"
                      onClick={handleResend}
                      disabled={isPending}
                    >
                      {StringsFR.resend}
                    </button>
                  </div>
                  <Button
                    onClick={handleVerifyCode}
                    variant="primary"
                    isDisabled={otpCode.length !== 6 || isPending}
                    isPending={isPending}
                  >
                    {({ isPending }) =>
                      isPending ? (
                        <>
                          <p>{StringsFR.verifying}</p>
                          <Spinner color="current" size="sm" />
                        </>
                      ) : (
                        <>
                          <p>{StringsFR.verifyYourNumber}</p>
                          <ArrowRightIcon width={20} />
                        </>
                      )
                    }
                  </Button>
                </div>
              )}
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
