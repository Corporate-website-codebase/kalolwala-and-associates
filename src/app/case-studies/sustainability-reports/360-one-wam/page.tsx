'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ServicePillars from '@/components/services/ServicePillars';
import ServiceHeader from '@/components/services/ServiceHeader'; // Adjust path if needed
import OneTeamStatement, { TextSegment } from '@/components/services/OneTeamStatement';
import ImpactStats, { StatCard } from '@/components/services/ImpactStats';
import WorkCards from '@/components/services/WorkCards';
import LogoMarquee from '@/components/services/LogoMarquee';
import Footers from '@/components/Footers';
import StackNav from "@/components/StackNav";
import ConnectedInf from '@/components/caseStudies/ConnectedInf';
import CardHighlights from '@/components/caseStudies/CardHighlight';
import StorySec from '@/components/caseStudies/StorySec';
import HeroSec from '@/components/caseStudies/HeroSec';



const DIMENSIONS = [
    '**Environmental Stewardship** \n Reducing operational impact through energy efficiency and resource-conscious practices.',
    '**Governance That Builds Trust** \n Upholding accountability, ethical conduct and robust oversight.',
    '**People Who Shape Progress** \n Supporting inclusion, development and a workplace where talent can thrive.',
    '**Impact That Extends Further** \n Advancing livelihoods, entrepreneurship and economic opportunity through social initiatives.',
    
];

const HIGHLIGHTS: [
    { heading: string; content: string },
    { heading: string; content: string },
    { heading: string; content: string },
] = [
    {
        heading: 'Redefining Wealth Through Greater Responsibility',
        content:
            'For 360 ONE WAM, sustainability is an opportunity to look beyond the conventional measures of business success and examine the greater value an institution creates. As a wealth and asset management business, its long-term relevance rests on sound governance, responsible decision-making, strong stakeholder relationships and the ability to contribute meaningfully to society. The narrative positions sustainability as integral to institutional resilience, connecting business responsibility with a broader vision of enduring value.',
    },
    {
        heading: 'A Broader Measure of Value',
        content:
            'The report brings together the different dimensions of 360 ONE WAM’s sustainability agenda, showing how environmental responsibility, governance, people practices and social impact contribute to the strength of the institution. It moves beyond a catalogue of initiatives to explore the intent behind them, the priorities they serve and their relevance to the Company’s long-term direction. The focus is on how responsible practices can strengthen the business while extending its contribution beyond its immediate operations.',
    },
    {
        heading: 'Turning Responsibility into Impact Beyond Boundaries',
        content:
            'The narrative connects the Company’s operational initiatives with its wider commitments to responsible business. Environmental efforts to improve resource efficiency sit alongside governance and workplace priorities, while the work of the 360 ONE Foundation extends the story into livelihood creation, entrepreneurship and financial inclusion. Together, these strands present a more complete view of sustainability that encompasses how the business operates, engages with stakeholders and its initiatives can create value beyond the organisation.',
    },
];




// TODO: replace with your actual payload for this page

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function IntegratedReportPage() {

   
    return (
        <main className=''>

            <HeroSec
            priority

      imageSrc="/case-studies/sr/360-cover.webp"
      imageAlt="360-one-wam"
      title="360 ONE WAM"
    //   overlay="linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 28%, rgba(0,0,0,0) 60%)"
    />
        <CardHighlights cards={HIGHLIGHTS} />

<ConnectedInf
            heading="Connecting Responsibility with Long-term Value"
            pointers={DIMENSIONS}
        />
        <StorySec
      heading="Towards Enduring Impact"
      paragraph="The significance of sustainability lies in how commitments translate into decisions, practices and outcomes over time. For 360 ONE WAM, this means strengthening the foundations of a responsible institution while recognising the wider role it can play in enabling a more inclusive and resilient society. By bringing its environmental, social and governance priorities into one cohesive narrative, the report connects the discipline of responsible business with the broader ambition of creating lasting value.

At K&A, we bring these dimensions together to tell a more meaningful story of sustainability that moves beyond individual initiatives to reveal the principles, priorities and aspirations shaping the business.
"
      badgeLabel="At K&A"
      statementLine="We go beyond reporting responsibility"
      statementHighlight="to reveal the value it creates."
      imageSrc="/case-studies/sr/360-mockup.webp"
      imageAlt="annual-report-collage"
    />
             {/* <div className=" bg-[#e2e2e2]">
        <StackNav stack={stackForThisPage} urlMapping={URL_MAPPING} />
        
      </div> */}

            {/* Additional content */}
            {/* <section className="max-w-[1440px] mx-auto px-8 md:px-16 pb-32 mt-20">
                <h2 className="text-3xl font-medium mb-6">Continue Reading</h2>
                <div className="w-full h-64 bg-gray-200 rounded-2xl animate-pulse"></div>
            </section> */}
            <div className="">
                                <Footers nextPageName="Case Study - LT Foods" nextPageLink="/case-studies/sustainability-reports/lt-foods" />
                            </div>
        </main>
    );
}