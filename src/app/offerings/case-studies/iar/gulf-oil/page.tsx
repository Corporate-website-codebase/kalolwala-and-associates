import ChallengeImpact from "@/components/caseStudies/ir/gulf-oil/ChallengeImpact";
import Closing from "@/components/caseStudies/ir/gulf-oil/Closing";
import HeroSection from "@/components/caseStudies/ir/gulf-oil/HeroSection";
import OutcomeSection from "@/components/caseStudies/ir/gulf-oil/OutcomeSection";
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