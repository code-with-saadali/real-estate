import type { Metadata } from "next";
import { Suspense } from "react";
import PropertyExplorer from "../_components/PropertyExplorer";
import RecentlyViewed from "../_components/RecentlyViewed";

export const metadata: Metadata = {
  title: "Properties",
  description: "Explore the Vistelya collection by setting, space, and way of living.",
};

export default function PropertiesPage() {
  return (
    <main>
      <header className="site-shell pb-6 pt-28 sm:pb-8 sm:pt-32">
        <h1 className="text-3xl leading-tight sm:text-4xl">Find your next home.</h1>
        <p className="font mt-3 max-w-xl text-xs leading-relaxed text-black/60 sm:text-sm">
          Explore homes by location, space, and the way you want to live.
        </p>
      </header>
      <section className="site-shell pb-16" aria-label="Property search">
        <Suspense fallback={<p className="font py-12" role="status">Preparing the collection...</p>}>
          <PropertyExplorer />
        </Suspense>
        <p className="font mt-10 border-t border-black/10 pt-4 text-[11px] leading-relaxed text-black/50">
          Collection preview: sample homes, prices, and AI-created imagery. Not live listings.
        </p>
      </section>
      <RecentlyViewed />
    </main>
  );
}
