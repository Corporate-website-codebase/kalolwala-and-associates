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

const URL_MAPPING: Record<string, string> = {
  video: "/offerings/video",
  integrated: "/offerings/integrated-annual-reporting",
  sustainability: "/offerings/sustainability-and-esg-reporting",
  web: "/offerings/corporate-websites",
  presentations: "/offerings/investor-corporate-presentations",
  branding: "/offerings/corporate-branding-design",
};

// TODO: replace with your actual payload for this page
const stackForThisPage = [
  

      { label: "Integrated Annual Reporting", key: "integrated" },

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
        { id: '1', number: '01', title: 'ESG and Sustainability Report content drafting', imageUrl: '/images/offerings/iar/pillars/Content.webp' },
        { id: '2', number: '02', title: 'Editorial', imageUrl: '/images/offerings/iar/pillars/ESG.webp' },
        { id: '3', number: '03', title: 'Framework mapping and compliance alignment (GRI, SASB, TCFD, IFRS S1/S2, BRSR)', imageUrl: '/images/offerings/iar/pillars/Contemporary.webp' },
        { id: '4', number: '04', title: 'Single or Double materiality assessments', imageUrl: '/images/offerings/iar/pillars/Statutory.webp' },
        { id: '5', number: '05', title: 'Data visualisation and disclosure tables', imageUrl: '/images/offerings/iar/pillars/Project.webp' },
        { id: '6', number: '06', title: 'Calculation for Scope 1, Scope 2 and Scope 3 emissions', imageUrl: '/images/offerings/iar/pillars/Digital.webp' },
        { id: '7', number: '07', title: 'BRSR Core and assurance', imageUrl: '/images/offerings/iar/pillars/Digital.webp' },
        { id: '8', number: '08', title: 'Contemporary design', imageUrl: '/images/offerings/iar/pillars/Digital.webp' },
        { id: '9', number: '09', title: 'Digital Sustainability Report (Microsites)', imageUrl: '/images/offerings/iar/pillars/Digital.webp' },
        { id: '10', number: '10', title: 'Sustainability journey video', imageUrl: '/images/offerings/iar/pillars/Digital.webp' },

    ];

    const irFaqsData = [
        { id: 'faq-1', question: 'Does K&A prepare sustainability and ESG reports?', link: '/faqs#does-ka-prepare-sustainability-and-esg-reports' },
        { id: 'faq-2', question: 'Which sustainability reporting frameworks does K&A work with?', link: '/faqs#which-sustainability-reporting-frameworks-does-ka-work-with' },
        { id: 'faq-3', question: 'What is the difference between an ESG report and a sustainability report?', link: '/faqs#what-is-the-difference-between-an-esg-report-and-a-sustainability-report' },
        { id: 'faq-4', question: 'Can K&A help with BRSR Core assurance readiness?', link: '/faqs#can-ka-help-with-brsr-core-assurance-readiness' },
        { id: 'faq-5', question: 'Does K&A conduct materiality assessments?', link: '/faqs#does-ka-conduct-materiality-assessments' },
        { id: 'faq-6', question: 'How does K&A avoid greenwashing in sustainability reports?', link: '/faqs#how-does-ka-avoid-greenwashing-in-sustainability-reports' },
        
    ];

    const teamParagraph: TextSegment[] = [
        { text: " the entire sustainability reporting process under one roof, from materiality assessments and BRSR preparation to narrative ", isBold: false },
        { text: "narrative", isBold: true },
        { text: "development and alignment with the Annual Report. This ", isBold: false },
        { text: "integrated approach", isBold: true },
        { text: "minimises cross-document reconciliation,  gives ", isBold: false },
        { text: "assurance", isBold: true },
        { text: "providers a traceable evidence base for every disclosure and provides investors, lenders and rating agencies with one coherent, consistent account of sustainability performance, grounded in verifiable outcomes rather than fragmented or conflicting disclosures.", isBold: false },
        
    ];

    const statsData: StatCard[] = [
        { id: '1', value: 'Exclusive', label: 'Partners in India for Ecodrisil’s tech-enabled Ai BRSR and ESG platform  ', barColor: '#B68B4A' },
        { id: '2', value: 'Member', label: 'of the IFRS Sustainability Alliance', barColor: '#A45D9F' },
        { id: '3', value: '30+', label: 'Sector expertise covered across energy, steel, FMCG, pharmaceuticals, power, technology and financial services and more', barColor: '#58C3F0' },
        { id: '4', value: '80+', label: 'sustainability and BRSR reports produced in last 2 years', barColor: '#EB4C88' },
    ];

 
     
     
    const caseStudies = [
        {
            id: '1',
            title: 'Bharat Forge Limited',
            imageUrl: '/images/offerings/sr/Bharat Forge.jpg',
            link: '/docs/offerings/sr/BFL-Sustainability-Report-2024-25.pdf',
        },
        {
            id: '2',
            title: 'Embassy Developments Limited',
            imageUrl: '/images/offerings/sr/EMBASSY.webp',
            link: '/docs/offerings/sr/Embassy REIT.pdf',
        },
        {
            id: '3',
            title: 'NXTRA By Airtel',
            imageUrl: '/images/offerings/sr/Nxtra.webp',
            link: '/docs/offerings/sr/Nxtra SR.pdf',
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
        <main>
            <div className="bg-[#E3E3E3] pt-20 text-[#1A1A1A] font-sans overflow-x-hidden min-h-screen">

                {/* --- EXTRACTED TOP SECTION --- */}
                <ServiceHeader 
                    title={
                        <>
                            Sustainability & <br className="hidden md:block" />
                            ESG Report
                        </>
                    }
                    description="Sustainability reporting today is subject to scrutiny from an increasingly discerning range of stakeholders, including assurance providers, rating agencies and analysts, alongside employees and communities. Credibility rests on the integrity and traceability of the information behind the narrative. K&A works in close collaboration with sustainability, finance and compliance teams to ensure that every disclosure, commitment and performance metric is substantiated by verifiable evidence attributable to its source and aligned with the organisation’s underlying practices. The result is reporting that inspires confidence and reflects the non-financial strengths of the business."
                    faqs={irFaqsData}
                />

                {/* --- NORMAL SCROLL VIDEO REVEAL SECTION --- */}
                <section
                    ref={sectionRef}
                    className="relative w-full h-[70vh] md:h-[85vh] my-26 mt-20"
                >
                    <div
                        ref={yellowTwinRef}
                        className="absolute inset-0 w-full h-full bg-[#ffcb03]"
                    ></div>

                    <div
                        ref={videoContainerRef}
                        className="absolute inset-0 w-full h-full bg-gray-200 shadow-xl"
                    >
                        <video
                            ref={videoRef}
                            className="w-full h-full object-cover"
                            loop
                            muted
                            playsInline
                            preload="auto"
                        >
                            <source src="/videos/offerings/ir.mp4" type="video/mp4" />
                        </video>
                    </div>
                </section>
            </div>
            
            <ServicePillars
                title="What do we do?"
                headline="We write sustainability reports that make a lot of sense"
                description="As a listed member of the IFRS Sustainability Alliance, our team of experts are well-versed with evolving frameworks shaping sustainability disclosures for Indian and global markets. "
                pillars={irPillarsData}
                extraContentHeading="Frameworks and standards our team works with:"
  extraContentPara={[
    { heading: 'BRSR and BRSR Core', para: 'SEBI’s mandated disclosure for the top 1,000 listed entities, including the nine Core attributes, value chain disclosures and assurance readiness' },
    { heading: 'GRI Standards', para: 'Reports in accordance with, or with reference to, GRI, including Sector Standards and the new GRI 102 Climate and GRI 103 Energy standards' },
    { heading: 'IFRS S1 and S2 (ISSB)', para: 'Sustainability-related and climate-related financial disclosures for companies with global investors and lenders, alongside SASB industry metrics' },
    { heading: 'Integrated Reporting Framework', para: 'Connecting sustainability performance to strategy, the six capitals and long-term value creation' },
    { heading: 'ESRS and the EU Voluntary Standard', para: 'For exporters and suppliers responding to data requests from European customers' },
    { heading: 'Climate and nature', para: 'GHG Protocol emissions reporting, transition plans, science-based targets, CDP responses and TNFD-aligned nature disclosures' },
    { heading: 'UN Sustainable Development Goals', para: 'Mapping that is specific and evidenced, not decorative' },


  ]}
            />
            
            
            <OneTeamStatement 
                subtitle="What this means for our clients"
                mainTitle="We bring"
                outerImage="/images/offerings/sr/outer-img.jpg"
                innerImage="/images/offerings/sr/inner-img.png"
                paragraphSegments={teamParagraph}
            />

            {/* The stats grid below it */}
            <ImpactStats stats={statsData} />

            <WorkCards works={caseStudies} />

            <LogoMarquee/>

             <div className=" bg-[#e2e2e2]">
        <StackNav stack={stackForThisPage} urlMapping={URL_MAPPING} />
      </div>

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