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
    '**Trust That Endures** \n Protecting the quality, relationships and values that underpin the Company\'s reputation.',
    '**Partnerships That Sustain** \n Recognising the importance of farmers, business partners and global supply chains to long-term business continuity.',
    '**Innovation That Advances Progress** \n Embracing digitalisation, innovation and diversification to respond to emerging opportunities.',
    '**Growth with a Wider Purpose** \n Aligning business ambitions with a healthier, more sustainable future for communities and the planet.',
    
];

const HIGHLIGHTS: [
    { heading: string; content: string },
    { heading: string; content: string },
    { heading: string; content: string },
] = [
    {
        heading: 'Connecting Resilience with Renewal',
        content:
            "For LT Foods, sustainability is rooted in the ability to preserve what has sustained the business while preparing for what lies ahead. Its journey brings together the resilience of established brands, enduring relationships with farmers and partners and global supply chains with a forward-looking ambition to reimagine food for a healthier, more sustainable future. The narrative positions sustainability as an extension of the Company's growth philosophy, connecting business continuity with innovation, responsible growth and the aspirations of communities.",
    },
    {
        heading: 'A Foundation Built on Resilience',
        content:
            'The report explores resilience as a defining strength of LT Foods, embedded in its brands, partnerships, operating ecosystem and values. These foundations have enabled the Company to navigate changing market conditions while protecting the trust, quality and relationships central to its business. The focus is on how these enduring strengths support continuity, strengthen stakeholder confidence and provide a strong foundation for future growth.',
    },
    {
        heading: 'Looking Beyond the Present',
        content:
            "Resilience gains greater significance when paired with the foresight to anticipate change and pursue new opportunities. LT Foods' vision brings this forward-looking perspective into focus through its emphasis on reimagining food, advancing digitalisation and innovation, diversifying with confidence and aligning business growth with environmental needs and the aspirations of communities. Together, these priorities connect the Company's long-term ambitions with the evolving expectations of consumers and other stakeholders.",
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

      imageSrc="/case-studies/sr/lt-cover.webp"
      imageAlt="lt-foods"
      title="LT Foods"
    //   overlay="linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 28%, rgba(0,0,0,0) 60%)"
    />
        <CardHighlights cards={HIGHLIGHTS} />

<ConnectedInf
            heading="Connecting Resilience with Foresight"
            pointers={DIMENSIONS}
        />
        <StorySec
      heading="Creating Enduring Value"
      paragraph="The strength of LT Foods' sustainability narrative lies in how it connects the ability to endure with the ambition to evolve. Resilience safeguards the foundations of the business, while vision creates the impetus to adapt, innovate and pursue new possibilities. Together, these principles shape a growth philosophy that seeks to create enduring value for consumers, farmers, employees, shareholders and society.

At K&A, we bring these interconnected dimensions together to reveal the thinking behind a company's sustainability journey, connecting its enduring strengths with its future ambitions in a cohesive and meaningful narrative.
"
      badgeLabel="At K&A"
      statementLine="We connect the strength of what a business stands for"
      statementHighlight="with the vision of what it can become."
      imageSrc="/case-studies/sr/lt-mockup.webp"
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
                                <Footers nextPageName="Case Study - Nxtra" nextPageLink="/case-studies/sustainability-reports/nxtra" />
                            </div>
        </main>
    );
}