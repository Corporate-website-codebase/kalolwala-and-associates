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
    'Digital Transformation and AI Adoption',
    'Resilient Operational Excellence',
    'Innovation and Technical Excellence',
    'Business Growth and Diversification',
    'Global Reach and Market Expansion',
    'Human Capital Excellence'
    
];

const HIGHLIGHTS: [
    { heading: string; content: string },
    { heading: string; content: string },
    { heading: string; content: string },
] = [
    {
        heading: 'Growth, Engineered Through Drive',
        content:
            "As an organisation with over six decades of engineering experience, Engineers India Limited (EIL) is building on its established capabilities while expanding into new sectors, markets and opportunities. The theme 'Growth, Engineered Through Drive' captures this strategic direction through the Company's DRIVE framework, bringing together its focus on digital transformation, operational resilience, technical innovation, business diversification and human capital excellence.",
    },
    {
        heading: 'Building on Engineering Strengths',
        content:
            'The report highlights EIL\'s capabilities across consultancy, engineering and turnkey project execution, supported by its experience across the energy, industrial and infrastructure sectors. It brings out how the Company is strengthening its project delivery capabilities, deepening technical expertise and leveraging its established presence to pursue increasingly diverse and complex assignments.',
    },
    {
        heading: 'Expanding into New Growth Frontiers',
        content:
            "A key part of EIL's story is its expanding business and geographical presence. From strengthening its footprint across international markets to entering emerging areas such as green hydrogen, green ammonia, biofuels, defence manufacturing, data centres and infrastructure, the Company is broadening its portfolio beyond its traditional oil and gas businesses. The report captures how this diversification is opening new avenues for growth while building on EIL's core engineering and project management expertise.",
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
      imageSrc="/case-studies/ar/eil-cover.webp"
      imageAlt="engineers-india"
      title="Engineers India
      Limited (EIL)"
    //   overlay="linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 28%, rgba(0,0,0,0) 60%)"
    />
        <CardHighlights cards={HIGHLIGHTS} />

<ConnectedInf
            heading="Connecting the Dimensions of Value Creation"
            pointers={DIMENSIONS}
        />

        <StorySec
      heading="Driving Progress Through Collective Strength"
      paragraph="The report also recognises the people, technical capabilities and organisational resilience that underpin EIL's growth. Initiatives in employee development, leadership progression, digital adoption and innovation reflect the Company's focus on strengthening the foundations needed to deliver its strategic priorities and pursue new opportunities.
"
      badgeLabel="At K&A"
      statementLine="We help organisations"
      statementHighlight="communicate their achievements, articulate their ambitions and present a clear picture of the value they create."
      imageSrc="/case-studies/ar/eil-mockup.webp"
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
                                {/* <Footers nextPageName="About Us" nextPageLink="/about" />
                                 */}
                                 <Footers nextPageName="Case Studies - Sustainability Reports" nextPageLink="/case-studies/sustainability-reports" />
                            </div>
        </main>
    );
}