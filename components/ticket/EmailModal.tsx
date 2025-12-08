"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import type { MouseEvent } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { EmailTemplateProps } from "@/types/site";
import { StringsFR } from "@/constants/fr_string";
import { Button, Input } from "@heroui/react";

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
  const [loadingEmail, setLoadingEmail] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    setLoadingEmail(true);
    if (!validateEmail(email)) {
      toast.error("Email Invalide", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoadingEmail(false);
      return null;
    } else {
      try {
        await axios.patch(`/api/user/${userId}`, {
          email: email,
        });
      } catch (error) {
        console.log("sauvegarde de l'email fail", error);
      }
      try {
        await axios.post("/api/sendticket", {
          email: email,
          siteName: siteName,
          scannedAt: scannedAt,
          ticketNumber: ticketNumber,
          ticketPrice: ticketPrice,
          companyCgu: companyCgu,
        });
        toast.success("Ticket envoyé ! Pensez à vérifier vos spams", {
          position: "top-center",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        closeModal();
        setLoadingEmail(false);
      } catch (error) {
        console.log("erreur de mail", error.message);
        toast.error("Un bug à eu lieu lors de l'envoi de votre ticket...", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setLoadingEmail(false);
      }
    }
  };

  function closeModal() {
    if (!loadingEmail) {
      setIsOpen(false);
    }
  }

  return (
    <>
      <div></div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-opacity/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform space-y-8 overflow-hidden rounded-2xl bg-neutral p-6 text-center align-middle text-base shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="font-medium leading-6 text-foreground"
                  >
                    {StringsFR.enterYourEmail}
                  </Dialog.Title>
                  <Input
                    value={email}
                    onValueChange={setEmail}
                    variant="flat"
                    type="email"
                    label="Email"
                    placeholder="nestor@gmail.com"
                  />
                  <Button
                    radius="full"
                    color="primary"
                    onClick={(e) => handleSubmit(e)}
                    isLoading={loadingEmail}
                  >
                    {StringsFR.receiveTicket}
                  </Button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
