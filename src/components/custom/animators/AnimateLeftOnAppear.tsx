"use client";
import { motion, TargetAndTransition, VariantLabels } from "framer-motion";
import { ReactNode } from "react";

const AnimateLeftOnAppear = ({
  children,
  delay = 0,
  duration = 0.6,
  xOffset = 50,
  exit,
  uniqueKey,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  xOffset?: number;
  exit?: TargetAndTransition | VariantLabels | undefined;
  uniqueKey?: string | undefined;
}) => {
  return (
    <motion.div
      key={uniqueKey}
      exit={exit}
      initial={{ opacity: 0, x: xOffset }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.5 }}
      className="bg-transparent"
    >
      {children}
    </motion.div>
  );
};

export default AnimateLeftOnAppear;
