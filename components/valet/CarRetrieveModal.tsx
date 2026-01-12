import { StringsFR } from "@/constants/fr_string";
import { ModalProps } from "@/types/site";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Button } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRightCircleIcon } from "@heroicons/react/20/solid";

export default function CarRetrieveModal({ isOpen, setIsOpen }: ModalProps) {
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
                {StringsFR.areYouSureToValidateCarRetrieveTitle}
              </DialogTitle>
              <Description>
                {StringsFR.areYouSureToValidateCarRetrieveDescription}
              </Description>
              <div className="flex gap-4 items-center">
                <Button variant="secondary" />
                <Button variant="primary" />
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
