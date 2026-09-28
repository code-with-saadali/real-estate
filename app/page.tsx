import React from "react";
import Hero from "./_components/Hero";
import FeaturedResidences from "./_components/FeaturedResidences";
import VistelyaApproach from "./_components/VistelyaApproach";
import InsideVistelya from "./_components/InsideVistelya";
import YourNextChapter from "./_components/YourNextChapter";
import ComeHome from "./_components/ComeHome";
import ExploreAreas from "./_components/ExploreAreas";
import RecentlyViewed from "./_components/RecentlyViewed";

export default function Home() {
  return (
    <div id="home" className="bg-[#EFEFEF] min-h-screen">
      <main>
        <Hero />
        <FeaturedResidences />
        <VistelyaApproach />
        <InsideVistelya />
        <ExploreAreas />
        <YourNextChapter />
        <RecentlyViewed />
        <ComeHome />
      </main>
    </div>
  );
}
