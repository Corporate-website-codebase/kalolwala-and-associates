import ChallengeImpact from "@/components/caseStudies/ir/granules/ChallengeImpact";
import Closing from "@/components/caseStudies/ir/granules/Closing";
import HeroSection from "@/components/caseStudies/ir/granules/HeroSection";
import OutcomeSection from "@/components/caseStudies/ir/granules/OutcomeSection";
import Footers from "@/components/Footers";

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