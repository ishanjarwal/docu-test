"use client";
import { motion, TargetAndTransition, VariantLabels } from "framer-motion";
import { ReactNode } from "react";

const AnimateUpOnAppear = ({
  children,
  delay = 0,
  duration = 0.6,
  yOffset = 50,
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
      key={uniqueKey}
      exit={exit}
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.5 }}
      className="bg-transparent"
    >
      {children}
    </motion.div>
  );
};

export default AnimateUpOnAppear;
