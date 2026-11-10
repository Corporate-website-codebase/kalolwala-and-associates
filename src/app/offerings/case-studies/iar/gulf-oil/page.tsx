import ChallengeImpact from "@/components/caseStudies/ir/gulf-oil/ChallengeImpact";
import Closing from "@/components/caseStudies/ir/gulf-oil/Closing";
import HeroSection from "@/components/caseStudies/ir/gulf-oil/HeroSection";
import OutcomeSection from "@/components/caseStudies/ir/gulf-oil/OutcomeSection";
import Footers from "@/components/Footers";
import { getMetadata } from "@/data/metadata";
import { Metadata } from "next";
// export const metadata: Metadata = {
  // title: "Gulf Oil Integrated Annual Report | K&A Case Study",
  // description:
  //   "How K&A shaped the integrated annual report for Gulf Oil: the narrative, structure and design choices behind it. Read the case study.",
// };
export const metadata = getMetadata("gulfOil");

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