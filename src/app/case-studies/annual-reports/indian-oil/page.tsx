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
    'Energy Security and Infrastructure',
    'Operational Excellence',
    'Business Diversification',
    'Energy Transition',
    'Technology and Innovation',
    'Sustainable Growth'
    
];

const HIGHLIGHTS: [
    { heading: string; content: string },
    { heading: string; content: string },
    { heading: string; content: string },
] = [
    {
        heading: 'Towards Mission Excellence',
        content:
            "India's energy needs are evolving and so is the role of the organisation powering them. As one of the country's leading integrated energy companies, IndianOil is strengthening its established businesses while expanding into new energy avenues, advancing technology and building infrastructure for the future. The theme 'Towards Mission Excellence' captures this purposeful journey, bringing together the Company's commitment to operational excellence, sustained growth and a responsible energy transition.",
    },
    {
        heading: 'Strengthening the Foundations of Growth',
        content:
            'The report highlights the scale and diversity of IndianOil\'s operations across refining, pipelines, marketing, petrochemicals, exploration and production, natural gas and alternative energy. It brings out how the Company continues to strengthen its integrated business model through capacity expansion, infrastructure development, operational improvements and a focus on energy security.',
    },
    {
        heading: 'Preparing for the Energy Transition',
        content:
            "A key part of IndianOil's story is its expanding presence in emerging energy businesses. From renewable energy, green hydrogen and biofuels to sustainable aviation fuel and electric mobility, the Company is investing in new capabilities and exploring alternative energy pathways. The report captures how these initiatives complement its established strengths and support its ambition to remain relevant in India's evolving energy landscape.",
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

      imageSrc="/case-studies/ar/iol-cover.webp"
      imageAlt="indian-oil"
      title="Indian Oil Corporation Limited (IndianOil)"
    //   overlay="linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 28%, rgba(0,0,0,0) 60%)"
    />
        <CardHighlights cards={HIGHLIGHTS} />

<ConnectedInf
            heading="Connecting the Dimensions of Value Creation"
            pointers={DIMENSIONS}
        />
        <StorySec
      heading="Driving Progress Through Collective Strength"
      paragraph="The report also recognises the people, partnerships and capabilities that underpin IndianOil's progress. Investments in employee development, research and innovation, collaboration with technology partners and community initiatives reflect the Company's understanding that long-term excellence is built through collective effort and sustained commitment.
"
      badgeLabel="At K&A"
      statementLine="We create integrated annual reports that bring together business strategy, performance and purpose"
      statementHighlight="through thoughtful storytelling, strong editorial direction and cohesive design."
      imageSrc="/case-studies/ar/iol-mockup.webp"
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
 <Footers nextPageName="Case Study - Engineers India Limited" nextPageLink="/case-studies/annual-reports/engineers-india" />
                            </div>
        </main>
    );
}