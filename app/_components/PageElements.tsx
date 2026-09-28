import type { ReactNode } from "react";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

export function PageIntro({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  children?: ReactNode;
}) {
  return (
    <header className="site-shell pb-12 pt-36 sm:pb-16 sm:pt-44">
      <div className="mb-10 flex items-center justify-between border-t border-black/10 pt-5 text-[10px] text-black/55">
        <span>{eyebrow}</span>
        <Link href="/" className="hover:text-black">
          Vistelya / Home
        </Link>
      </div>
      <h1 className="max-w-5xl text-[clamp(2rem,5vw,6rem)] leading-none font-normal">
        {title}
      </h1>
      <div className="mt-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <p className="font max-w-xl text-sm leading-[1.9] text-black/60">
          {description}
        </p>
        {children}
      </div>
    </header>
  );
}

export function ActionLink({
  href,
  children,
  light = false,
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex w-fit items-center justify-center gap-3 px-5 py-3.5 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${light ? "border border-black/20 hover:bg-black/5" : "bg-[#1C1C1A] text-white hover:bg-black"}`}
    >
      {children}
      <FiArrowUpRight
        aria-hidden="true"
        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </Link>
  );
}

export function SampleNote({ children }: { children?: ReactNode }) {
  return (
    <p className="font text-[11px] leading-relaxed text-black/55">
      {children ??
        "Illustrative collection — sample properties, prices, and AI-created imagery. Not live listings."}
    </p>
  );
}
