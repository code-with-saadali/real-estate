"use client";

import { useEffect, useId } from "react";
import { properties } from "../_lib/collection";
import { recordViewed, useRecentlyViewed } from "../_lib/recently-viewed";
import PropertyCard from "./PropertyCard";
import Reveal from "./Reveal";

export function RecordPropertyView({ slug }: { slug: string }) {
  useEffect(() => { recordViewed(slug); }, [slug]);
  return null;
}

export default function RecentlyViewed({ exclude }: { exclude?: string }) {
  const { viewed, clear } = useRecentlyViewed();
  const titleId = useId();
  const homes = viewed.filter((slug) => slug !== exclude).flatMap((slug) => {
    const property = properties.find((item) => item.slug === slug);
    return property ? [property] : [];
  }).slice(0, 3);
  if (!homes.length) return null;
  return <section className="site-shell py-16 sm:py-24" aria-labelledby={titleId}>
    <Reveal><div className="mb-10 flex flex-wrap items-end justify-between gap-5 border-t border-black/10 pt-8">
      <div><p className="mb-4 text-[10px] text-[#8a7045]">Worth another look</p><h2 id={titleId} className="text-[clamp(2rem,4vw,4rem)] leading-tight">Recently viewed.</h2><p className="font mt-4 text-xs text-black/60">Pick up where you left off.</p></div>
      <button type="button" onClick={clear} className="font min-h-11 border-b border-black/25 text-xs text-black/60 transition-colors hover:text-black">Clear viewing history</button>
    </div></Reveal>
    <div className="grid gap-x-7 gap-y-10 md:grid-cols-2 xl:grid-cols-3">{homes.map((property, index) => <Reveal key={property.slug} delay={index * 0.08}><PropertyCard property={property} /></Reveal>)}</div>
  </section>;
}
