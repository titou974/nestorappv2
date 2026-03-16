"use client";
import { StringsFR } from "@/constants/fr_string";
import { licensePlateSchema } from "@/constants/validations";
import createToast from "@/lib/createToast";
import {
  completeTicket,
  deleteTicketPhoto,
} from "@/app/(valet)/dashboard/actions";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Button, Input, Label, Spinner, TextField } from "@heroui/react";
import { Icon } from "@iconify/react";
import { CameraIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { AnimatePresence, motion } from "framer-motion";
import imageCompression from "browser-image-compression";
import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import React from "react";

const COMPRESSION_OPTIONS = {
  maxSizeMB: 0.3,
  maxWidthOrHeight: 1280,
  useWebWorker: true,
};

export default function CompleteTicketModal({
  isOpen,
  ticketId,
  initialImmatriculation,
  initialPhotos,
  setIsOpen,
}: {
  isOpen: boolean;
  ticketId: string;
  initialImmatriculation: string;
  initialPhotos: string[];
  setIsOpen: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      id: string | null;
    }>
  >;
}) {
  const [immatriculation, setImmatriculation] = useState(
    initialImmatriculation,
  );
  const [savedPhotos, setSavedPhotos] = useState<string[]>(initialPhotos);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [pendingPreviews, setPendingPreviews] = useState<string[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoAdd = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    const remaining = 8 - savedPhotos.length - pendingFiles.length;
    if (remaining <= 0) return;
    const selected = Array.from(files).slice(0, remaining);

    setIsCompressing(true);
    try {
      const compressed = await Promise.all(
        selected.map((file) => imageCompression(file, COMPRESSION_OPTIONS)),
      );
      const previews = compressed.map((file) => URL.createObjectURL(file));
      setPendingFiles((prev) => [...prev, ...compressed]);
      setPendingPreviews((prev) => [...prev, ...previews]);
    } finally {
      setIsCompressing(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removePendingPhoto = (index: number) => {
    URL.revokeObjectURL(pendingPreviews[index]);
    setPendingFiles((prev) => prev.filter((_, i) => i !== index));
    setPendingPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveSavedPhoto = (url: string) => {
    startTransition(async () => {
      const result = await deleteTicketPhoto(ticketId, url);
      if (result.status === "SUCCESS") {
        setSavedPhotos(result.photos);
      } else {
        createToast(
          StringsFR.aErrorOccured,
          StringsFR.ourServerHasProblems,
          false,
        );
      }
    });
  };

  const handleSave = () => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("ticketId", ticketId);
      formData.append("immatriculation", immatriculation);
      formData.append("photos", JSON.stringify(savedPhotos));
      pendingFiles.forEach((file) => formData.append("photoFiles", file));

      const result = await completeTicket(formData);

      if (result.status === "ERROR") {
        createToast(result.title, result.content, false);
        return;
      }

      createToast(result.title, result.content, true);
      pendingPreviews.forEach(URL.revokeObjectURL);
      setIsOpen({ isOpen: false, id: null });
    });
  };

  const totalPhotos = savedPhotos.length + pendingPreviews.length;

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
              className="max-w-md w-full max-h-[90vh] overflow-y-auto bg-surface p-6 shadow-xl rounded-2xl flex flex-col gap-5"
            >
              <div className="text-center">
                <DialogTitle className="text-base font-semibold text-foreground">
                  {StringsFR.completeTicketModalTitle}
                </DialogTitle>
                <Description className="text-foreground/80 mt-1 text-sm">
                  {StringsFR.completeTicketModalDescription}
                </Description>
              </div>

              <TextField
                name="immatriculation"
                isInvalid={
                  !!immatriculation &&
                  !licensePlateSchema.safeParse(immatriculation).success
                }
              >
                <Label className="inline-flex items-center text-sm">
                  {StringsFR.immatriculation}
                </Label>
                <Input
                  isOnSurface
                  className="w-full uppercase"
                  placeholder={StringsFR.immatriculationPlaceholder}
                  value={immatriculation}
                  onChange={(e) => setImmatriculation(e.target.value)}
                />
                {!immatriculation && (
                  <Description
                    as="span"
                    className="flex items-center gap-1 text-accent"
                  >
                    <Icon icon="jam:alert" />
                    <span>{StringsFR.toComplete}</span>
                  </Description>
                )}
              </TextField>

              <div className="flex flex-col gap-2">
                <Label className="inline-flex items-center text-sm">
                  {StringsFR.vehicleConditionReport}
                </Label>

                {(savedPhotos.length > 0 || pendingPreviews.length > 0) && (
                  <div className="grid grid-cols-3 gap-2">
                    {savedPhotos.map((url) => (
                      <div key={url} className="relative group">
                        <Image
                          src={url}
                          alt="Photo véhicule"
                          width={120}
                          height={80}
                          className="w-full h-20 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveSavedPhoto(url)}
                          className="absolute -top-1.5 -right-1.5 bg-danger rounded-full p-0.5 opacity-100 transition-opacity"
                        >
                          <XMarkIcon className="size-3.5 text-white" />
                        </button>
                      </div>
                    ))}
                    {pendingPreviews.map((preview, index) => (
                      <div key={preview} className="relative group">
                        <Image
                          src={preview}
                          alt="Nouvelle photo"
                          width={120}
                          height={80}
                          unoptimized
                          className="w-full h-20 object-cover rounded-lg ring-2 ring-accent"
                        />
                        <button
                          type="button"
                          onClick={() => removePendingPhoto(index)}
                          className="absolute -top-1.5 -right-1.5 bg-danger rounded-full p-0.5 opacity-0 opacity-100 transition-opacity"
                        >
                          <XMarkIcon className="size-3.5 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  capture="environment"
                  className="hidden"
                  onChange={handlePhotoAdd}
                />
                <Button
                  variant="tertiary"
                  size="sm"
                  className="w-full border border-foreground/40 mt-4 text-foreground"
                  isPending={isCompressing}
                  isDisabled={totalPhotos >= 8}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {({ isPending: compressing }) =>
                    compressing ? (
                      <>
                        <Spinner color="current" size="sm" />
                        Compression...
                      </>
                    ) : (
                      <>
                        <CameraIcon className="size-4" />
                        {StringsFR.addPhotos}
                        {totalPhotos > 0 && (
                          <span className="text-foreground/60">
                            ({totalPhotos} photo{totalPhotos > 1 && "s"})
                          </span>
                        )}
                      </>
                    )
                  }
                </Button>
              </div>

              <div className="flex flex-row gap-2 md:gap-4 items-center mt-6 justify-center">
                <Button
                  onClick={() => setIsOpen({ isOpen: false, id: null })}
                  variant="secondary"
                  className="hover:bg-background/80"
                >
                  {StringsFR.cancel}
                </Button>
                <Button
                  onClick={handleSave}
                  isPending={isPending}
                  variant="primary"
                >
                  {({ isPending: saving }) =>
                    saving ? (
                      <>
                        {StringsFR.saving}
                        <Spinner color="current" size="sm" />
                      </>
                    ) : (
                      StringsFR.save
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
