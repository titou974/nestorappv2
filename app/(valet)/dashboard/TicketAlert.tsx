"use client";
import { StringsFR } from "@/constants/fr_string";
import { useTicketsOfSession } from "@/utils/dashboard/useTicketsofSession";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { Alert, Button, Skeleton } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";

export default function TicketAlert({
  siteId,
  startedAt,
  workSessionId,
}: {
  siteId: string;
  startedAt: Date;
  workSessionId: string;
}) {
  const {
    isTicketsLoading,
    numberOfTicketsToCompleteImmat,
    numberOfCarsToPickup,
    isValidating,
  } = useTicketsOfSession(siteId, startedAt, workSessionId);

  if (isTicketsLoading) {
    return <Skeleton className="w-full rounded-3xl min-h-[76px]" />;
  }

  const fadeInVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  const getAlertType = () => {
    if (numberOfCarsToPickup >= 1) return "pickup";
    if (numberOfTicketsToCompleteImmat > 0) return "immat";
    return "success";
  };

  const alertType = getAlertType();

  return (
    <AnimatePresence mode="wait">
      {alertType === "pickup" && (
        <motion.div
          key="pickup"
          variants={fadeInVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          <Alert status="warning">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>
                {numberOfCarsToPickup > 1
                  ? `${numberOfCarsToPickup} ${StringsFR.clientsWaitingForCars || "clients attendent leurs voitures"}`
                  : `${StringsFR.clientWaitingForCar || "Un client attend sa voiture"}`}
              </Alert.Title>
              <Alert.Description>
                {StringsFR.urgentCarPickup ||
                  "Des clients souhaitent récupérer leur véhicule rapidement"}
              </Alert.Description>
            </Alert.Content>
            <Button
              isDisabled
              className="hidden sm:block"
              size="sm"
              variant="primary"
              isPending={isValidating}
            >
              {({ isPending }) =>
                isPending ? (
                  <ArrowPathIcon width={20} className="animate-spin" />
                ) : (
                  <ArrowPathIcon width={20} />
                )
              }
            </Button>
          </Alert>
        </motion.div>
      )}

      {alertType === "immat" && (
        <motion.div
          key="immat"
          variants={fadeInVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          <Alert status="accent">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>
                {StringsFR.youHave} {numberOfTicketsToCompleteImmat}{" "}
                {numberOfTicketsToCompleteImmat > 1
                  ? StringsFR.tickets
                  : StringsFR.ticket}{" "}
                {StringsFR.toComplete}
              </Alert.Title>
              <Alert.Description>
                {StringsFR.addTheImmatMissingOnTicket}
              </Alert.Description>
            </Alert.Content>
            <Button
              isDisabled
              className="hidden sm:block"
              size="sm"
              variant="primary"
              isPending={isValidating}
            >
              {({ isPending }) =>
                isPending ? (
                  <ArrowPathIcon width={20} className="animate-spin" />
                ) : (
                  <ArrowPathIcon width={20} />
                )
              }
            </Button>
          </Alert>
        </motion.div>
      )}

      {alertType === "success" && (
        <motion.div
          key="success"
          variants={fadeInVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          <Alert status="success">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>{StringsFR.allTicketsCompleted}</Alert.Title>
            </Alert.Content>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
