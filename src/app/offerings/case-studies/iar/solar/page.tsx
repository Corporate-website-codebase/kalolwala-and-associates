import Footers from "@/components/Footers";
import DimensionsSection from "../../../../../components/caseStudies/ir/solar/DimensionsSection";
import HeroSection from "../../../../../components/caseStudies/ir/solar/HeroSection";
import NarrativeSection from "../../../../../components/caseStudies/ir/solar/NarrativeSection";
import StorySection from "../../../../../components/caseStudies/ir/solar/StorySection";
import { Metadata } from "next";
import { getMetadata } from "@/data/metadata";
// export const metadata: Metadata = {
//   title: "Integrated Annual Report Case Study | K&A Case Study",
//   description:
//     "How K&A shaped the integrated annual report: the narrative, structure and design choices behind it. Read the case study.",
// };
export const metadata = getMetadata("solar");

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