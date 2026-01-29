"use client";

import {
  Dialog,
  DialogDescription,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState, useActionState, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";

import { RetrieveCarModalProps } from "@/types/site";
import { StringsFR } from "@/constants/fr_string";
import {
  Button,
  Input,
  Label,
  Spinner,
  ComboBox,
  Description,
  ListBox,
} from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { askToPickupCar } from "@/app/(client)/ticket/actions";
import { withCallbacks, toastCallback } from "@/lib/toastCallback";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { PICKUP_TIME_OPTIONS } from "@/constants";
import blueCar from "@/assets/bluecar.json";
import { formatHour } from "@/lib/formatHour";

const initialState = null;

export default function RetrieveCarModal({
  isOpen,
  setIsOpen,
  ticketId,
  requestedPickupTimeData,
}: RetrieveCarModalProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [carRequested, setCarRequested] = useState<boolean>(
    !!requestedPickupTimeData,
  );
  const [requestedPickupTime, setRequestedPickupTime] = useState<string>(
    PICKUP_TIME_OPTIONS[1].value,
  );

  const [state, formAction, pending] = useActionState(
    withCallbacks(
      askToPickupCar.bind(null, ticketId, requestedPickupTime),
      toastCallback(() => setCarRequested(true)),
    ),
    initialState,
  );

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
                {carRequested ? (
                  <motion.div
                    key="car-requested"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-between space-y-6 min-h-80"
                  >
                    <div className="text-center space-y-2 z-10">
                      <DialogTitle className="text-lg font-semibold text-foreground">
                        Le voiturier prépare votre véhicule !
                      </DialogTitle>
                      <Description className="text-sm text-muted-foreground">
                        Votre voiture sera prête pour{" "}
                        <span className="font-semibold text-foreground">
                          {formatHour(requestedPickupTimeData as Date)}
                        </span>
                      </Description>
                    </div>

                    <Lottie
                      lottieRef={lottieRef}
                      animationData={blueCar}
                      className="w-80 h-80 absolute"
                      autoPlay={true}
                      loop={true}
                    />

                    <Button
                      onPress={() => setIsOpen(false)}
                      variant="secondary"
                      className="mt-4"
                    >
                      Fermer
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8 min-h-80"
                  >
                    <DialogTitle className="text-lg font-semibold text-foreground text-center">
                      {StringsFR.retrieveCarModalTitle}
                    </DialogTitle>

                    <form
                      action={formAction}
                      className="flex flex-col space-y-6 w-full items-center justify-center h-full min-h-60 gap-6"
                    >
                      <ComboBox
                        allowsCustomValue
                        className="w-full max-w-[256px]"
                        inputValue={requestedPickupTime}
                        onInputChange={setRequestedPickupTime}
                      >
                        <Label>{StringsFR.selectTimeLabel}</Label>
                        <ComboBox.InputGroup>
                          <Input placeholder="Sélectionnez un délai..." />
                          <ComboBox.Trigger />
                        </ComboBox.InputGroup>
                        <ComboBox.Popover>
                          <ListBox>
                            {PICKUP_TIME_OPTIONS.map((option) => (
                              <ListBox.Item
                                key={option.id}
                                id={option.id}
                                textValue={option.value}
                              >
                                {option.value}
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </ComboBox.Popover>
                        <Description>
                          {StringsFR.selectTimeDescription}
                        </Description>
                      </ComboBox>

                      <Button
                        type="submit"
                        isPending={pending}
                        className="w-full max-w-[256px]"
                      >
                        {({ isPending }) =>
                          isPending ? (
                            <>
                              <p>{StringsFR.isSending}</p>
                              <Spinner color="current" size="sm" />
                            </>
                          ) : (
                            <>
                              <p>{StringsFR.sendToValet}</p>
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
