"use client";
import { useState, useTransition } from "react";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Button, Checkbox, Label } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import { StringsFR } from "@/constants/fr_string";
import createToast from "@/lib/createToast";
import { CheckIcon } from "@heroicons/react/20/solid";
import { acceptWorkConditions } from "@/app/(valet)/dashboard/actions";

export default function ResponsabilityModal({
  workSessionId,
  acceptedWorkConditions = false,
}: {
  workSessionId: string;
  acceptedWorkConditions: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [acceptValetConditions, setAcceptValetConditions] = useState(false);
  const [isOpen, setIsOpen] = useState(!acceptedWorkConditions);

  const handleAcceptOfValetConditions = () => {
    if (!acceptValetConditions) {
      createToast(
        StringsFR.haveToAcceptValetRules,
        StringsFR.haveToAcceptValetRulesDescription,
        false
      );
      return;
    }

    setIsOpen(false);

    startTransition(async () => {
      await acceptWorkConditions({
        workSessionId: workSessionId,
      });
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
              className="max-w-md w-full bg-surface p-6 shadow-xl rounded-2xl flex flex-col items-center justify-center text-center"
            >
              <DialogTitle className="text-base font-semibold text-foreground">
                {StringsFR.titleResponsabilityModal}
              </DialogTitle>
              <Description className="text-foreground/80 mt-2 text-sm text-balance">
                {StringsFR.descriptionResponsabilityModal}
              </Description>
              <div className="flex items-center gap-3 mt-6">
                <Checkbox
                  id="valet-terms"
                  data-theme="nestor-dark"
                  isSelected={acceptValetConditions}
                  onChange={setAcceptValetConditions}
                >
                  <Checkbox.Control
                    className="bg-foreground hover:bg-accent"
                    data-theme="nestor-dark"
                  >
                    <Checkbox.Indicator className="hover:bg-accent" />
                  </Checkbox.Control>
                </Checkbox>
                <Label htmlFor="valet-terms">
                  {StringsFR.acceptValetConditions}
                </Label>
              </div>

              <div className="flex gap-4 items-center mt-6">
                <Button
                  onClick={handleAcceptOfValetConditions}
                  variant="primary"
                >
                  <>
                    {StringsFR.ok}
                    <CheckIcon />
                  </>
                </Button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
