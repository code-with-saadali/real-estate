"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

const questions = [
  {
    title: "Can I explore homes to buy or rent?",
    answer: "Yes. Open the Properties page and choose For sale or For rent. You can narrow the collection by area and bedrooms, then sort homes to suit your search.",
  },
  {
    title: "Where can I find my saved homes?",
    answer: "Tap the heart on any property to save it. Open Saved homes in the navigation or property filters to see your favourites. They stay in this browser, so you can return to them later.",
  },
  {
    title: "How do I enquire about a home or a viewing?",
    answer: "Choose Enquire about this home on its property page, then add your questions and preferred viewing times to the message. This preview prepares a downloadable draft; it does not send an enquiry or confirm a viewing.",
  },
  {
    title: "Where do I begin?",
    answer:
      "Start with the way you want to live. Think about your daily routine, the setting you love, and the spaces you use most. Let those priorities guide your search.",
  },
  {
    title: "What makes a home feel right?",
    answer:
      "Look beyond the first impression. Notice the light throughout the day, how the rooms connect, the privacy of outdoor spaces, and how comfortably your everyday life could fit.",
  },
  {
    title: "What should I notice on a viewing?",
    answer:
      "Take your time with the details: materials, storage, natural light, sound, and the surrounding area. Write down what matters to you so you can compare your impressions afterwards.",
  },
  {
    title: "How do I narrow my favourites?",
    answer:
      "Separate the essentials from the nice-to-haves. Revisit the homes that meet your priorities, and picture an ordinary day in each one—not just a perfect weekend.",
  },
];

export default function YourNextChapter() {
  const section = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(0);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 30, mass: 0.5 });
  const imageY = useTransform(smoothProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section
      ref={section}
      className="bg-[#EFEFEF] px-5 py-20 text-[#1C1C1A] [overflow-anchor:none] sm:px-8 sm:py-28 lg:px-16"
      aria-labelledby="next-chapter-title"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-12 flex items-center justify-between border-t border-black/10 pt-5 text-[10px] text-[#1C1C1A]/60 sm:mb-16 sm:text-xs">
          <span>A little clarity</span>
          <span>Your next chapter</span>
        </div>
        <div className="grid items-start gap-12 lg:items-stretch lg:grid-cols-[0.9fr_1fr] lg:gap-20 xl:gap-28">
          <div className="relative min-w-0">
            <div className="relative aspect-5/4 overflow-hidden bg-[#d7d5cf] lg:absolute lg:inset-0 lg:aspect-auto">
              <motion.div
                className="absolute inset-x-0 inset-y-[-7%]"
                style={reducedMotion ? undefined : { y: imageY }}
              >
                <Image
                  src="/images/vistelya/dining.webp"
                  alt="Pale oak dining table and natural stone interior overlooking an alpine lake"
                  fill
                  sizes="(max-width: 1023px) 92vw, 43vw"
                  className="object-cover"
                />
              </motion.div>
            </div>
            <p className="font mt-4 text-[10px] text-[#1C1C1A]/60 lg:absolute lg:inset-x-0 lg:top-full">
              A new perspective begins at home.
            </p>
          </div>
          <div className="lg:pt-4">
            <h2
              id="next-chapter-title"
              className="text-[clamp(2rem,3.8vw,4.5rem)] leading-[1.15] font-normal"
            >
              Every move
              <br />
              starts with
              <br />a question.
            </h2>
            <div className="mt-10 border-t border-black/15 sm:mt-12">
              {questions.map((question, index) => {
                const expanded = open === index;
                return (
                  <div
                    key={question.title}
                    className="border-b border-black/15"
                  >
                    <h3>
                      <button
                        id={`chapter-question-${index}`}
                        type="button"
                        aria-expanded={expanded}
                        aria-controls={`chapter-answer-${index}`}
                        onClick={() => setOpen(expanded ? null : index)}
                        className="group flex w-full cursor-pointer items-center gap-4 py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8A7045]"
                      >
                        <span className="text-[9px] text-[#8A7045]">
                          0{index + 1}
                        </span>
                        <span className="flex-1 text-sm leading-relaxed sm:text-base">
                          {question.title}
                        </span>
                        <span aria-hidden="true" className="relative flex h-5 w-5 shrink-0 items-center justify-center text-[#8A7045]">
                          <span className="absolute h-px w-3 bg-current" />
                          <span className={`absolute h-px w-3 bg-current transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${expanded ? "rotate-0" : "rotate-90"}`} />
                        </span>
                      </button>
                    </h3>
                    <div
                      id={`chapter-answer-${index}`}
                      role="region"
                      aria-labelledby={`chapter-question-${index}`}
                      aria-hidden={!expanded}
                      inert={!expanded}
                      className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                    >
                          <div className="min-h-0 overflow-hidden">
                            <p className="font max-w-lg pb-6 pl-8 pr-5 text-xs leading-[1.9] text-[#1C1C1A]/70">
                              {question.answer}
                            </p>
                          </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <a
              href="#featured-residences"
              className="group mt-9 inline-flex items-center gap-2 bg-[#1C1C1A] px-5 py-3 text-xs font-medium text-white transition-colors duration-300 hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
            >
              Explore the collection
              <FiArrowUpRight
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
