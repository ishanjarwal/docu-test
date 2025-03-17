"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

const AnimateUpOnAppear = ({
  children,
  delay = 0,
  duration = 0.6,
  yOffset = 50,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimateUpOnAppear;
