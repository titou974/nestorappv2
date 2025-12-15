"use client";
import { motion } from "framer-motion";
import styles from "@/components/style";
import { ReactNode } from "react";

export default function FooterBarLayout({
  children,
  isVisible = true,
  fixed = true,
}: {
  children: ReactNode;
  isVisible?: boolean;
  fixed?: boolean;
}) {
  return (
    isVisible && (
      <motion.div
        className={`mx-auto max-w-screen-sm ${
          fixed ? `${styles.padding} fixed bottom-4 left-1 right-1 z-50` : ""
        } flex min-h-fit w-full flex-col items-center justify-center gap-5`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {children}
      </motion.div>
    )
  );
}
