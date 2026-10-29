import Footers from "@/components/Footers";
import DimensionsSection from "../../../../../components/caseStudies/ir/solar/DimensionsSection";
import HeroSection from "../../../../../components/caseStudies/ir/solar/HeroSection";
import NarrativeSection from "../../../../../components/caseStudies/ir/solar/NarrativeSection";
import StorySection from "../../../../../components/caseStudies/ir/solar/StorySection";

export default function Page() {
  return (
    <main className="w-full overflow-x-hidden">
      <HeroSection />
      <NarrativeSection />
      <DimensionsSection />
      <StorySection />
       <div className="marginal">
                    <Footers nextPageName="About Us" nextPageLink="/about" />
                </div>
    </main>
  );
}