import type { Metadata } from "next";
import ChallengeImpact from "@/components/caseStudies/ir/granules/ChallengeImpact";
import Closing from "@/components/caseStudies/ir/granules/Closing";
import HeroSection from "@/components/caseStudies/ir/granules/HeroSection";
import OutcomeSection from "@/components/caseStudies/ir/granules/OutcomeSection";
import Footers from "@/components/Footers";
import { getMetadata } from "@/data/metadata";

// export const metadata: Metadata = {
//   title: "Granules India Integrated Annual Report | K&A Case Study",
//   description:
//     "How K&A shaped the integrated annual report for Granules India: the narrative, structure and design choices behind it. Read the case study.",
// };
export const metadata = getMetadata("granules");

export default function GulfOilCaseStudyPage() {
  return (
    <main className="w-full overflow-x-hidden">
      <HeroSection />
      <ChallengeImpact />
      <OutcomeSection />
      <Closing />
      <div className="marginal">
        <Footers nextPageName="About Us" nextPageLink="/about" />
      </div>
    </main>
  );
}