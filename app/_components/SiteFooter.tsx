import Link from "next/link";
import BrandLogo from "./BrandLogo";
import { FiArrowUpRight } from "react-icons/fi";

const linkGroups = [
  {
    title: "Find your place",
    links: [
      ["Homes for sale", "/properties?type=sale"],
      ["Homes for rent", "/properties?type=rent"],
      ["New developments", "/properties?type=new"],
      ["Luxury collection", "/properties?type=luxury"],
    ],
  },
  {
    title: "Discover Vistelya",
    links: [
      ["Our story", "/about"],
      ["Explore areas", "/areas"],
      ["Meet our agents", "/agents"],
      ["Get in touch", "/contact"],
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[#8a7045]/20 bg-[#e7e5dc] text-[#1c1c1a]">
      <div className="site-shell">
        <div className="flex flex-col items-start justify-between gap-7 border-b border-black/15 py-10 sm:py-14 lg:flex-row lg:items-end">
          <div>
            <p className="font mb-4 text-[10px] font-medium uppercase tracking-[0.22em] text-[#716044]">
              A new perspective awaits
            </p>
            <h2 className="max-w-2xl text-3xl leading-[1.2] sm:text-4xl lg:text-5xl">
              A place to call <span className="text-[#82704f]">yours.</span>
            </h2>
          </div>
          <Link
            href="/properties"
            className="font group inline-flex min-h-12 items-center justify-between gap-8 rounded-full bg-[#1c1c1a] px-6 py-4 text-xs text-[#f4f2eb] transition-colors duration-300 ease-out motion-reduce:transition-none hover:bg-[#45483c]"
          >
            Explore the collection
            <FiArrowUpRight aria-hidden="true" className="text-lg transition-transform duration-300 ease-out motion-reduce:transition-none group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none" />
          </Link>
        </div>

        <div className="grid gap-10 py-10 sm:py-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div>
            <Link href="/" aria-label="Vistelya home" className="inline-block transition-opacity duration-300 ease-out hover:opacity-70 motion-reduce:transition-none">
              <BrandLogo />
            </Link>
            <p className="font mt-5 max-w-xs text-xs leading-[1.9] text-black/60">
              Considered homes. Exceptional surroundings.
              A different perspective on living, starting with the places that matter to you.
            </p>
            <Link href="/contact" className="font group mt-6 inline-flex min-h-11 items-center gap-5 border-b border-[#8a7045]/40 text-xs transition-colors duration-300 ease-out motion-reduce:transition-none hover:text-[#716044] hover:border-[#716044]">
              Let’s talk about your next move
              <FiArrowUpRight aria-hidden="true" className="text-base transition-transform duration-300 ease-out motion-reduce:transition-none group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none" />
            </Link>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-5 gap-y-8 sm:gap-x-10">
            {linkGroups.map((group) => (
              <div key={group.title}>
                <h3 className="font mb-4 text-[10px] font-semibold uppercase leading-relaxed tracking-[0.14em] text-[#716044]">
                  {group.title}
                </h3>
                <ul className="font space-y-1">
                  {group.links.map(([label, href]) => (
                    <li key={href}>
                      <Link href={href} className="group inline-flex min-h-11 items-center text-xs leading-relaxed text-black/65 transition-colors duration-300 ease-out hover:text-[#716044] motion-reduce:transition-none">
                        <span className="relative py-1 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-out group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100 motion-reduce:after:transition-none">{label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="font flex flex-col justify-between gap-3 border-t border-black/15 py-6 text-[10px] leading-relaxed text-black/55 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Vistelya. All rights reserved.</span>
          <span className="inline-flex items-center gap-2.5">
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#8a7045]" />
            A thoughtfully designed beginning.
          </span>
        </div>
      </div>
    </footer>
  );
}
