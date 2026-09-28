"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import DiagonalGallery from "./DiagonalGallery";
import { FiArrowUpRight, FiPlus } from "react-icons/fi";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.4,
  });
  // Preserve the original expansion distance while giving the gallery more scroll room.
  const expansionProgress = useTransform(progress, [0, 325 / 616], [0, 1]);
  const width = useTransform(expansionProgress, [0, 0.55], ["40%", "100%"]);
  const top = useTransform(expansionProgress, [0, 0.55], ["65%", "0%"]);
  const height = useTransform(expansionProgress, [0, 0.55], ["64%", "100%"]);
  const leftX = useTransform(expansionProgress, [0, 0.45], ["0%", "-125%"]);
  const rightX = useTransform(expansionProgress, [0, 0.45], ["0%", "125%"]);
  const sideY = useTransform(expansionProgress, [0, 0.45], ["0%", "-18%"]);
  const sideOpacity = useTransform(expansionProgress, [0.24, 0.45], [1, 0]);
  const titleY = useTransform(expansionProgress, [0, 0.45], ["0svh", "-100svh"]);
  const galleryTarget = useTransform(scrollYProgress, [178.75 / 616, 1], [0, 1]);
  const galleryProgress = useSpring(galleryTarget, {
    stiffness: 55,
    damping: 24,
    mass: 0.8,
  });

  return (
    <section
      ref={section}
      className="property-hero relative"
      aria-labelledby="hero-title"
    >
      <div className="property-hero-stage pointer-events-none  sticky top-0 z-60 h-svh overflow-hidden">
        <motion.div
          className="property-hero-copy absolute inset-x-0 top-[19%] px-5 text-center"
          style={reducedMotion ? undefined : { y: titleY }}
        >
          <h1
            id="hero-title"
            className="text-[clamp(2.25rem,5.7vw,7rem)] leading-[1.13] font-extralight uppercase text-[#1C1C1A]"
          >
            Luxury Residences <br /> in Swiss
          </h1>
          <Link
            href="/properties"
            className="group pointer-events-auto mt-8 inline-flex items-center gap-2 bg-[#1C1C1A] px-5 py-3 text-[12px] font-medium text-white transition-colors duration-300 hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1C1C1A] sm:mt-10"
          >
            Explore properties
            <FiArrowUpRight aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-5 top-[54%] flex justify-between text-2xl font-extralight text-black/20 sm:inset-x-8"
        >
          <FiPlus />
          <FiPlus />
        </div>

        <motion.div
          className="property-hero-side absolute top-[82%] left-0 h-[45%] w-[25%] overflow-hidden bg-[#d7d5cf]"
          style={
            reducedMotion
              ? undefined
              : { x: leftX, y: sideY, opacity: sideOpacity }
          }
        >
          <Image
            src="/images/vistelya/garden.webp"
            alt="Contemporary residence surrounded by lush gardens"
            fill
            sizes="25vw"
            className="object-cover"
          />
        </motion.div>
        <motion.div
          className="property-hero-side absolute top-[82%] right-0 h-[45%] w-[25%] overflow-hidden bg-[#d7d5cf]"
          style={
            reducedMotion
              ? undefined
              : { x: rightX, y: sideY, opacity: sideOpacity }
          }
        >
          <Image
            src="/images/vistelya/living.webp"
            alt="Light-filled luxury interior with refined natural finishes"
            fill
            sizes="25vw"
            className="object-cover"
          />
        </motion.div>
        <motion.div
          className="property-hero-center absolute top-[65%] left-1/2 z-10 h-[64%] w-[40%] -translate-x-1/2 overflow-hidden bg-[#d7d5cf]"
          style={reducedMotion ? undefined : { width, top, height }}
        >
          <Image
            src="/images/vistelya/villa.webp"
            alt="Ivory stone villa with a reflecting pool overlooking an alpine lake"
            fill
            preload
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        {!reducedMotion && <DiagonalGallery progress={galleryProgress} />}
      </div>
    </section>
  );
}
