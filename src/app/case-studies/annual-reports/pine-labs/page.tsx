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
    'Platform-led Growth',
    'Expanding Value Pools',
    'Global Expansion',
    'Technology and Innovation',
    'Ecosystem-led Scale'
    
];

const HIGHLIGHTS: [
    { heading: string; content: string },
    { heading: string; content: string },
    { heading: string; content: string },
] = [
    {
        heading: 'Commerce OS for the Global South',
        content:
            "As commerce becomes increasingly digital, connected and intelligent, the infrastructure powering transactions is becoming as important as the transactions themselves. Pine Labs has evolved from a payments acceptance business into a full-stack commerce and fintech platform, bringing together payments, affordability, issuing, transaction processing, data and financial infrastructure. With India as its foundation and the Global South as its next frontier, Pine Labs is building the infrastructure to help businesses participate in a rapidly changing digital economy.",
    },
    {
        heading: 'From Payments to Full-Stack Commerce',
        content:
            'The report presents Pine Labs’ evolution through the idea of a commerce operating system, an integrated platform built around the transaction and extending across the wider commerce ecosystem. It brings together the Company’s four-layer architecture, its expanding portfolio of businesses and its three-sided network of merchants, brands and financial institutions. The narrative positions Pine as infrastructure that sits beneath and connects multiple aspects of commerce.',
    },
    {
        heading: 'Building for the Global South',
        content:
            "The report connects Pine Labs’ experience with its international ambition. India’s scale and complexity have shaped a platform designed to be resilient, configurable and capable of operating at high transaction volumes. As Pine Labs expands across emerging markets, the story focuses on how this India-proven infrastructure is being localised for different markets rather than simply exported unchanged.",
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

      imageSrc="/case-studies/ar/pine-cover.webp"
      imageAlt="pine-labs"
      title="Pine Labs"
    //   overlay="linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 28%, rgba(0,0,0,0) 60%)"
    />
        <CardHighlights cards={HIGHLIGHTS} />

<ConnectedInf
            heading="Connecting the Dimensions of Value Creation"
            pointers={DIMENSIONS}
        />
        <StorySec
      heading="From Transactions to Transformation"
      paragraph="Pine Labs’ story extends beyond the scale of transactions it processes. It is about the infrastructure built underneath them — the technology, relationships, regulatory capabilities and distribution network that enable commerce to move faster and further. At K&A, we brought these dimensions together to show how Pine Labs is evolving from a payments platform into an integrated commerce infrastructure business while preparing for a future shaped by AI, automation and agentic commerce.
"
      badgeLabel="At K&A"
      statementLine="We turn business transformation into stories that connect"
      statementHighlight="scale and ambition to tell the story of what comes next."
      imageSrc="/case-studies/ar/pine-mockup.webp"
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
 <Footers nextPageName="Case Study - Indian Oil Corporation Limited" nextPageLink="/case-studies/annual-reports/indian-oil" />
                            </div>
        </main>
    );
}