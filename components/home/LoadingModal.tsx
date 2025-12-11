"use client";
import { StringsFR } from "@/constants/fr_string";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import Loading from "../animations/Loading";

function LoadingModal({ title, isOpen }: { title: string; isOpen: boolean }) {
  return (
    <AnimatePresence>
      <Dialog static open={isOpen} onClose={() => {}} className="relative z-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30"
        />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-md w-full space-y-4 bg-white p-6 shadow-xl rounded-2xl flex flex-col items-center justify-center">
            <div className="text-center flex flex-col items-center space-y-2">
              <DialogTitle className="text-lg font-semibold text-foreground">
                {title}
              </DialogTitle>
              <p className="text-sm font-light text-foreground">
                {StringsFR.waitaFewSeconds}
              </p>
            </div>
            <Loading />
          </DialogPanel>
        </div>
      </Dialog>
    </AnimatePresence>
  );
}

export default LoadingModal;
