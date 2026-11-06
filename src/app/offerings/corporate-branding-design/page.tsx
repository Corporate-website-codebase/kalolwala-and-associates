"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServicePillars from "@/components/services/ServicePillars";
import ServiceHeader from "@/components/services/ServiceHeader"; // Adjust path if needed
import OneTeamStatement, {
  TextSegment,
} from "@/components/services/OneTeamStatement";
import ImpactStats, { StatCard } from "@/components/services/ImpactStats";
import WorkCards from "@/components/services/WorkCards";
import LogoMarquee from "@/components/services/LogoMarquee";
import Footers from "@/components/Footers";
import StackNav from "@/components/StackNav";

const URL_MAPPING: Record<string, string> = {
  video: "/offerings/corporate-films-video-reports",
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
  { label: "Investor & Corporate Presentations", key: "presentations" },
  //   { label: "Corporate Branding & Design", key: "branding" },
  { label: "Corporate Films & Video Reports", key: "video" },
  { label: "Software & Digital Solutions", key: "web" },
];

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function IntegratedReportPage() {
  const irPillarsData = [
    {
      id: "1",
      number: "01",
      title: "Brand strategy, positioning and brand architecture",
      imageUrl: "/images/offerings/iar/pillars/Content.webp",
    },
    {
      id: "2",
      number: "02",
      title: "Logo and visual identity systems",
      imageUrl: "/images/offerings/iar/pillars/ESG.webp",
    },
    {
      id: "3",
      number: "03",
      title: "Verbal identity, tone of voice and messaging frameworks",
      imageUrl: "/images/offerings/iar/pillars/Contemporary.webp",
    },
    {
      id: "4",
      number: "04",
      title: "Brand guidelines, digital and print",
      imageUrl: "/images/offerings/iar/pillars/Statutory.webp",
    },
    {
      id: "5",
      number: "05",
      title:
        "Corporate collateral: brochures, corporate profiles, stationery and presentation templates",
      imageUrl: "/images/offerings/iar/pillars/Project.webp",
    },
    {
      id: "6",
      number: "06",
      title: "Annual report and investor communication design systems",
      imageUrl: "/images/offerings/iar/pillars/Digital.webp",
    },
    {
      id: "7",
      number: "07",
      title: "Website and digital interface design",
      imageUrl: "/images/offerings/iar/pillars/Digital.webp",
    },
    {
      id: "8",
      number: "08",
      title: "Brand campaigns, launch and employer branding",
      imageUrl: "/images/offerings/iar/pillars/Digital.webp",
    },
    {
      id: "9",
      number: "09",
      title:
        "Rebranding and brand refresh programmes, including rollout planning",
      imageUrl: "/images/offerings/iar/pillars/Digital.webp",
    },
    // { id: '10', number: '10', title: 'Sustainability journey video', imageUrl: '/images/offerings/iar/pillars/Digital.webp' },
  ];

  const irFaqsData = [
    {
      id: "faq-1",
      question: "What branding and design services does K&A offer?",
      link: "/faqs#what-branding-and-design-services-does-ka-offer",
    },
    {
      id: "faq-2",
      question: "How is a corporate brand different from a consumer brand?",
      link: "/faqs#how-is-a-corporate-brand-different-from-a-consumer-brand",
    },
    {
      id: "faq-3",
      question: "Does K&A create brand strategy or only visual design?",
      link: "/faqs#does-ka-create-brand-strategy-or-only-visual-design",
    },
    {
      id: "faq-4",
      question: "Can K&A manage a complete rebrand?",
      link: "/faqs#can-ka-manage-a-complete-rebrand",
    },
    {
      id: "faq-5",
      question:
        "Does K&A design annual reports in line with a company’s brand?",
      link: "/faqs#does-ka-design-annual-reports-in-line-with-a-company-s-brand",
    },
    // { id: 'faq-6', question: 'Can K&A build templates our internal team can use?', link: '/faqs#can-ka-build-templates-our-internal-team-can-use' },
  ];

  const teamParagraph: TextSegment[] = [
    {
      text: "that says something about who you are, not only how you look. Your leadership gets a brand that reflects the strategy and the investment story. Your teams get tools and templates they can use confidently without waiting on an agency. And your stakeholders, from investors to employees to customers, recognise the same organisation in every annual report, presentation, website and campaign they encounter.",
      isBold: false,
    },
    // { text: "CEO letter,", isBold: true },
    // { text: "structure the", isBold: false },
    // { text: "value creation model,", isBold: true },
    // { text: "draft the", isBold: false },
    // { text: "BRSR narrative", isBold: true },
    // { text: "and make sure every number across the report makes sense.", isBold: false },
  ];

  const statsData: StatCard[] = [
    {
      id: "1",
      value: "[XX]",
      label: "Team of design graduates who master the creatives",
      barColor: "#B68B4A",
    },
    {
      id: "2",
      value: "100+",
      label: "brand identity and collaterals for branding delivered",
      barColor: "#A45D9F",
    },
    {
      id: "3",
      value: "Brand",
      label:
        "work spanning corporate, consumer, healthcare, industrial and financial services sectors",
      barColor: "#58C3F0",
    },
    {
      id: "4",
      value: "Identity",
      label:
        "systems that extend into annual reports, investor presentations and sustainability reports produced by the same team",
      barColor: "#EB4C88",
    },
  ];

  const caseStudies = [
    {
      id: "1",
      title: "GlaxoSmithKline Pharmaceuticals Limited (Coffee Table Book)",

      imageUrl: "/images/offerings/branding/GSK.jpg",
      link: "/docs/offerings/branding/GSK Coffee table book.pdf",
    },
    {
      id: "2",
      title: "Shelf Drilling Holdings Limited",

      imageUrl: "/images/offerings/branding/ShelfDrilling.jpg",
      link: "",
    },
    {
      id: "3",
      title: "Alfred Engineering Industries",

      imageUrl: "/images/offerings/branding/Alfred.jpg",
      link: "",
    },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const yellowTwinRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !yellowTwinRef.current ||
      !videoContainerRef.current
    )
      return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        end: "center 50%",
        scrub: 1,
        onEnter: () => {
          videoRef.current?.play();
        },
      },
    });

    tl.fromTo(
      yellowTwinRef.current,
      { clipPath: "inset(5% 10% 15% 10% round 24px)" },
      { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "power2.out" },
      0,
    );

    tl.fromTo(
      videoContainerRef.current,
      { clipPath: "inset(15% 10% 5% 10% round 24px)" },
      { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "power2.out" },
      0,
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
              Branding <br className="hidden md:block" />
              and Design
            </>
          }
          description="A corporate identity should do more than look distinctive. It should give an organisation a recognisable point of view and make that character visible wherever the brand meets its stakeholders, from the annual report on an investor’s desk to the website a job applicant visits and the signage a customer walks past."
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
        headline="Building brands with a distinctive identity "
        description="We build distinctive brand identity systems for listed companies, growing businesses and institutions, integrating brand strategy, verbal identity, visual language and application. From identity architecture and guidelines to corporate collateral, digital interfaces and campaigns, we create cohesive systems that translate brand positioning into a consistent presence across touchpoints.

                Our work goes beyond defining an identity to ensuring its effective application. We bring the system to life across real-world contexts and equip teams with the tools to sustain consistency as the business evolves. The result is an identity that is distinctive, coherent and built to scale."
        pillars={irPillarsData}
                header='What we create'

      />

      <OneTeamStatement
        subtitle="What this means for our clients"
        mainTitle="an identity"
        outerImage="/images/offerings/branding/outer-img.jpg"
        innerImage="/images/offerings/branding/inner-img.jpg"
        paragraphSegments={teamParagraph}
      />

      {/* The stats grid below it */}
      <ImpactStats stats={statsData} />

      {/* <WorkCards works={caseStudies} /> */}

      <LogoMarquee />

      <div className=" bg-[#e2e2e2]">
        <StackNav stack={stackForThisPage} urlMapping={URL_MAPPING} />
      </div>

      {/* Additional content */}
      {/* <section className="max-w-[1440px] mx-auto px-8 md:px-16 pb-32 mt-20">
                <h2 className="text-3xl font-medium mb-6">Continue Reading</h2>
                <div className="w-full h-64 bg-gray-200 rounded-2xl animate-pulse"></div>
            </section> */}
      <div className="">
        <Footers nextPageName="Case Studies - Integrated Reports" nextPageLink="/case-studies/integrated-reports" />
      </div>
    </main>
  );
}
