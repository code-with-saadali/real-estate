"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "framer-motion";

const photos = [
  {
    src: "/images/vistelya/courtyard.webp",
    title: "The Courtyard",
    alt: "Quiet travertine courtyard with a sculptural tree and reflecting water",
  },
  {
    src: "/images/vistelya/living.webp",
    title: "Living in Harmony",
    alt: "Elegant interior with warm natural materials",
  },
  {
    src: "/images/vistelya/dining.webp",
    title: "The Dining Room",
    alt: "Refined dining room with pale oak furniture and mountain views",
  },
  {
    src: "/images/vistelya/terrace.webp",
    title: "The Private Terrace",
    alt: "Private stone terrace overlooking a tranquil alpine lake",
  },
  {
    src: "/images/vistelya/garden.webp",
    title: "Surrounded by Nature",
    alt: "Modern residence framed by greenery",
  },
  {
    src: "/images/vistelya/kitchen.webp",
    title: "The Modern Kitchen",
    alt: "Refined residential kitchen with contemporary finishes",
  },
  {
    src: "/images/vistelya/estate.webp",
    title: "The Estate",
    alt: "Luxury home with inviting outdoor living spaces",
  },
  {
    src: "/images/vistelya/suite.webp",
    title: "The Private Suite",
    alt: "Calm ivory bedroom suite with natural linen and warm walnut details",
  },
];

// Ease the zoom without slowing down the horizontal movement.
const smoothEase = (value: number) => value * value * (3 - 2 * value);
const spacing = 46;
const distance = 180 + (photos.length - 1) * spacing;
const captionLead = 10;

function GalleryPhoto({
  photo,
  index,
  progress,
}: {
  photo: (typeof photos)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  // Every photo shares the same travel speed and keeps its place in the row.
  const position = useTransform(
    progress,
    (value) => value * distance - 90 - index * spacing,
  );
  const x = useTransform(position, (value) => `${value}vw`);
  const prominence = useTransform(position, (value) =>
    smoothEase(Math.max(0, 1 - Math.abs(value) / spacing)),
  );
  // Grow near the center, then gently settle to a slightly smaller size as it passes.
  const scale = useTransform(
    position,
    [-spacing, -8, 0, 10, spacing],
    [0.55, 1.32, 1.2, 1.2, 0.55],
    { ease: smoothEase },
  );
  const zIndex = useTransform(
    prominence,
    (value) => 10 + Math.round(value * 10),
  );

  return (
    <motion.figure
      className="w-[40vw] h-[22svh] md:w-[clamp(220px,36vw,620px)] md:h-[44svh] absolute top-1/2 left-1/2 z-10"
      style={{ x, zIndex }}
    >
      <div className="relative h-full w-full -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="relative h-full w-full overflow-hidden bg-[#d7d5cf] shadow-2xl"
          style={{ scale }}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 767px) 53vw, 48vw"
            className="object-cover"
          />
        </motion.div>
      </div>
      <figcaption className="sr-only">{photo.title}</figcaption>
    </motion.figure>
  );
}

function GalleryCaption({
  photo,
  index,
  progress,
}: {
  photo: (typeof photos)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const position = useTransform(
    progress,
    (value) => value * distance - 90 - index * spacing,
  );
  // Start the same flip slightly before the photo reaches the center.
  const range = [
    -captionLead,
    14 - captionLead,
    spacing - captionLead,
    spacing + 14 - captionLead,
  ];
  const opacity = useTransform(position, range, [0, 1, 1, 0], {
    ease: smoothEase,
  });
  const y = useTransform(position, range, [28, 0, 0, -28], {
    ease: smoothEase,
  });
  const rotateX = useTransform(position, range, [-65, 0, 0, 65], {
    ease: smoothEase,
  });

  return (
    <motion.div
      className="absolute inset-x-0 top-6 text-center text-white backface-hidden"
      style={{ opacity, y, rotateX }}
    >
      <p className="text-xl font-light tracking-wide md:text-3xl">
        {photo.title}
      </p>
    </motion.div>
  );
}

export default function DiagonalGallery({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const counter = useTransform(progress, (value) => {
    const position = value * distance - 90 + captionLead;
    const index = Math.min(
      photos.length - 1,
      Math.max(0, Math.floor(position / spacing)),
    );
    return `${String(index + 1).padStart(2, "0")} / ${String(photos.length).padStart(2, "0")}`;
  });
  const counterVisibility = useTransform(progress, (value) => {
    const position = value * distance - 90 + captionLead;
    return position >= 0 && position < photos.length * spacing + 14
      ? "visible"
      : "hidden";
  });
  const backdropOpacity = useTransform(
    progress,
    [0, 0.025, 0.975, 1],
    [0, 1, 1, 0],
    { ease: smoothEase },
  );

  return (
    <div
      className="motion-reduce:hidden pointer-events-none absolute inset-0 z-20 overflow-hidden"
      role="group"
      aria-label="Vistelya property collection"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-black/10 backdrop-blur-[6px]"
        style={{ opacity: backdropOpacity }}
      />
      {photos.map((photo, index) => (
        <GalleryPhoto
          key={photo.src}
          photo={photo}
          index={index}
          progress={progress}
        />
      ))}
      <div
        aria-hidden="true"
        className="absolute inset-x-4 top-[69%] z-30 h-24 perspective-[700px] [text-shadow:0_2px_12px_rgb(0_0_0/65%)] md:top-[83%]"
      >
        <motion.p
          className="absolute inset-x-0 top-0 text-center text-[10px] tabular-nums tracking-[0.3em] text-white/80 md:text-xs"
          style={{ visibility: counterVisibility }}
        >
          {counter}
        </motion.p>
        {photos.map((photo, index) => (
          <GalleryCaption
            key={photo.src}
            photo={photo}
            index={index}
            progress={progress}
          />
        ))}
      </div>
    </div>
  );
}
