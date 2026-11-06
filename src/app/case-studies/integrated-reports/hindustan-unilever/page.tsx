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

const URL_MAPPING: Record<string, string> = {
  video: "/offerings/corporate-films-video-reports",
  integrated: "/offerings/integrated-annual-reporting",
  sustainability: "/offerings/sustainability-esg-reporting",
  web: "/offerings/corporate-websites",
  presentations: "/offerings/investor-corporate-presentations",
  branding: "/offerings/corporate-branding-design",
};

const DIMENSIONS = [
    'Business Performance',
    'Growth, profitability and market leadership',
    'Strategic Transformation',
    'Portfolio choices, innovation and future readiness',
    'Consumers and Communities',
    'Trust, relevance and evolving aspirations',
    'Responsible Growth',
    'Sustainability, livelihoods and long-term impact',
];

const HIGHLIGHTS: [
    { heading: string; content: string },
    { heading: string; content: string },
    { heading: string; content: string },
] = [
    {
        heading: 'Powering a Nation on the Rise',
        content:
            'From everyday essentials to brands that shape generations, HUL’s story is deeply intertwined with India’s changing aspirations. Its reach across homes, communities and markets reflects a business that has grown alongside the nation, bringing together consumer understanding, innovation and scale to create lasting value.',
    },
    {
        heading: 'Growth That Moves with India',
        content:
            'The report presents a cohesive narrative that brings together HUL’s enduring brand equity, evolving consumer aspirations and innovation-led business transformation, positioning the Company at the intersection of India’s changing consumption landscape and its economic progress. It frames HUL’s role beyond market leadership, highlighting how its brands, capabilities and strategic choices help shape emerging lifestyles, unlock new avenues of growth and contribute to the aspirations of a nation on the rise.',
    },
    {
        heading: 'Performance with Purpose',
        content:
            'The report brings together business performance, strategic priorities and the forces reshaping HUL’s markets. It connects the year’s achievements with the Company’s focus on portfolio transformation, consumer relevance, operational agility and sustainable growth, giving readers a clearer view of both the value created today and the opportunities being built for tomorrow.',
    },
];




