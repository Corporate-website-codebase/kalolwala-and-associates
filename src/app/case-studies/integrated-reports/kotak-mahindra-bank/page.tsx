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
    'Financial Performance',
    'Growth, profitability and long-term value creation',
    'Strategic Evolution',
    'Business priorities, capabilities and future readiness',
    'Customer and Business Growth',
    'Financial solutions that enable aspirations and enterprise',
    'Trust and Responsible Growth',
    'Governance, resilience and sustainable value',
];

const HIGHLIGHTS: [
    { heading: string; content: string },
    { heading: string; content: string },
    { heading: string; content: string },
] = [
    {
        heading: '40 Years of Transforming Ambition into Action',
        content:
            'For four decades, Kotak Mahindra Bank has been part of the financial ambitions shaping India’s progress. From enabling individual aspirations to supporting businesses and participating in the growth of the Indian economy, the Bank’s evolution reflects a sustained commitment to turning opportunity into tangible outcomes. As financial needs grow more complex and expectations continue to evolve, Kotak’s story is one of building on trust, deepening capabilities and creating value for the future.',
    },
    {
        heading: 'From Ambition to Achievement',
        content:
            'A unifying narrative connecting Kotak’s four-decade evolution with its role in enabling progress across individuals, businesses and the wider economy. The story traces how the Bank has translated changing customer needs and emerging opportunities into financial solutions, stronger capabilities and sustained growth. It positions the anniversary not simply as a milestone in the Bank’s history, but as a reflection of how vision, conviction and execution have shaped its progress and continue to inform its ambitions.',
    },
    {
        heading: 'Performance with Purpose. Progress with Perspective.',
        content:
            'The report connects financial performance with the strategic choices defining Kotak’s next phase of growth. It brings together business resilience, customer relationships, digital capabilities, risk discipline and evolving market opportunities to show how the Bank is converting strategic intent into measurable outcomes. By placing the year’s achievements within the context of its 40-year evolution, K&A weaves a narrative that demonstrates how the foundations built over time are enabling the Bank to respond to a changing financial landscape and pursue sustainable, long-term value creation.\n\nIt is the story of four decades in which ambition has found expression in action, capabilities have evolved with opportunity and progress has created a foundation for what comes next.',
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
      imageSrc="/case-studies/ir/kotak-cover.webp"
      imageAlt="Kotak Mahindra Bank"
      title="Kotak Mahindra Bank"
      overlay="linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 28%, rgba(0,0,0,0) 60%)"
    />
        <CardHighlights cards={HIGHLIGHTS} />

<ConnectedInf
            heading="Connecting the Dimensions of Value Creation"
            pointers={DIMENSIONS}
        />
        <StorySec
      heading="Four Decades Forward. Ambition into Action."
      paragraph="Kotak Mahindra Bank’s next chapter builds on the experience, relationships and capabilities developed over 40 years, while responding to the opportunities reshaping financial services. The report brings this continuity and change into focus, connecting the Bank’s legacy of progress with its commitment to serve evolving needs, strengthen its competitive position and create enduring value for stakeholders."
      badgeLabel="At K&A"
      statementLine="We turn business ambition into"
      statementHighlight="
      stories of progress, purpose and enduring value."
      imageSrc="/case-studies/ir/kotak-mockup.webp"
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
                                {/* <Footers nextPageName="About Us" nextPageLink="/about" /> */}
                                <Footers nextPageName="Case Study - Tata Consumer Products Limited" nextPageLink="/case-studies/integrated-reports/tata-consumer-products" />
                            </div>
        </main>
    );
}