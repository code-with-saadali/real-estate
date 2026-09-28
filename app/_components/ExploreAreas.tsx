import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { areas } from "../_lib/collection";
import Reveal from "./Reveal";

export default function ExploreAreas() {
  return (
    <section
      className="w-full px-4 md:px-8 lg:px-16 py-20 md:py-28"
      aria-labelledby="explore-areas-title"
    >
      <div className="mb-12 flex flex-col justify-between gap-6 border-t border-black/10 pt-8 md:flex-row md:items-end">
        <div>
          <p className="mb-5 text-[10px] text-[#8A7045]">Beyond the doorstep</p>
          <h2
            id="explore-areas-title"
            className="text-[clamp(2.3rem,5vw,5rem)] leading-[1.1]"
          >
            A setting.
            <br />A state of mind.
          </h2>
        </div>
        <Link
          href="/areas"
          className="group flex w-fit items-center gap-4 border-b border-black/30 pb-3 text-xs"
        >
          Explore our areas
          <FiArrowUpRight
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        {areas.map((area, index) => (
          <Reveal
            key={area.slug}
            className={index === 0 ? "lg:row-span-2" : ""}
            delay={index * 0.08}
          >
            <Link
              href={`/areas/${area.slug}`}
              className="group relative block h-full"
            >
              <div
                className={`relative overflow-hidden bg-[#d7d5cf] ${index === 0 ? "h-[60svh] lg:h-full" : "h-[42svh]"}`}
              >
                <Image
                  src={`/images/vistelya/${area.image}.webp`}
                  alt={`${area.name} inspired residential setting`}
                  fill
                  sizes={
                    index === 0
                      ? "(max-width: 1023px) 90vw, 52vw"
                      : "(max-width: 1023px) 90vw, 40vw"
                  }
                  className="object-cover transition-transform duration-1000 group-hover:scale-105 motion-reduce:transform-none"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 bg-[#EFEFEF] px-5 py-5">
                  <div>
                    <p className="font mb-2 text-[10px] text-black/55">
                      {area.mood}
                    </p>
                    <h3 className="text-2xl">{area.name}</h3>
                  </div>
                  <FiArrowUpRight aria-hidden="true" className="text-xl" />
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
