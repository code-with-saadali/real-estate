"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

const residences = [
  {
    title: "A life in the open.",
    category: "Garden residences",
    image: "/images/vistelya/estate.webp",
    alt: "Contemporary residence with landscaped outdoor spaces",
    description: "Beautiful spaces. A closer connection to nature.",
  },
  {
    title: "Room to unwind.",
    category: "Considered interiors",
    image: "/images/vistelya/living.webp",
    alt: "Warm and spacious contemporary living room",
    description: "Natural light, quiet corners, and a sense of belonging.",
  },
  {
    title: "Your own escape.",
    category: "Private retreats",
    image: "/images/vistelya/villa.webp",
    alt: "Modern white villa with a swimming pool",
    description: "Everyday living, with a different perspective.",
  },
];

function ResidenceCard({
  residence,
  index,
  progress,
  reducedMotion,
}: {
  residence: (typeof residences)[number];
  index: number;
  progress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const arrival = index === 0 ? 0 : index === 1 ? 0.22 : 0.53;
  const y = useTransform(progress, [arrival, arrival + 0.24], ["115%", "0%"]);
  const nextArrival = index === 0 ? 0.22 : 0.53;
  const scale = useTransform(
    progress,
    [nextArrival, nextArrival + 0.24],
    [1, 0.94],
  );
  const imageScale = useTransform(
    progress,
    [arrival, arrival + 0.44],
    [1.1, 1],
  );

  return (
    <motion.article
      className="residence-card absolute inset-x-0 top-0 h-full origin-top overflow-hidden bg-[#343831]"
      style={
        reducedMotion
          ? undefined
          : {
              y: index === 0 ? 0 : y,
              scale: index === 2 ? 1 : scale,
              zIndex: index + 1,
            }
      }
    >
      <motion.div
        className="absolute inset-0"
        style={reducedMotion ? undefined : { scale: imageScale }}
      >
        <Image
          src={residence.image}
          alt={residence.alt}
          fill
          sizes="(max-width: 639px) 92vw, 90vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-black/15" />
      <div className="absolute inset-x-5 top-5 flex items-center justify-between text-[10px] text-white sm:inset-x-9 sm:top-8 sm:text-xs">
        <span>{residence.category}</span>
        <span>0{index + 1} / 03</span>
      </div>
      <div className="absolute inset-x-5 bottom-7 text-white sm:inset-x-9 sm:bottom-10 lg:inset-x-12">
        <h3 className="text-[clamp(2rem,5vw,5.5rem)] leading-[1.1] font-normal">
          {residence.title}
        </h3>
        <p className="font mt-4 max-w-lg text-xs leading-relaxed text-white/80 sm:text-sm">
          {residence.description}
        </p>
      </div>
    </motion.article>
  );
}

export default function FeaturedResidences() {
  const section = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 26,
    mass: 0.7,
  });

  return (
    <section
      id="featured-residences"
      ref={section}
      className="featured-residences relative bg-[#EFEFEF]"
      aria-labelledby="residences-title"
    >
      <div className="residences-stage sticky top-0 h-svh overflow-hidden px-4 sm:px-8 lg:px-16">
        <header className="flex h-[25svh] items-center justify-between gap-6">
          <div>
            <p className="mb-3 text-[10px] text-[#8A7045] sm:text-xs">
              Selected by Vistelya
            </p>
            <h2
              id="residences-title"
              className="text-[clamp(1.5rem,3.5vw,3.75rem)] leading-tight font-normal text-[#1C1C1A]"
            >
              Featured residences.
            </h2>
          </div>
          <Link
            href="/properties"
            className="group inline-flex shrink-0 items-center gap-2 bg-[#1C1C1A] px-4 py-3 text-[10px] font-medium text-white transition-colors duration-300 hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black sm:px-5 sm:text-xs"
          >
            View all{" "}
            <FiArrowUpRight
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </header>
        <div className="residences-cards relative h-[68svh] overflow-hidden">
          {residences.map((residence, index) => (
            <ResidenceCard
              key={residence.title}
              residence={residence}
              index={index}
              progress={progress}
              reducedMotion={!!reducedMotion}
            />
          ))}
        </div>
        <div className="flex h-[7svh] items-center justify-between gap-4 text-[9px] text-[#1C1C1A]/60 sm:text-[11px]">
          <span className="font">
            Distinctive homes. Thoughtfully selected.
          </span>
          <span aria-hidden="true">Vistelya / Collection</span>
        </div>
      </div>
    </section>
  );
}
