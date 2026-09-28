import Image from "next/image";
import { notFound } from "next/navigation";
import { areas, properties } from "../../_lib/collection";
import {
  PageIntro,
  ActionLink,
  SampleNote,
} from "../../_components/PageElements";
import PropertyCard from "../../_components/PropertyCard";
export function generateStaticParams() {
  return areas.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title: areas.find((item) => item.slug === slug)?.name ?? "Area not found",
  };
}
export default async function AreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = areas.find((item) => item.slug === slug);
  if (!area) notFound();
  const homes = properties.filter((item) => item.area === slug);
  return (
    <main>
      <PageIntro
        eyebrow={area.mood}
        title={area.name}
        description={area.description}
      >
        <ActionLink href={`/properties?area=${slug}`}>
          Search this collection
        </ActionLink>
      </PageIntro>
      <div className="site-shell pb-24">
        <div className="relative h-[60svh] min-h-80">
          <Image
            src={`/images/vistelya/${area.image}.webp`}
            alt={`${area.name} residential concept`}
            fill
            preload
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="my-12 grid gap-7 border-b border-black/15 pb-12 md:grid-cols-2">
          <h2 className="text-3xl sm:text-5xl">
            A place to
            <br />
            make your own.
          </h2>
          <div>
            <p className="font mb-5 text-sm leading-[1.9] text-black/65">
              Start with the setting, then discover the spaces. This curated
              concept collection brings together homes inspired by {area.name},
              with a focus on light, materials, and a connection to the
              outdoors.
            </p>
            <SampleNote />
          </div>
        </div>
        <div className="grid gap-10 md:grid-cols-2">
          {homes.map((property) => (
            <PropertyCard key={property.slug} property={property} />
          ))}
        </div>
      </div>
    </main>
  );
}
