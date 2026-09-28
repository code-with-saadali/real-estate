"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { FiArrowUp, FiArrowUpRight } from "react-icons/fi";

export default function ComeHome() {
  const section = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  return (
    <section
      ref={section}
      className="overflow-hidden bg-[#EFEFEF] px-4 pt-12 text-[#1C1C1A] md:px-8 md:pt-20 lg:px-16"
      aria-labelledby="come-home-title"
    >
      <div className="w-full">
        <div className="flex items-center justify-between border-t border-black/10 pt-5 text-[10px] text-[#1C1C1A]/60 md:text-xs">
          <span>A new beginning</span>
          <span>Distinctly Vistelya</span>
        </div>

        <header className="mx-auto max-w-3xl py-10 text-center md:py-14 lg:py-16">
          <h2
            id="come-home-title"
            className="text-balance text-[clamp(2rem,4vw,4.25rem)] leading-[1.18] font-normal tracking-tight"
          >
            Your next chapter
            <br />
            <span className="text-[#81745f]">begins at home.</span>
          </h2>
          <p className="font mx-auto mt-4 max-w-sm text-balance text-xs leading-[1.8] text-[#1C1C1A]/65 md:mt-5 md:text-sm">
            Discover thoughtful spaces for the life you want to live.
          </p>
        </header>

        <div className="relative">
          <figure className="relative h-[48svh] overflow-hidden bg-[#d7d5cf] md:h-[65svh]">
            <motion.div
              className="absolute inset-x-0 inset-y-[-8%]"
              style={
                reducedMotion ? undefined : { y: imageY, scale: imageScale }
              }
            >
              <Image
                src="/images/vistelya/estate.webp"
                alt="Ivory stone estate with landscaped gardens overlooking an alpine lake"
                fill
                sizes="100vw"
                className="object-cover object-[center_45%]"
              />
            </motion.div>
          </figure>

          <motion.div
            className="relative ml-auto -mt-12 w-[94%] border-l-10 border-t-10 border-[#EFEFEF] bg-[#EFEFEF] px-4 pb-5 pt-7 md:absolute md:right-0 md:bottom-0 md:mt-0 md:w-[48%] md:border-l-16 md:border-t-16 md:px-7 md:pb-8 md:pt-8 lg:w-[41%] lg:px-10 lg:py-10"
            initial={reducedMotion ? false : { y: 24 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-4 text-[10px] text-[#8A7045]">
              Make yourself at home
            </p>
            <h3 className="text-[clamp(1.5rem,2.6vw,3rem)] leading-[1.15] font-normal">
              Find a place
              <br />
              that feels like you.
            </h3>
            <p className="font mt-5 max-w-sm text-xs leading-[1.9] text-[#1C1C1A]/65">
              From open lake views to quiet garden corners, your search begins
              with a feeling.
            </p>
            <a
              href="#featured-residences"
              className="group mt-7 inline-flex items-center gap-2 bg-[#1C1C1A] px-5 py-3 text-xs font-medium text-white transition-colors duration-300 hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1C1C1A]"
            >
              Discover the collection
              <FiArrowUpRight
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
              />
            </a>
          </motion.div>
        </div>

        <div className="flex items-center justify-between gap-5 border-b border-black/10 py-7 md:py-9">
          <p className="font max-w-xs text-[10px] leading-relaxed text-[#1C1C1A]/60 md:text-xs">
            Considered spaces. Exceptional surroundings.
          </p>
          <a
            href="#home"
            className="group flex shrink-0 items-center gap-3 text-[10px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8A7045] md:text-xs"
          >
            Back to top
            <FiArrowUp
              aria-hidden="true"
              className="text-base transition-transform group-hover:-translate-y-1 motion-reduce:transform-none"
            />
          </a>
        </div>
        <div
          aria-hidden="true"
          className="overflow-hidden py-8 text-center text-[clamp(3rem,16vw,18rem)] leading-none text-[#1C1C1A]/10 md:py-12"
        >
          Vistelya
        </div>
      </div>
    </section>
  );
}
