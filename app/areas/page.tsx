import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro, ActionLink, SampleNote } from "../_components/PageElements";
import { areas, properties } from "../_lib/collection";
import Reveal from "../_components/Reveal";
export const metadata: Metadata = {
  title: "Areas",
  description:
    "Explore lake, garden, and mountain settings in the Vistelya collection.",
};
export default function AreasPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Explore the surroundings"
        title={
          <>
            Where life
            <br />
            finds its rhythm.
          </>
        }
        description="The view from your window is only the beginning. Explore three distinct settings, each with a character of its own."
      />
      <div className="w-full px-4 md:px-8 lg:px-16 pb-24">
        <SampleNote>
          Illustrative area collections with AI-created imagery.
        </SampleNote>
        <div className="mt-10 space-y-20">
          {areas.map((area, index) => (
            <Reveal key={area.slug}>
              <article className="grid items-center gap-9 lg:grid-cols-2 lg:gap-16">
                <div
                  className={`relative h-[50svh] min-h-80 ${index % 2 ? "lg:order-2" : ""}`}
                >
                  <Image
                    src={`/images/vistelya/${area.image}.webp`}
                    alt={`${area.name} inspired landscape and residence`}
                    fill
                    sizes="(max-width: 1023px) 90vw, 45vw"
                    className="object-cover"
                  />
                </div>
                <div className="max-w-lg">
                  <p className="mb-5 text-[10px] text-[#8A7045]">
                    0{index + 1} / {area.mood}
                  </p>
                  <h2 className="text-4xl md:text-6xl">{area.name}</h2>
                  <p className="font my-7 text-sm leading-[1.9] text-black/65">
                    {area.description}
                  </p>
                  <p className="font mb-7 text-xs text-black/50">
                    {
                      properties.filter((item) => item.area === area.slug)
                        .length
                    }{" "}
                    sample homes to explore
                  </p>
                  <ActionLink href={`/areas/${area.slug}`}>
                    Discover {area.name}
                  </ActionLink>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-24 flex flex-col justify-between gap-7 border-y border-black/15 py-10 md:flex-row md:items-center">
          <h2 className="text-3xl">Still finding your setting?</h2>
          <ActionLink href="/properties" light>
            Explore every home
          </ActionLink>
        </div>
      </div>
    </main>
  );
}
