"use client";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
export default function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { y: 28 }} whileInView={{ y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}
