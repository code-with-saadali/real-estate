import type { Metadata } from "next";
import Image from "next/image";
import { FiMapPin, FiMessageCircle } from "react-icons/fi";
import { advisors } from "../_lib/collection";
import { ActionLink, SampleNote } from "../_components/PageElements";
import Reveal from "../_components/Reveal";
export const metadata: Metadata = {
  title: "Our advisors",
  description: "Meet the perspectives behind the Vistelya collection.",
};
export default function AgentsPage() {
  return (
    <main>
      <header className="site-shell pb-6 pt-28 sm:pb-8 sm:pt-32">
        <h1 className="text-3xl leading-tight sm:text-4xl">
          Meet our advisors.
        </h1>
        <p className="font mt-3 max-w-xl text-xs leading-relaxed text-black/60 sm:text-sm">
          Explore the advisor profiles created for the Vistelya collection.
        </p>
      </header>
      <section className="site-shell pb-24" aria-label="Advisor profiles">
        <SampleNote>
          Illustrative team profiles. Names and roles are placeholders, not
          active agents.
        </SampleNote>
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {advisors.map((advisor, index) => (
            <Reveal key={advisor.slug} delay={index * 0.08}>
              <article>
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={`/images/vistelya/${advisor.image}.webp`}
                    alt={`${advisor.area} collection inspiration`}
                    fill
                    sizes="(max-width: 1023px) 90vw, 30vw"
                    className="object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 flex h-24 w-24 items-center justify-center bg-[#EFEFEF] text-3xl"
                  >
                    {advisor.initials}
                  </div>
                </div>
                <p className="mt-6 text-[10px] text-[#8A7045]">
                  {advisor.role}
                </p>
                <h2 className="mt-3 text-3xl">{advisor.name}</h2>
                <p className="font my-5 min-h-22.5 text-xs leading-[1.9] text-black/65">
                  {advisor.description}
                </p>
                <div className="font mb-7 space-y-3 border-t border-black/15 pt-5 text-xs text-black/60">
                  <p className="flex items-center gap-3">
                    <FiMapPin aria-hidden="true" />
                    {advisor.area}
                  </p>
                  <p className="flex items-center gap-3">
                    <FiMessageCircle aria-hidden="true" />
                    {advisor.languages}
                  </p>
                </div>
                <ActionLink href={`/contact?advisor=${advisor.slug}`}>
                  Start a conversation
                </ActionLink>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-24 grid gap-8 border-t border-black/15 pt-12 md:grid-cols-2">
          <h2 className="text-4xl leading-tight">
            Your priorities.
            <br />
            Our starting point.
          </h2>
          <div>
            <p className="font mb-7 text-sm leading-[1.9] text-black/65">
              Tell us what home means to you: a setting, a feeling, or a few
              essential details. Prepare an enquiry and bring your ideas
              together in one place.
            </p>
            <ActionLink href="/contact" light>
              Create an enquiry
            </ActionLink>
          </div>
        </div>
      </section>
    </main>
  );
}
