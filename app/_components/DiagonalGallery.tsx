"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "framer-motion";

const photos = [
  {
    src: "/images/vistelya/courtyard.webp",
    alt: "Quiet travertine courtyard with a sculptural tree and reflecting water",
  },
  {
    src: "/images/vistelya/living.webp",
    alt: "Elegant interior with warm natural materials",
  },
  {
    src: "/images/vistelya/dining.webp",
    alt: "Refined dining room with pale oak furniture and mountain views",
  },
  {
    src: "/images/vistelya/terrace.webp",
    alt: "Private stone terrace overlooking a tranquil alpine lake",
  },
  {
    src: "/images/vistelya/garden.webp",
    alt: "Modern residence framed by greenery",
  },
  {
    src: "/images/vistelya/kitchen.webp",
    alt: "Refined residential kitchen with contemporary finishes",
  },
  {
    src: "/images/vistelya/estate.webp",
    alt: "Luxury home with inviting outdoor living spaces",
  },
  {
    src: "/images/vistelya/suite.webp",
    alt: "Calm ivory bedroom suite with natural linen and warm walnut details",
  },
];

function GalleryPhoto({
  photo,
  index,
  progress,
}: {
  photo: (typeof photos)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const timeline = 0.52 + (photos.length - 1) * 0.12;
  const start = (index * 0.12) / timeline;
  const end = start + 0.52 / timeline;
  const x = useTransform(progress, [start, end], ["-100vw", "100vw"]);
  const y = useTransform(progress, [start, end], ["-100svh", "100svh"]);

  return (
    <motion.figure
      className="w-[68vw] h-[34svh] md:w-[clamp(220px,36vw,620px)] md:h-[44svh] absolute top-1/2 left-1/2"
      style={{ x, y }}
    >
      <div className="relative h-full w-full -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-[#d7d5cf] shadow-2xl">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(max-width: 767px) 68vw, 36vw"
          className="object-cover"
        />
      </div>
    </motion.figure>
  );
}

export default function DiagonalGallery({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  return (
    <div
      className="motion-reduce:hidden pointer-events-none absolute inset-0 z-20 overflow-hidden"
      role="group"
      aria-label="Vistelya property collection"
    >
      {photos.map((photo, index) => (
        <GalleryPhoto
          key={photo.src}
          photo={photo}
          index={index}
          progress={progress}
        />
      ))}
    </div>
  );
}
