import FavouriteButton from "./FavouriteButton";
import Link from "next/link";
import Image from "next/image";
import { FiArrowUpRight, FiMaximize2 } from "react-icons/fi";
import { LuBedDouble, LuBath } from "react-icons/lu";
import { priceLabel, typeLabels, type Property } from "../_lib/collection";

export default function PropertyCard({ property }: { property: Property }) {
  return <article className="relative"><div className="absolute right-4 top-4 z-10"><FavouriteButton slug={property.slug} title={property.title} compact /></div><Link href={`/properties/${property.slug}`} className="group block"><div className="relative aspect-[4/3] overflow-hidden bg-[#d7d5cf]"><Image src={`/images/vistelya/${property.image}.webp`} alt={property.title} fill sizes="(max-width: 767px) 92vw, (max-width: 1279px) 45vw, 30vw" className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none" /><span className="absolute left-4 top-4 bg-[#EFEFEF] px-3 py-2 text-[9px]">{typeLabels[property.type]}</span></div><div className="mt-5 flex justify-between gap-4"><div><p className="font mb-2 text-[10px] text-black/55">{property.location}</p><h2 className="text-xl md:text-2xl">{property.title}</h2></div><FiArrowUpRight aria-hidden="true" className="mt-6 shrink-0 text-xl transition-transform group-hover:translate-x-1" /></div><p className="font mt-3 text-sm">{priceLabel(property)}</p><div className="font mt-5 flex flex-wrap gap-5 border-t border-black/10 pt-4 text-[11px] text-black/60"><span className="flex items-center gap-2"><LuBedDouble aria-hidden="true" />{property.bedrooms} beds</span><span className="flex items-center gap-2"><LuBath aria-hidden="true" />{property.bathrooms} baths</span><span className="flex items-center gap-2"><FiMaximize2 aria-hidden="true" />{property.size} m²</span></div></Link></article>;
}