// TODO: replace with your actual payload for this page
const stackForThisPage = [
  
  { label: "Sustainability & ESG Reporting", key: "sustainability" },

      { label: "Investor & Corporate Presentations", key: "presentations" },
      { label: "Corporate Branding & Design", key: "branding" },
      { label: "Corporate Films & Video Reports", key: "video" },
      { label: "Software & Digital Solutions", key: "web" },
];

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function IntegratedReportPage() {

    const irPillarsData = [
        { id: '1', number: '01', title: 'Content writing', imageUrl: '/images/offerings/iar/pillars/Content.webp' },
        { id: '2', number: '02', title: 'ESG Frameworks', imageUrl: '/images/offerings/iar/pillars/ESG.webp' },
        { id: '3', number: '03', title: 'Contemporary design', imageUrl: '/images/offerings/iar/pillars/Contemporary.webp' },
        { id: '4', number: '04', title: 'Statutory & financial statement typesetting', imageUrl: '/images/offerings/iar/pillars/Statutory.webp' },
        { id: '5', number: '05', title: 'Project Management', imageUrl: '/images/offerings/iar/pillars/Project.webp' },
        { id: '6', number: '06', title: 'Digital Execution', imageUrl: '/images/offerings/iar/pillars/Digital.webp' },
    ];

    const irFaqsData = [
        { id: 'faq-1', question: 'Does K&A conduct primary research?', link: '/faqs#does-ka-conduct-primary-research' },
        { id: 'faq-2', question: 'Does K&A write annual report content, or only design it?', link: '/faqs#does-ka-write-annual-report-content-or-only-design-it' },
        { id: 'faq-3', question: 'Which reporting frameworks does K&A work with?', link: '/faqs#which-reporting-frameworks-does-ka-work-with' },
        { id: 'faq-4', question: 'How can research help shape an annual report?', link: '/faqs#how-can-research-help-shape-an-annual-report' },
        { id: 'faq-5', question: 'What should I look for in an annual report agency in India?', link: '/faqs#what-should-i-look-for-in-an-annual-report-agency-in-india' },
        { id: 'faq-6', question: 'Does K&A prepare BRSR and sustainability reports?', link: '/faqs#does-ka-prepare-brsr-and-sustainability-reports' },
        { id: 'faq-7', question: 'Who does K&A work with?', link: '/faqs#who-does-ka-work-with' },
        
    ];

    const teamParagraph: TextSegment[] = [
        { text: "that can write the", isBold: false },
        { text: "CEO letter,", isBold: true },
        { text: "structure the", isBold: false },
        { text: "value creation model,", isBold: true },
        { text: "draft the", isBold: false },
        { text: "BRSR narrative", isBold: true },
        { text: "and make sure every number across the report makes sense.", isBold: false },
    ];

    const statsData: StatCard[] = [
        { id: '1', value: '20+', label: 'Nifty 50 and Sensex 30 companies', barColor: '#B68B4A' },
        { id: '2', value: '310+', label: 'FY25-26 Annual Reports produced', barColor: '#A45D9F' },
        { id: '3', value: 'Highest', label: 'Ranked awards received for reports produced by K&A (across LACP, ICAI etc)', barColor: '#58C3F0' },
        { id: '4', value: '50+', label: 'Sector expertise covered across energy, steel, FMCG, pharmaceuticals, power, technology and financial services and more', barColor: '#EB4C88' },
    ];


    const caseStudies = [
        {
            id: '1',
            title: 'Granules India Limited',
            imageUrl: '/images/services/new/granules.webp',
            link: '/offerings/case-studies/iar/granules',
        },
        {
            id: '2',
            title: 'Gulf Oil Lubricants India Limited',
            imageUrl: '/images/services/new/gulf.webp',
            link: '/offerings/case-studies/iar/gulf-oil',
        },
        {
            id: '3',
            title: 'Solar Industries India Limited',
            imageUrl: '/images/services/new/solar.webp',
            link: '/offerings/case-studies/iar/solar',
        }
    ];

    const sectionRef = useRef<HTMLDivElement>(null);
    const yellowTwinRef = useRef<HTMLDivElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !yellowTwinRef.current || !videoContainerRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 85%',
                end: 'center 50%',
                scrub: 1,
                onEnter: () => {
                    videoRef.current?.play();
                }
            }
        });

        tl.fromTo(
            yellowTwinRef.current,
            { clipPath: 'inset(5% 10% 15% 10% round 24px)' },
            { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'power2.out' },
            0
        );

        tl.fromTo(
            videoContainerRef.current,
            { clipPath: 'inset(15% 10% 5% 10% round 24px)' },
            { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'power2.out' },
            0
        );

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <main className=''>

            <HeroSec
      imageSrc="/case-studies/ir/Hul-cover.webp"
      imageAlt="Hindustan Unilever Limited hero"
      title="Hindustan Unilever Limited (HUL)"
      overlay="linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 28%, rgba(0,0,0,0) 60%)"
    />
        <CardHighlights cards={HIGHLIGHTS} />

<ConnectedInf
            heading="Connecting the Dimensions of Value Creation"
            pointers={DIMENSIONS}
        />
        <StorySec
      heading="From Everyday Choices to National Progress"
      paragraph="HUL’s impact is reflected in the everyday moments its brands touch, the innovations that respond to changing needs and the value its business creates across the wider ecosystem. At K&A, we tried to bring these dimensions together in a cohesive narrative, showing how consumer-led growth, business transformation and responsible practices contribute to a broader story of progress.

The result is more than a record of business performance. It is a story of a company evolving with India, creating value today while helping shape the possibilities of tomorrow."
      badgeLabel="At K&A"
      statementLine="We connect business performance with the"
      statementHighlight="bigger story of progress."
      imageSrc="/case-studies/ir/HUL-mockup.webp"
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
                                <Footers nextPageName="Case Study - Kotak Mahindra Bank" nextPageLink="/case-studies/integrated-reports/kotak-mahindra-bank" />
                            </div>
        </main>
    );
}