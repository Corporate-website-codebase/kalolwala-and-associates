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
    '**Energy Efficiency and Climate Action** \n Advancing renewable energy adoption and improving energy performance to manage the environmental impact of growing digital capacity.',
    '**Responsible Resource Management** \n Strengthening water conservation, recycling and waste management across operations.',
    '**People and Safe Operations** \n Promoting employee well-being, workplace inclusion and safety across operational and construction environments.',
    '**Governance and Accountability** \n Embedding sound oversight, risk management and responsible business practices into decision-making and stakeholder relationships.',
    
];

const HIGHLIGHTS: [
    { heading: string; content: string },
    { heading: string; content: string },
    { heading: string; content: string },
] = [
    {
        heading: 'Building Responsible Digital Infrastructure',
        content:
            "For Nxtra, building responsible digital infrastructure means ensuring that the expansion of India's digital economy is matched by a commitment to environmental stewardship, operational efficiency and long-term resilience. As data centres become increasingly central to how businesses and communities function, the responsibility extends to how this infrastructure is designed and operated. The narrative positions sustainability at the heart of Nxtra's growth, connecting the demands of digitalisation with the responsible management of resources and the creation of enduring value.",
    },
    {
        heading: 'Embedding Responsibility in Digital Growth',
        content:
            'The report brings together the environmental, social and governance priorities that shape Nxtra\'s approach to responsible infrastructure. Energy efficiency, renewable energy adoption, water stewardship and waste management are central to reducing the environmental footprint of data centre operations. These priorities reflect the importance of embedding resource efficiency into the infrastructure that supports digital growth, while strengthening operational performance and resilience.',
    },
    {
        heading: 'Responsibility Across the Infrastructure Lifecycle',
        content:
            "Building responsible digital infrastructure extends beyond the facilities themselves to encompass the people, processes and partnerships that enable them to operate. Nxtra's sustainability agenda connects environmental performance with workplace safety, employee development, inclusion, responsible procurement and robust governance. These priorities integrate environmental and social responsibility into infrastructure development and decision-making across the value chain.",
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

      imageSrc="/case-studies/sr/nxtra-cover.webp"
      imageAlt="nxtra"
      title="Nxtra"
    //   overlay="linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 28%, rgba(0,0,0,0) 60%)"
    />
        <CardHighlights cards={HIGHLIGHTS} />

<ConnectedInf
            heading="Connecting Digital Growth with Responsibility"
            pointers={DIMENSIONS}
        />
        <StorySec
      heading="Enabling a More Responsible Digital Future"
      paragraph="As India's digital infrastructure expands, its long-term sustainability will depend on how effectively growth is balanced with resource efficiency, environmental responsibility and operational resilience. For Nxtra, this means integrating sustainability into the way infrastructure is developed and managed, while preparing for the evolving demands of a data-driven economy. By connecting environmental priorities with responsible operations and governance, the Company is working to strengthen the foundations of digital growth for the future.

At K&A, we bring together the environmental, operational and governance dimensions of a business to communicate how its sustainability commitments translate into decisions, practices and progress, creating a clear narrative around the infrastructure shaping tomorrow.
"
      badgeLabel="At K&A"
      statementLine="We connect the infrastructure powering digital growth "
      statementHighlight="with the responsibility shaping its future."
      imageSrc="/case-studies/sr/nxtra-mockup.webp"
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
                                <Footers nextPageName="About Us" nextPageLink="/about" />
                            </div>
        </main>
    );
}