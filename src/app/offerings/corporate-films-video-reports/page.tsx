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
    { label: "Corporate Branding & Design", key: "branding" },
//   { label: "Corporate Films & Video Reports", key: "video" },
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
      title: "Corporate and brand films",
      imageUrl: "/images/offerings/iar/pillars/Content.webp",
    },
    {
      id: "2",
      number: "02",
      title: "Video annual reports and annual report highlight films",
      imageUrl: "/images/offerings/iar/pillars/ESG.webp",
    },
    {
      id: "3",
      number: "03",
      title: "Sustainability, ESG and CSR impact films",
      imageUrl: "/images/offerings/iar/pillars/Contemporary.webp",
    },
    {
      id: "4",
      number: "04",
      title: "Chair, CEO and leadership message films",
      imageUrl: "/images/offerings/iar/pillars/Statutory.webp",
    },
    {
      id: "5",
      number: "05",
      title:
        "AGM and investor day films",
      imageUrl: "/images/offerings/iar/pillars/Project.webp",
    },
    {
      id: "6",
      number: "06",
      title: "IPO and corporate milestone films",
      imageUrl: "/images/offerings/iar/pillars/Digital.webp",
    },
    {
      id: "7",
      number: "07",
      title: "Employer brand and culture films",
      imageUrl: "/images/offerings/iar/pillars/Digital.webp",
    },
    {
      id: "8",
      number: "08",
      title: "Explainer and process animations",
      imageUrl: "/images/offerings/iar/pillars/Digital.webp",
    },
    {
      id: "9",
      number: "09",
      title:
        "Event openers and short-form social content",
      imageUrl: "/images/offerings/iar/pillars/Digital.webp",
    },
    // { id: '10', number: '10', title: 'Sustainability journey video', imageUrl: '/images/offerings/iar/pillars/Digital.webp' },
  ];

  const irFaqsData = [
    {
      id: "faq-1",
      question: "What corporate video services does K&A offer?",
      link: "/faqs#what-corporate-video-services-does-ka-offer",
    },
    {
      id: "faq-2",
      question: "What is a video annual report?",
      link: "/faqs#what-is-a-video-annual-report",
    },
    {
      id: "faq-3",
      question: "How does K&A ensure facts in a corporate film are accurate?",
      link: "/faqs#how-does-ka-ensure-facts-in-a-corporate-film-are-accurate",
    },
    {
      id: "faq-4",
      question: "Does K&A use AI in film production?",
      link: "/faqs#does-ka-use-ai-in-film-production",
    },
    {
      id: "faq-5",
      question:
        "Can K&A create ESG and sustainability films?",
      link: "/faqs#can-ka-create-esg-and-sustainability-films",
    },
    { id: 'faq-6', question: 'How long does it take to produce a corporate film?', link: '/faqs#how-long-does-it-take-to-produce-a-corporate-film' },
  ];

  const teamParagraph: TextSegment[] = [
    {
      text: "that tells your story with the substance of a report and the impact of cinema. Your leadership gets a message that is accurate, considered and true to the strategy. Your communication and sustainability teams get content that matches every published figure and claim. And your audiences, from investors and employees to communities and customers, remember what your business stands for long after the film ends.",
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
      value: "7+",
      label: "Corporate films produced till date",
      barColor: "#B68B4A",
    },
    {
      id: "2",
      value: "80+",
      label: "Video annual reports and ESG films produced alongside the same companies’ printed reports",
      barColor: "#A45D9F",
    },
    {
      id: "3",
      value: "6+",
      label:
        "Team of Multilingual experts",
      barColor: "#58C3F0",
    },
    // {
    //   id: "4",
    //   value: "Identity",
    //   label:
    //     "systems that extend into annual reports, investor presentations and sustainability reports produced by the same team",
    //   barColor: "#EB4C88",
    // },
  ];

      
      
      // {
      //   title: "Rajratan Global Wire Ltd",
      //   image: "/images/services/rajratan.png",
      //   subtitle: "DISCOVER MORE",
      //   type: "corporate",
      //   category: "Corporate Film",
      // },
      // {
      //   title: "Teamlease Services Ltd",
      //   image: "/images/services/teamlease.webp",
      //   subtitle: "DISCOVER MORE",
      //   type: "corporate",
      //   category: "Corporate Film",
      // },
      // {
      //   title: "Cipla Ltd",
      //   image: "/images/services/cipla t.png",
      //   subtitle: "DISCOVER MORE",
      //   type: "corporate",
      //   category: "Corporate Film",
      // },
  const caseStudies = [
    {
      id: "1",
        title: "Ekkaa Electronics Industries Pvt Ltd",


      imageUrl: "/images/services/ekkaa.png",
      link: "/docs/offerings/branding/GSK Coffee table book.pdf",
    },
    {
      id: "2",
      title: "INOX GFL",

      imageUrl: "/images/services/inoxgfl.png",
      link: "",
    },
    {
      id: "3",
      title: "Kanpur Plastipack Ltd",

      imageUrl: "/images/services/kpl.webp",
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
              Corporate Films <br className="hidden md:block" />
               and Video Reports
            </>
          }
          description="Corporate films often look impressive and say very little. Ours start with the story the business needs to tell and the audience it needs to reach. Because our writers also work on annual reports, sustainability reports and investor presentations, they understand strategy, financial performance and ESG disclosure, and they write scripts that are as accurate as they are engaging."
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
        headline="Every great film starts with a script that knows the business.  "
        description="The strongest business stories make strategy, performance and purpose clear in moments and memorable for years. Our team brings together filmmakers, writers, motion designers and data visualisation specialists to turn complex corporate narratives, ESG performance and leadership perspectives into films with editorial depth and visual intelligence.

We treat every film as one creative proposition, carried end-to-end: concept, narrative, scripting, production, cinematography, motion design and data visualisation, all shaped into a single visual language. From corporate films to video annual reports, we bring the rigour of boardroom communication to the storytelling power of film.
"
        pillars={irPillarsData}
                header='What we create'

      />

      <OneTeamStatement
        subtitle="What this means for our clients"
        mainTitle="a film"
        outerImage="/images/offerings/video/outer-img.png"
        innerImage="/images/offerings/video/inner-img.png"
        paragraphSegments={teamParagraph}
      />

      {/* The stats grid below it */}
      <ImpactStats gridCols="lg:grid-cols-3" stats={statsData} />

      {/* <WorkCards isVideo={true} works={caseStudies} /> */}

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
