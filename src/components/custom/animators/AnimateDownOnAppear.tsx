"use client";
import { motion, TargetAndTransition, VariantLabels } from "framer-motion";
import { ReactNode } from "react";

const AnimateDownOnAppear = ({
  children,
  delay = 0,
  duration = 0.6,
  yOffset = 20,
  exit,
  uniqueKey,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  exit?: TargetAndTransition | VariantLabels | undefined;
  uniqueKey?: string | undefined;
}) => {
  return (
    <motion.div
      exit={exit}
      key={uniqueKey}
      initial={{ opacity: 0, y: -yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default AnimateDownOnAppear;
