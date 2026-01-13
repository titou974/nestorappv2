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
      <motion.section
        className={`mx-auto max-w-screen-sm ${
          fixed
            ? `${styles.padding} fixed bottom-4 left-0 right-0 px-4 z-50` // ✅ Padding horizontal égal
            : ""
        } flex min-h-fit w-full flex-col items-center justify-center gap-5`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {children}
      </motion.section>
    )
  );
}
