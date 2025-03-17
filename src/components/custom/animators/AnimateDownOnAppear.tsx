"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

const AnimateDownOnAppear = ({
  children,
  delay = 0,
  duration = 0.6,
  yOffset = 20,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default AnimateDownOnAppear;
