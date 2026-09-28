"use client";

import { FiHeart } from "react-icons/fi";
import { useFavourites } from "../_lib/favourites";

export default function FavouriteButton({ slug, title, compact = false }: { slug: string; title: string; compact?: boolean }) {
  const { saved, toggle } = useFavourites();
  const active = saved.includes(slug);
  return <button type="button" aria-label={`${active ? "Unsave" : "Save"} ${title}`} aria-pressed={active} onClick={() => toggle(slug)} className={`font inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-black/10 bg-[#fafaf7] text-xs text-[#1c1c1a] shadow-sm transition-colors hover:bg-[#e9e7df] ${compact ? "w-11" : "px-4"}`}><FiHeart aria-hidden="true" className={`text-lg ${active ? "fill-[#8a7045] text-[#8a7045]" : ""}`} />{!compact && (active ? "Saved" : "Save home")}</button>;
}
