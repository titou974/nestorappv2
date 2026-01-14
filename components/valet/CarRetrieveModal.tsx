import { StringsFR } from "@/constants/fr_string";
import { ModalProps } from "@/types/site";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Button, Spinner } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import { KeyIcon } from "@heroicons/react/20/solid";

export default function CarRetrieveModal({
  isOpen,
  setIsOpen,
  triggerCarRetrieved,
  ticketId,
  isLoading,
}: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          open={isOpen}
          onClose={() => setIsOpen({ isOpen: false, id: null })}
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
                {StringsFR.areYouSureToValidateCarRetrieveTitle}
              </DialogTitle>
              <Description className="text-foreground/80 mt-2 text-sm">
                {StringsFR.areYouSureToValidateCarRetrieveDescription}
              </Description>
              <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center mt-6">
                <Button
                  onClick={() => setIsOpen({ isOpen: false, id: null })}
                  variant="secondary"
                  className="hover:bg-background/80"
                >
                  {StringsFR.cancel}
                </Button>
                <Button
                  onClick={async () => {
                    await triggerCarRetrieved({
                      id: ticketId,
                      retrievedAt: new Date(),
                    });
                    setIsOpen({
                      isOpen: false,
                      id: null,
                    });
                  }}
                  isPending={isLoading}
                  variant="primary"
                >
                  {({ isPending }) =>
                    isPending ? (
                      <>
                        {StringsFR.yesGiveBackTheKey}
                        <Spinner color="current" size="sm" />
                      </>
                    ) : (
                      <>
                        {StringsFR.yesGiveBackTheKey}
                        <KeyIcon />
                      </>
                    )
                  }
                </Button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
