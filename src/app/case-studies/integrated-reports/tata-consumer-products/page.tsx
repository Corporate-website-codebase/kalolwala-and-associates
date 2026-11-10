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
    'Business Performance',
    'Growth, profitability and long-term value creation',
    'Portfolio Evolution',
    'Diversification, new categories and emerging platforms',
    'Consumer-Led Innovation',
    'Changing preferences, wellness and new consumption occasions',
    'Responsible Growth',
    'Sustainable practices, communities and long-term value',
];

const HIGHLIGHTS: [
    { heading: string; content: string },
    { heading: string; content: string },
    { heading: string; content: string },
] = [
    {
        heading: 'Serving More Moments. For Better.',
        content:
            'Tata Consumer Products is evolving from a portfolio of trusted household brands into a broader food and beverage business, expanding its presence across categories, consumption occasions and consumer needs. Its story is one of building on the trust it has earned while responding to changing lifestyles, emerging preferences and a growing emphasis on health, wellness and convenience.',
    },
    {
        heading: 'A Part of Everyday Life',
        content:
            'A unifying narrative connecting Tata Consumer Products’ established brand equity with its expanding portfolio and evolving consumer proposition. From familiar daily rituals to new tastes, formats and occasions, the story captures how the Company is broadening its relevance in consumers’ lives, bringing together heritage, innovation and diversification to create value across an increasingly varied consumption landscape.',
    },
    {
        heading: 'Performance with Purpose',
        content:
            'The report connects business performance with the strategic choices shaping Tata Consumer Products’ next phase of growth. It brings together the strength of core categories, expansion into new growth platforms, innovation and distribution capabilities, demonstrating how the Company is translating consumer understanding into business momentum while building a more diversified and resilient enterprise.\n\nThe result is a story of a business growing with its consumers, finding new opportunities in everyday life and making more moments count, for the better.',
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

      imageSrc="/case-studies/ir/tcp-cover.webp"
      imageAlt="Tata Consumer Products"
      title="Tata Consumer 
       Products Limited"
    //   overlay="linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 28%, rgba(0,0,0,0) 60%)"
    />
        <CardHighlights cards={HIGHLIGHTS} />

<ConnectedInf
            heading="Connecting the Dimensions of Value Creation"
            pointers={DIMENSIONS}
        />
        <StorySec
      heading="Making Every Moment Better"
      paragraph="Tata Consumer Products’ opportunity lies in extending the trust of its brands into more categories, occasions and aspects of everyday life. At K&A, we have tried to bring this ambition to life, showing how a deep understanding of consumers, backed by innovation and disciplined execution, is shaping the Company’s next chapter."
      badgeLabel="At K&A"
      statementLine="We turn everyday business into"
      statementHighlight="stories of enduring relevance, shaping how brands grow, connect and make a difference."
      imageSrc="/case-studies/ir/tcp-mockup.webp"
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
                                <Footers nextPageName="Case Studies - Annual Reports" nextPageLink="/case-studies/annual-reports" />
                            </div>
        </main>
    );
}