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

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function IntegratedReportPage() {

    const irPillarsData = [
        { id: '1', number: '01', title: 'Content writing', imageUrl: '/images/content-writing.jpg' },
        { id: '2', number: '02', title: 'ESG Frameworks', imageUrl: '/images/esg.jpg' },
        { id: '3', number: '03', title: 'Contemporary design', imageUrl: '/images/design.jpg' },
        { id: '4', number: '04', title: 'Statutory & financial statement typesetting', imageUrl: '/images/typesetting.jpg' },
        { id: '5', number: '05', title: 'Project Management', imageUrl: '/images/project-management.jpg' },
        { id: '6', number: '06', title: 'Digital Execution', imageUrl: '/images/digital.jpg' },
    ];

    const irFaqsData = [
        { id: 'faq-1', question: 'Does K&A write annual report content, or only design it?', link: '/faqs#content-writing' },
        { id: 'faq-2', question: 'Which reporting frameworks does K&A work with?', link: '/faqs#frameworks' },
        { id: 'faq-3', question: 'How long does the integrated reporting process typically take?', link: '/faqs#timeline' },
        { id: 'faq-4', question: 'Do you assist with digital hosting of the report?', link: '/faqs#digital-hosting' },
        { id: 'faq-4', question: 'Do you assist with digital hosting of the report?', link: '/faqs#digital-hosting' },
        { id: 'faq-4', question: 'Do you assist with digital hosting of the report?', link: '/faqs#digital-hosting' },
        { id: 'faq-4', question: 'Do you assist with digital hosting of the report?', link: '/faqs#digital-hosting' },
        { id: 'faq-4', question: 'Do you assist with digital hosting of the report?', link: '/faqs#digital-hosting' },
        { id: 'faq-4', question: 'Do you assist with digital hosting of the report?', link: '/faqs#digital-hosting' },
        { id: 'faq-4', question: 'Do you assist with digital hosting of the report?', link: '/faqs#digital-hosting' },
        { id: 'faq-4', question: 'Do you assist with digital hosting of the report?', link: '/faqs#digital-hosting' },
        { id: 'faq-4', question: 'Do you assist with digital hosting of the report?', link: '/faqs#digital-hosting' },
        { id: 'faq-4', question: 'Do you assist with digital hosting of the report?', link: '/faqs#digital-hosting' },
        { id: 'faq-4', question: 'Do you assist with digital hosting of the report?', link: '/faqs#digital-hosting' },
        { id: 'faq-4', question: 'Do you assist with digital hosting of the report?', link: '/faqs#digital-hosting' },
        { id: 'faq-4', question: 'Do you assist with digital hosting of the report?', link: '/faqs#digital-hosting' },
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
            link: '/work/abb-india',
        },
        {
            id: '2',
            title: 'Gulf Oil Lubricants India Limited',
            imageUrl: '/images/services/new/gulf.webp',
            link: '/work/aster-healthcare',
        },
        {
            id: '3',
            title: 'Solar Industries India Limited',
            imageUrl: '/images/services/new/solar.webp',
            link: '/work/cipla-limited',
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
                            Integrated <br className="hidden md:block" />
                            Annual Report
                        </>
                    }
                    description="At the core of K&A's reporting philosophy lies a commitment to align financial performance with environmental, social and governance (ESG) priorities. Our approach to reporting is based on the Integrated Thinking Principles and enables readers to understand the tangible and intangible value created for the organisation and its stakeholders. We then seamlessly integrate this strategic content with a modern, visually appealing design, making it easier for readers to comprehend."
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
                headline="Annual Reports for India’s largest listed companies, written by people who understand the business."
                description="Our expertise extends end-to-end for the entire Annual Report - from shaping the strategic narrative, strategies, ESG and Sustainability coverage, backed with the visual language to designing, typesetting statutory disclosures and financial statements. We bring content, design and technical production together under one roof, ensuring accuracy, precision and seamless execution of the reporting journey."
                pillars={irPillarsData}
            />
            
            <OneTeamStatement 
                subtitle="What this means for our clients"
                mainTitle="one team"
                outerImage="/images/services/new/outer-img.webp"
                innerImage="/images/services/new/inner-img.webp"
                paragraphSegments={teamParagraph}
            />

            {/* The stats grid below it */}
            <ImpactStats stats={statsData} />

            <WorkCards works={caseStudies} />

            <LogoMarquee/>

            

            {/* Additional content */}
            <section className="max-w-[1440px] mx-auto px-8 md:px-16 pb-32 mt-20">
                <h2 className="text-3xl font-medium mb-6">Continue Reading</h2>
                <div className="w-full h-64 bg-gray-200 rounded-2xl animate-pulse"></div>
            </section>
        </main>
    );
}