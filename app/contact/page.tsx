import type { Metadata } from "next";
import Image from "next/image";

import EnquiryForm from "../_components/EnquiryForm";
import { properties, advisors } from "../_lib/collection";
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Bring your ideas together and begin your next chapter with Vistelya.",
};
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{
    property?: string;
    advisor?: string;
    intent?: string;
  }>;
}) {
  const query = await searchParams;
  const property = properties.find((item) => item.slug === query.property);
  const advisor = advisors.find((item) => item.slug === query.advisor);
  const intent = ["buy", "rent", "list", "general"].includes(query.intent ?? "")
    ? query.intent
    : property?.type === "rent"
      ? "rent"
      : "buy";
  return (
    <main>
      <header className="site-shell pb-6 pt-28 sm:pb-8 sm:pt-32">
        <h1 className="text-3xl leading-tight sm:text-4xl">
          Let’s find your next home.
        </h1>
        <p className="font mt-3 max-w-xl text-xs leading-relaxed text-black/60 sm:text-sm">
          Tell us what you’re looking for and prepare your enquiry.
        </p>
      </header>
      <div className="site-shell grid items-start gap-12 pb-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <aside>
          <div className="relative aspect-4/5 max-h-150">
            <Image
              src="/images/vistelya/living.webp"
              alt="Inviting ivory living room with a wide lake view"
              fill
              sizes="(max-width: 1023px) 90vw, 35vw"
              className="object-cover"
            />
          </div>
          <h2 className="mt-8 text-3xl">A considered beginning.</h2>
          <p className="font mt-5 max-w-md text-xs leading-[1.9] text-black/65">
            There is no need to have every detail decided. Start with what
            matters most: the location, the spaces, and the way you want to
            live.
          </p>
          {advisor && (
            <p className="font mt-5 text-xs text-[#8A7045]">
              Enquiry draft for {advisor.name} — sample advisor.
            </p>
          )}
        </aside>
        <EnquiryForm
          propertySlug={property?.slug}
          advisorSlug={advisor?.slug}
          intent={intent}
        />
      </div>
    </main>
  );
}
