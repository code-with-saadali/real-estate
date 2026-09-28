import type { Metadata } from "next";
import Image from "next/image";
import { ActionLink } from "../_components/PageElements";
import Reveal from "../_components/Reveal";
export const metadata: Metadata = {
  title: "About",
  description:
    "The Vistelya perspective: considered spaces, beautiful surroundings, and a sense of belonging.",
};
export default function AboutPage() {
  return (
    <main>
      <header className="site-shell pb-6 pt-28 sm:pb-8 sm:pt-32">
        <h1 className="text-3xl leading-tight sm:text-4xl">
          A thoughtful approach to home.
        </h1>
        <p className="font mt-3 max-w-xl text-xs leading-relaxed text-black/60 sm:text-sm">
          Beautiful spaces, natural surroundings, and a place to feel at home.
        </p>
      </header>
      <div className="site-shell pb-24">
        <div className="relative h-[62svh] min-h-80">
          <Image
            src="/images/vistelya/courtyard.webp"
            alt="Quiet stone courtyard with greenery and reflecting water"
            fill
            preload
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <Reveal className="grid gap-10 py-20 lg:grid-cols-2 lg:gap-24">
          <h2 className="text-4xl leading-tight sm:text-6xl">
            A little less noise.
            <br />A little more meaning.
          </h2>
          <div className="font space-y-5 text-sm leading-[1.9] text-black/65">
            <p>
              Vistelya is a perspective on home: thoughtful architecture, a
              connection to the landscape, and spaces that feel personal.
            </p>
            <p>
              Our collection is shaped around the experience of living. A garden
              to retreat to, a room filled with morning light, or a terrace that
              makes you pause. These are the details worth looking for.
            </p>
          </div>
        </Reveal>
        <div className="grid gap-10 border-y border-black/15 py-12 md:grid-cols-3">
          {[
            [
              "01",
              "A sense of place",
              "The surroundings are part of the home. We look for a natural conversation between architecture and landscape.",
            ],
            [
              "02",
              "Considered details",
              "Honest materials, useful spaces, and beautiful proportions. Design that feels as good as it looks.",
            ],
            [
              "03",
              "A personal perspective",
              "Every search is different. What matters is finding a setting that speaks to your own way of living.",
            ],
          ].map(([number, title, description]) => (
            <div key={number}>
              <p className="text-xs text-[#8A7045]">{number}</p>
              <h3 className="my-5 text-2xl">{title}</h3>
              <p className="font text-xs leading-[1.9] text-black/65">
                {description}
              </p>
            </div>
          ))}
        </div>
        <Reveal className="mt-20 grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-4/3">
            <Image
              src="/images/vistelya/living.webp"
              alt="Ivory living room with natural materials and an open lake view"
              fill
              sizes="(max-width: 1023px) 90vw, 45vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="mb-5 text-[10px] text-[#8A7045]">Your next chapter</p>
            <h2 className="text-4xl leading-tight sm:text-5xl">
              Begin with
              <br />a different view.
            </h2>
            <p className="font my-7 max-w-md text-sm leading-[1.9] text-black/65">
              Explore the collection and discover the spaces that feel like a
              natural next step.
            </p>
            <ActionLink href="/properties">Find your inspiration</ActionLink>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
