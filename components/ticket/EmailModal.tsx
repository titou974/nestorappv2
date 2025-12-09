"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState, useActionState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

import { EmailTemplateProps } from "@/types/site";
import { StringsFR } from "@/constants/fr_string";
import { Button, FieldError, Input, Label, TextField } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import sendTicketByEmail from "@/app/(client)/ticket/actions";

const initialState = {
  message: "",
};

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
  const [email, setEmail] = useState("");

  const [state, formAction, pending] = useActionState(
    sendTicketByEmail.bind(null, userId, {
      siteName,
      scannedAt,
      ticketPrice,
      ticketNumber,
      companyCgu,
    }),
    initialState
  );

  // const handleSubmit = async () => {
  //   setLoadingEmail(true);
  //   if (!validateEmail(email)) {
  //     toast.error("Email Invalide", {
  //       position: "top-center",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //     setLoadingEmail(false);
  //     return null;
  //   } else {
  //     try {
  //       await axios.patch(`/api/user/${userId}`, {
  //         email: email,
  //       });
  //     } catch (error) {
  //       console.log("sauvegarde de l'email fail", error);
  //     }
  //     try {
  //       await axios.post("/api/sendticket", {
  //         email: email,
  //         siteName: siteName,
  //         scannedAt: scannedAt,
  //         ticketNumber: ticketNumber,
  //         ticketPrice: ticketPrice,
  //         companyCgu: companyCgu,
  //       });
  //       toast.success("Ticket envoyé ! Pensez à vérifier vos spams", {
  //         position: "top-center",
  //         autoClose: 7000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //       });
  //       closeModal();
  //       setLoadingEmail(false);
  //     } catch (error) {
  //       console.log("erreur de mail", error.message);
  //       toast.error("Un bug à eu lieu lors de l'envoi de votre ticket...", {
  //         position: "top-center",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //       });
  //       setLoadingEmail(false);
  //     }
  //   }
  // };

  useEffect(() => {
    console.log("message", state?.message, state?.errors);
  });

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <Dialog
            static
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="relative z-50"
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
                    <TextField isInvalid={!!state?.errors}>
                      <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        name="email"
                        required
                        placeholder={StringsFR.emailPlaceholder}
                        className="w-full bg-neutral-200 hover:bg-neutral-300"
                      />
                      <FieldError>L'email est invalide</FieldError>
                    </TextField>
                  </div>
                  <Button type="submit" isPending={pending}>
                    {StringsFR.receiveTicket}
                    <PaperAirplaneIcon />
                  </Button>
                </form>
              </DialogPanel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}
