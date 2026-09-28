"use client";

import { useRef } from "react";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

export default function VistelyaApproach() {
  const section = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start end", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 26,
    mass: 0.7,
  });
  const firstLineY = useTransform(progress, [0.12, 0.4], ["110%", "0%"]);
  const secondLineY = useTransform(progress, [0.2, 0.5], ["110%", "0%"]);
  const firstLineX = useTransform(progress, [0.4, 1], ["0vw", "-5vw"]);
  const secondLineX = useTransform(progress, [0.5, 1], ["0vw", "5vw"]);
  const imageReveal = useTransform(
    progress,
    [0.18, 0.7],
    ["inset(0% 22% 0% 22%)", "inset(0% 0% 0% 0%)"],
  );
  const imageScale = useTransform(progress, [0.2, 1], [1.15, 1]);

  return (
    <section
      ref={section}
      className="h-[210svh] motion-reduce:h-auto relative bg-[#EFEFEF] text-[#1C1C1A]"
      aria-labelledby="approach-title"
    >
      <div className="motion-reduce:relative motion-reduce:min-h-svh sticky top-0 h-svh overflow-hidden">
        <div className="absolute inset-x-4 top-[4%] flex items-center justify-between border-t border-black/10 pt-4 text-[9px] text-[#1C1C1A]/60 md:inset-x-8 md:text-[11px] lg:inset-x-16">
          <span>The art of living well</span>
          <span>Vistelya / A different perspective</span>
        </div>

        <h2
          id="approach-title"
          className="absolute inset-x-0 top-[18%] md:top-[12%] z-10 text-center text-[clamp(3rem,13vw,5rem)] md:text-[min(9.2vw,13svh,10rem)] leading-[0.98] font-normal"
          aria-label="Room to breathe."
        >
          <span className="block overflow-hidden pb-1" aria-hidden="true">
            <motion.span
              className="block"
              style={
                reducedMotion ? undefined : { y: firstLineY, x: firstLineX }
              }
            >
              Room to
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-2" aria-hidden="true">
            <motion.span
              className="block"
              style={
                reducedMotion ? undefined : { y: secondLineY, x: secondLineX }
              }
            >
              breathe.
            </motion.span>
          </span>
        </h2>

        <motion.figure
          className="absolute inset-x-4 top-[43%] h-[45%] md:top-[46%] md:h-[43%] overflow-hidden bg-[#d7d5cf] md:inset-x-8 lg:inset-x-16"
          style={reducedMotion ? undefined : { clipPath: imageReveal }}
        >
          <motion.div
            className="absolute inset-0"
            style={reducedMotion ? undefined : { scale: imageScale }}
          >
            <Image
              src="/images/vistelya/terrace.webp"
              alt="Quiet ivory stone terrace overlooking a still alpine lake and mountain peaks"
              fill
              sizes="100vw"
              className="object-cover object-[center_55%]"
            />
          </motion.div>
        </motion.figure>

        <div className="approach-editorial-caption absolute inset-x-4 bottom-[4%] flex items-start justify-between gap-6 md:inset-x-8 lg:inset-x-16">
          <p className="font max-w-xs text-[10px] leading-relaxed text-[#1C1C1A]/70 md:max-w-md md:text-xs">
            Open views. Quiet moments. A place that feels like you.
          </p>
          <FiArrowUpRight
            aria-hidden="true"
            className="shrink-0 text-lg text-[#8A7045]"
          />
        </div>
      </div>
    </section>
  );
}
