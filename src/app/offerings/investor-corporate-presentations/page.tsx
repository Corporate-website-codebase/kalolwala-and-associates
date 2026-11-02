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
{ label: "Sustainability & ESG Reporting", key: "sustainability" },
    //   { label: "Investor & Corporate Presentations", key: "presentations" },
      { label: "Corporate Branding & Design", key: "branding" },
      { label: "Corporate Films & Video Reports", key: "video" },
      { label: "Software & Digital Solutions", key: "web" },
];

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function IntegratedReportPage() {

    const irPillarsData = [
        { id: '1', number: '01', title: 'Quarterly and annual earnings presentations', imageUrl: '/images/offerings/iar/pillars/Content.webp' },
        { id: '2', number: '02', title: 'Analyst and institutional investor meet decks', imageUrl: '/images/offerings/iar/pillars/ESG.webp' },
        { id: '3', number: '03', title: 'Investor day and capital markets day presentations', imageUrl: '/images/offerings/iar/pillars/Contemporary.webp' },
        { id: '4', number: '04', title: 'Strategy-based presentations', imageUrl: '/images/offerings/iar/pillars/Statutory.webp' },
        { id: '5', number: '05', title: 'AGM presentations and Chair/CEO speech support', imageUrl: '/images/offerings/iar/pillars/Project.webp' },
        { id: '6', number: '06', title: 'IPO, QIP and fundraise roadshow presentations', imageUrl: '/images/offerings/iar/pillars/Digital.webp' },
        { id: '7', number: '07', title: 'Corporate profiles and investor factsheets', imageUrl: '/images/offerings/iar/pillars/Digital.webp' },
        { id: '8', number: '08', title: 'Earnings call scripts and anticipated Q&A briefs', imageUrl: '/images/offerings/iar/pillars/Digital.webp' },
        { id: '9', number: '09', title: 'Presentation templates and design systems for internal teams', imageUrl: '/images/offerings/iar/pillars/Digital.webp' },
        // { id: '10', number: '10', title: 'Sustainability journey video', imageUrl: '/images/offerings/iar/pillars/Digital.webp' },

    ];

    const irFaqsData = [
        { id: 'faq-1', question: 'What investor presentation services does K&A offer?', link: '/faqs#what-investor-presentation-services-does-ka-offer' },
        { id: 'faq-2', question: 'How quickly can K&A turn around an earnings presentation?', link: '/faqs#how-quickly-can-ka-turn-around-an-earnings-presentation' },
        { id: 'faq-3', question: 'Does K&A write the content or only design the slides?', link: '/faqs#does-ka-write-the-content-or-only-design-the-slides' },
        { id: 'faq-4', question: 'How does K&A tailor a presentation to a company’s business?', link: '/faqs#how-does-ka-tailor-a-presentation-to-a-companys-business' },
        { id: 'faq-5', question: 'Are investor presentations regulated in India?', link: '/faqs#are-investor-presentations-regulated-in-india' },
        { id: 'faq-6', question: 'Can K&A build templates our internal team can use?', link: '/faqs#can-ka-build-templates-our-internal-team-can-use' },
        
    ];

    const teamParagraph: TextSegment[] = [
        { text: "that is ready when the numbers are, written around what makes your business distinctive, and pitched at the investors you need to convince. Your finance and IR teams spend results season reviewing an argument rather than fixing slides.", isBold: false },
        // { text: "CEO letter,", isBold: true },
        // { text: "structure the", isBold: false },
        // { text: "value creation model,", isBold: true },
        // { text: "draft the", isBold: false },
        // { text: "BRSR narrative", isBold: true },
        // { text: "and make sure every number across the report makes sense.", isBold: false },
    ];

    const statsData: StatCard[] = [
        { id: '1', value: '25+', label: 'Presentations delivered every year', barColor: '#B68B4A' },
        { id: '2', value: '10 mins', label: 'Turnaround to publish the results in presentation', barColor: '#A45D9F' },
        { id: '3', value: 'Experience', label: 'across IPOs, QIPs, investor days and quarterly earnings cycles', barColor: '#58C3F0' },
        { id: '4', value: '15+', label: 'Sector depth across energy, FMCG, healthcare, pharmaceuticals,beverages, technology and financial services', barColor: '#EB4C88' },
    ];

 
     
     
    const caseStudies = [
        {
            id: '1',
            title: 'Altius Telecom Infrastructure Trust',
            imageUrl: '/images/offerings/ppt/Altius.jpg',
            link: '/docs/offerings/ppt/ALTIUS PPT 04.08.2025.pdf',
        },
        {
            id: '2',
            title: 'Lux Industries Ltd',
            imageUrl: '/images/offerings/ppt/Lux.jpg',
            link: '/docs/offerings/ppt/Lux Industries PPT 6.08.2024.pdf',
        },
        {
            id: '3',
            title: 'Piccadily Agro Industries Limited',
            imageUrl: '/images/offerings/ppt/Piccadilly.jpg',
            link: '/docs/offerings/ppt/Piccadily_Earnings_PPT_13.11.2025.pdf',
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
                            Investor & <br className="hidden md:block" />
                            Corporate Presentations
                        </>
                    }
                    description="We turn financial and strategic complexity into presentations that are clear, incisive and built for decision-making. For some of India’s largest listed companies, our team combines financial fluency, sharp writing and strong visual storytelling to shape earnings presentations, analyst and institutional investor meets, investor days, AGM decks, IPO roadshows and fundraise presentations that communicate with precision and confidence."
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
                headline="Turning Complexity into Clarity "
                description="An investor presentation is not a shortened annual report. It is a tightly argued case, read by analysts who have already modelled your numbers and will notice anything that does not add up. Our content team starts with the investment thesis: what investors need to believe about the business, what evidence supports it, and what questions they will ask. Design then makes that argument fast to read. "
                pillars={irPillarsData}
                header='What we offer'
                extraContentPara={[
    { heading: 'Built around your business, not a template. ', para: 'We work with the CFO, investor relations and leadership to understand the business model, segment drivers, capital allocation and strategy before a single slide is drafted. A steel company, a hospital chain and a consumer brand are judged on different metrics, and their decks should reflect that.' },
    { heading: 'Written for the people in the room. ', para: 'Long-only funds, sell-side analysts, lenders, retail shareholders and prospective IPO investors look for different things. We shape the narrative, the depth of financial detail and the sequence of slides for the audience each presentation serves.' },
    { heading: 'Consistent with everything you have filed. ', para: 'The numbers, segment definitions and strategic messages in your deck must match your results, annual report, BRSR and earnings call commentary. ' },
    { heading: 'Aware of the disclosure rules.', para: 'Under SEBI’s LODR Regulations, presentations made to analysts and institutional investors must be shared with the stock exchanges, and earnings call recordings and transcripts must be published on the company website. Under SEBI’s insider trading regulations, nothing price-sensitive can be shared selectively. ' },
   


  ]}
            />
            
            
            <OneTeamStatement 
                subtitle="What this means for our clients"
                mainTitle="a deck"
                outerImage="/images/offerings/ppt/outer-img.jpg"
                innerImage="/images/offerings/ppt/inner-img.jpg"
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