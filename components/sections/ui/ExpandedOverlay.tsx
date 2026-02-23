"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

type ExpandedOverlayProps = {
  isOpen: boolean;
  clipFrom: string;
  children: ReactNode;
  padding?: string;
  uniqueKey: string;
};

export default function ExpandedOverlay({
  isOpen,
  clipFrom,
  children,
  padding = "p-6",
  uniqueKey,
}: ExpandedOverlayProps) {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key={uniqueKey}
          className="fixed inset-0 z-50 bg-background"
          initial={{ clipPath: clipFrom }}
          animate={{ clipPath: "inset(0px 0px 0px 0px)" }}
          exit={{ clipPath: clipFrom }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className={`h-full overflow-auto ${padding}`}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.35, delay: 0.08 },
            }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
