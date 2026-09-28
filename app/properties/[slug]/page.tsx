import { RecordPropertyView } from "../../_components/RecentlyViewed";
import PropertyGallery from "../../_components/PropertyGallery";
import FavouriteButton from "../../_components/FavouriteButton";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiCheck } from "react-icons/fi";
import { properties, priceLabel, typeLabels } from "../../_lib/collection";
import { ActionLink, SampleNote } from "../../_components/PageElements";
import PropertyCard from "../../_components/PropertyCard";
export function generateStaticParams() {
  return properties.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title:
      properties.find((item) => item.slug === slug)?.title ??
      "Property not found",
  };
}
export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = properties.find((item) => item.slug === slug);
  if (!property) notFound();
  return (
    <main className="w-full px-4 md:px-8 lg:px-16 pb-24 pt-32 md:pt-40">
      <RecordPropertyView slug={property.slug} />
      <Link
        href="/properties"
        className="mb-10 inline-flex items-center gap-3 text-xs"
      >
        <FiArrowLeft aria-hidden="true" />
        Back to the collection
      </Link>
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="font mb-4 text-xs text-black/55">
            {property.location} / {typeLabels[property.type]}
          </p>
          <h1 className="text-[clamp(2.5rem,5vw,5.5rem)] leading-tight">
            {property.title}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <p className="font text-lg">{priceLabel(property)}</p>
          <span className="hidden md:block">
            <FavouriteButton slug={property.slug} title={property.title} />
          </span>
        </div>
      </div>
      <PropertyGallery
        title={property.title}
        images={[property.image, ...property.gallery]}
      />
      <div className="mt-5">
        <SampleNote />
      </div>
      <div className="my-14 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="font mb-8 grid grid-cols-3 border-y border-black/15 py-6 text-center">
            {[
              [property.bedrooms, "Bedrooms"],
              [property.bathrooms, "Bathrooms"],
              [property.size, "Square metres"],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="text-2xl">{value}</p>
                <p className="mt-2 text-[10px] text-black/55">{label}</p>
              </div>
            ))}
          </div>
          <h2 className="mb-5 text-3xl">A closer look.</h2>
          <p className="font max-w-2xl text-sm leading-[1.9] text-black/65">
            {property.description}
          </p>
          <ul className="font mt-8 grid gap-4 text-xs md:grid-cols-2">
            {property.features.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <FiCheck aria-hidden="true" className="text-[#8A7045]" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <aside className="h-fit border border-black/15 p-7 lg:p-10">
          <p className="mb-4 text-[10px] text-[#8A7045]">Your next chapter</p>
          <h2 className="text-3xl leading-tight">Picture yourself here.</h2>
          <p className="font my-6 text-xs leading-relaxed text-black/60">
            Create an enquiry draft with this property attached. This is an
            illustrative listing, not a live offering.
          </p>
          <ActionLink href={`/contact?property=${property.slug}`}>
            Enquire about this home
          </ActionLink>
        </aside>
      </div>
      <div className="mt-24">
        <h2 className="mb-10 text-4xl">A little more inspiration.</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {properties
            .filter((item) => item.slug !== slug && item.area === property.area)
            .slice(0, 2)
            .map((item) => (
              <PropertyCard key={item.slug} property={item} />
            ))}
        </div>
      </div>
      <div
        aria-label="Property actions"
        className="font fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-black/10 bg-[#fafaf7]/95 px-4 md:px-8 lg:px-16 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-lg md:hidden"
      >
        <FavouriteButton slug={property.slug} title={property.title} />
        <Link
          href={`/contact?property=${property.slug}`}
          className="flex min-h-11 flex-1 items-center justify-center rounded-full bg-[#1c1c1a] px-5 text-xs text-white"
        >
          Enquire now
        </Link>
      </div>
    </main>
  );
}
