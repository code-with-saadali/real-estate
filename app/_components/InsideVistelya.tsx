"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLenis } from "lenis/react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const spaces = [
  {
    title: "Light. Space. Stillness.",
    label: "The courtyard",
    image: "courtyard",
    alt: "Travertine courtyard with a sculptural tree and reflecting pool",
  },
  {
    title: "Made for everyday rituals.",
    label: "The gathering place",
    image: "kitchen",
    alt: "Natural stone kitchen island with walnut cabinetry and bronze fixtures",
  },
  {
    title: "An escape of your own.",
    label: "The private suite",
    image: "suite",
    alt: "Ivory bedroom suite with soft linen and views across an alpine lake",
  },
];

export default function InsideVistelya() {
  const lenis = useLenis();
  const section = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);
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
  const travel = useTransform(progress, [0.06, 0.92], [0, 1]);
  const x = useTransform(travel, [0, 1], [0, -distance]);

  useMotionValueEvent(travel, "change", (value) =>
    setActive(Math.round(value * (spaces.length - 1))),
  );

  useEffect(() => {
    if (!viewport.current || !track.current) return;
    const measure = () => {
      // A queued resize callback can run after navigation detaches the refs.
      const currentTrack = track.current;
      const currentViewport = viewport.current;
      if (!currentTrack || !currentViewport) return;
      setDistance(
        Math.max(0, currentTrack.scrollWidth - currentViewport.clientWidth),
      );
    };
    const observer = new ResizeObserver(measure);
    observer.observe(viewport.current);
    observer.observe(track.current);
    measure();
    return () => observer.disconnect();
  }, []);

  function goTo(index: number) {
    if (!section.current) return;
    const element = section.current;
    const start = element.getBoundingClientRect().top + window.scrollY;
    const length =
      element.offsetHeight -
      (element.firstElementChild?.clientHeight ?? window.innerHeight);
    const fraction = 0.06 + (index / (spaces.length - 1)) * 0.86;
    const target = start + length * fraction;
    if (lenis)
      lenis.scrollTo(target, { duration: 1.2, immediate: !!reducedMotion });
    else
      window.scrollTo({
        top: target,
        behavior: reducedMotion ? "auto" : "smooth",
      });
  }

  return (
    <section
      ref={section}
      className="h-[320svh] motion-reduce:h-auto relative bg-[#EFEFEF] text-[#1C1C1A]"
      aria-labelledby="inside-title"
    >
      <div className="motion-reduce:relative motion-reduce:h-auto sticky top-0 flex h-svh flex-col justify-center overflow-hidden py-[4svh] md:py-[5svh] lg:py-[7svh]">
        <div className="motion-reduce:block grid items-center gap-4 md:gap-6 lg:grid-cols-[30%_70%] lg:gap-0">
          <header className="motion-reduce:mb-10 px-4 md:px-8 lg:pr-10 lg:pl-16">
            <p className="mb-5 text-[10px] text-[#8A7045] md:text-xs">
              Inside Vistelya
            </p>
            <h2
              id="inside-title"
              className="text-[clamp(1.6rem,5svh,2rem)] lg:text-[clamp(2rem,3.6vw,4.5rem)] leading-[1.15] font-normal"
            >
              Beautiful
              <br className="hidden lg:block" /> in every
              <br className="hidden lg:block" /> detail.
            </h2>
            <p className="font mt-6 hidden max-w-57.5 text-xs leading-[1.9] text-[#1C1C1A]/65 lg:block">
              An invitation to look closer. Natural materials, considered
              spaces, and the quiet pleasure of coming home.
            </p>
            <div className="motion-reduce:hidden! mt-10 hidden items-center gap-3 lg:flex">
              <button
                type="button"
                onClick={() => goTo(active - 1)}
                disabled={active === 0}
                aria-label="Previous space"
                className="flex h-11 w-11 items-center justify-center border border-black/20 transition-colors hover:bg-[#1C1C1A] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-default disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-inherit"
              >
                <FiArrowLeft aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => goTo(active + 1)}
                disabled={active === spaces.length - 1}
                aria-label="Next space"
                className="flex h-11 w-11 items-center justify-center border border-black/20 transition-colors hover:bg-[#1C1C1A] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-default disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-inherit"
              >
                <FiArrowRight aria-hidden="true" />
              </button>
            </div>
          </header>

          <div
            ref={viewport}
            className="inside-viewport min-w-0 overflow-hidden pl-4 md:pl-8 lg:pl-0"
          >
            <motion.div
              ref={track}
              className="motion-reduce:grid motion-reduce:w-full motion-reduce:gap-10! motion-reduce:transform-none flex w-max gap-5 pr-4 md:gap-8 md:pr-8 lg:pr-16"
              style={reducedMotion ? undefined : { x }}
            >
              {spaces.map((space, index) => (
                <figure
                  key={space.image}
                  className="motion-reduce:w-full! w-[82vw] shrink-0 lg:w-[54vw]"
                >
                  <div className="relative h-[38svh] overflow-hidden bg-[#d7d5cf] lg:h-[65svh]">
                    <Image
                      src={`/images/vistelya/${space.image}.webp`}
                      alt={space.alt}
                      fill
                      sizes="(max-width: 1023px) 82vw, 54vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="pt-5">
                    <div className="mb-2 flex items-center justify-between text-[9px] text-[#1C1C1A]/55 md:text-[10px]">
                      <span>{space.label}</span>
                      <span>0{index + 1}</span>
                    </div>
                    <h3 className="text-lg font-normal md:text-2xl">
                      {space.title}
                    </h3>
                  </figcaption>
                </figure>
              ))}
            </motion.div>
          </div>
        </div>
        <div
          className="motion-reduce:hidden! mx-4 mt-4 md:mt-6 flex items-center gap-5 md:mx-8 lg:mx-16 lg:mt-10"
          aria-hidden="true"
        >
          <span className="text-[10px] tabular-nums">0{active + 1} / 03</span>
          <div className="h-px flex-1 overflow-hidden bg-black/10">
            <motion.div
              className="h-full origin-left bg-[#8A7045]"
              style={{ scaleX: travel }}
            />
          </div>
          <FiArrowRight className="text-sm text-[#8A7045]" />
        </div>
      </div>
    </section>
  );
}
