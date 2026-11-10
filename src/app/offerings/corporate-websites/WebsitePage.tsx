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
import WorkCards, { WorkTab } from "@/components/services/WorkCards";
import LogoMarquee from "@/components/services/LogoMarquee";
import Footers from "@/components/Footers";
import StackNav from "@/components/StackNav";




const rawCardsData = [
  {
    title: "Marico Limited",
    imageUrl: "/images/offerings/web/Marico-banner.webp", // Note: Ensure key is 'imageUrl' to match the component interface
    subtitle: "DISCOVER MORE",
    link: "https://marico.com/",
    type: "corporate-websites",
  },
  {
    title: "Solar Group",
    imageUrl: "/images/offerings/web/Solar.jpg",
    subtitle: "DISCOVER MORE",
    link: "https://solargroup.com/",
    type: "corporate-websites",
  },
  {
    title: "Pitti Engineering Limited",
    imageUrl: "/images/offerings/web/PITTI.jpg",
    subtitle: "DISCOVER MORE",
    link: "https://www.pitti.in/",
    type: "corporate-websites",
  },
  // {
  //   title: "Ekkaa Electronics Industries Pvt. Ltd",
  //   imageUrl: "/images/offerings/web/ekkaa.jpg",
  //   subtitle: "DISCOVER MORE",
  //   link: "https://ekkaa.com/",
  //   type: "corporate-websites",
  // },
  // {
  //   title: "Rajratan Global Wire Limited",
  //   imageUrl: "/images/offerings/web/sustainablity-tools/Raj_Ratan.webp",
  //   subtitle: "DISCOVER MORE",
  //   link: "https://rajratan.co.in/",
  //   type: "corporate-websites",
  // },
  // {
  //   title: "sbkgropes",
  //   imageUrl: "/images/offerings/web/SBKG.png",
  //   subtitle: "DISCOVER MORE",
  //   link: "https://www.sbkgropes.com/",
  //   type: "corporate-websites",
  // },
  {
    title: "Tata Communications Limited - sustainability",
    imageUrl: "/images/offerings/web/tata communications sustainability.jpg",
    subtitle: "DISCOVER MORE",
    link: "https://sustainability.tatacommunications.com/",
    type: "corporate-microsites",
  },
  {
    title: "Kotak Mahindra Bank Limited",
    imageUrl: "/images/offerings/web/microsite/Kotak.png",
    subtitle: "DISCOVER MORE",
    link: "https://www.kotak.com/bank/mailers/annualreport/",
    type: "corporate-microsites",
  },
  {
    title: "Tata Consumer Products Limited",
    imageUrl: "/images/offerings/web/microsite/Tata_Consumer_Products.png",
    subtitle: "DISCOVER MORE",
    link: "https://www.tataconsumer.com/iar-2024-25/",
    type: "corporate-microsites",
  },
  // {
  //   title: "Indian Oil Corporation Ltd",
  //   imageUrl: "/images/offerings/web/microsite/Indian-oil.png",
  //   subtitle: "DISCOVER MORE",
  //   link: "https://iocl.com/uploads/AnnualReport2024-25/index.html",
  //   type: "corporate-microsites",
  // },
  // {
  //   title: "Gulf Oil Lubricants India Limited",
  //   imageUrl: "/images/offerings/web/microsite/Gulf-oil.png",
  //   subtitle: "DISCOVER MORE",
  //   link: "https://gulf-oil-2025.vercel.app/",
  //   type: "corporate-microsites",
  // },
  // {
  //   title: "LT Foods Ltd",
  //   imageUrl: "/images/offerings/web/microsite/LT-foods.png",
  //   subtitle: "DISCOVER MORE",
  //   link: "https://ltf.ltfoods.com/",
  //   type: "corporate-microsites",
  // },
  // {
  //   title: "Business reliablity & sustainability report (BRSR)",
  //   imageUrl: "/images/offerings/web/sustainablity-tools/BRSR.png",
  //   subtitle: "DISCOVER MORE",
  //   link: "https://brsr.kalolwala.com/",
  //   type: "sustainability-tools",
  // },
];

// Group them into the tabs array
const webTabsData: WorkTab[] = [
  {
    id: "corporate-websites",
    label: "CORPORATE WEBSITES",
    works: rawCardsData.filter(card => card.type === "corporate-websites").map(card => ({
        id: card.title, // using title as unique ID, or add genuine IDs
        title: card.title,
        imageUrl: card.imageUrl,
        link: card.link,
        subtitle: card.subtitle
    }))
  },
  {
    id: "corporate-microsites",
    label: "ANNUAL REPORT MICROSITES",
    works: rawCardsData.filter(card => card.type === "corporate-microsites").map(card => ({
        id: card.title,
        title: card.title,
        imageUrl: card.imageUrl,
        link: card.link,
        subtitle: card.subtitle
    }))
  },
  // {
  //   id: "sustainability-tools",
  //   label: "SUSTAINABILITY TOOLS",
  //   works: rawCardsData.filter(card => card.type === "sustainability-tools").map(card => ({
  //       id: card.title,
  //       title: card.title,
  //       imageUrl: card.imageUrl,
  //       link: card.link,
  //       subtitle: card.subtitle
  //   }))
  // }
];

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
  { label: "Corporate Films & Video Reports", key: "video" },
//   { label: "Software & Digital Solutions", key: "web" },
];

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WebsitePage() {
  const irPillarsData = [
    {
      id: "1",
      number: "01",
      title: "Corporate websites and redesigns",
      imageUrl: "/images/offerings/iar/pillars/Content.webp",
    },
    {
      id: "2",
      number: "02",
      title: "Investor relations sections and portals",
      imageUrl: "/images/offerings/iar/pillars/ESG.webp",
    },
    {
      id: "3",
      number: "03",
      title: "Interactive annual report and sustainability report microsites",
      imageUrl: "/images/offerings/iar/pillars/Contemporary.webp",
    },
    {
      id: "4",
      number: "04",
      title: "ESG and sustainability data hubs",
      imageUrl: "/images/offerings/iar/pillars/Statutory.webp",
    },
    {
      id: "5",
      number: "05",
      title:
        "Careers and employer brand sites",
      imageUrl: "/images/offerings/iar/pillars/Project.webp",
    },
    {
      id: "6",
      number: "06",
      title: "Campaign and product microsites",
      imageUrl: "/images/offerings/iar/pillars/Digital.webp",
    },
    {
      id: "7",
      number: "07",
      title: "Intranets and internal communication platforms",
      imageUrl: "/images/offerings/iar/pillars/Digital.webp",
    },
    {
      id: "8",
      number: "08",
      title: "Website content, SEO and AI search optimisation",
      imageUrl: "/images/offerings/iar/pillars/Digital.webp",
    },
    {
      id: "9",
      number: "09",
      title:
        "Hosting, maintenance, security and support",
      imageUrl: "/images/offerings/iar/pillars/Digital.webp",
    },
    // { id: '10', number: '10', title: 'Sustainability journey video', imageUrl: '/images/offerings/iar/pillars/Digital.webp' },
  ];

  const irFaqsData = [
    {
      id: "faq-1",
      question: "What digital services does K&A offer?",
      link: "/faqs#what-digital-services-does-ka-offer",
    },
    {
      id: "faq-2",
      question: "What must a listed company’s website include in India?",
      link: "/faqs#what-must-a-listed-companys-website-include-in-india",
    },
    {
      id: "faq-3",
      question: "What is an interactive annual report microsite?",
      link: "/faqs#what-is-an-interactive-annual-report-microsite",
    },
    {
      id: "faq-4",
      question: "How does K&A help companies appear accurately in AI search?",
      link: "/faqs#how-does-ka-help-companies-appear-accurately-in-ai-search",
    },
    {
      id: "faq-5",
      question:
        "Are K&A websites accessible and secure?",
      link: "/faqs#are-ka-websites-accessible-and-secure",
    },
    { id: 'faq-6', question: 'Does K&A maintain websites after launch?', link: '/faqs#does-ka-maintain-websites-after-launch' },
  ];

  const teamParagraph: TextSegment[] = [
    {
      text: "that tells the same story as your annual report, your investor presentations and your brand. Your company secretarial and IR teams can meet disclosure requirements without chasing developers. Your communication team can publish quickly and confidently. And every stakeholder, whether an investor checking results, a journalist researching a story or an AI assistant answering a question about your company, finds clear, accurate and current information.",
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
      // value: "Websites and digital platforms for [x] companies, including some of India’s largest listed companies",
      // label: "",
      value: "70+",
      label: "interactive annual report and sustainability report microsites delivered in last three years",
      barColor: "#B68B4A",
    },
    {
      id: "2",
      // value: "70+",
      // label: "interactive annual report and sustainability report microsites delivered in last three years",
      value: "Ongoing",
      label:
        "support for 12+ corporate websites", 
      barColor: "#A45D9F",
    },
    {
      id: "3",
      value: "Security",
      label:
        "ensured at every layer through continuous monitoring and regular updates.",
      barColor: "#58C3F0",
    },
    {
      id: "4",
      value: "Platforms",
      label:
        "built to WCAG [2.1 / 2.2] AA accessibility standards",
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
      <div className="bg-[#E3E3E3]  pt-20 text-[#1A1A1A] font-sans overflow-x-hidden min-h-screen">
        {/* --- EXTRACTED TOP SECTION --- */}
        <ServiceHeader
          title={
            <>
              Digital Solutions <br className="hidden md:block" />
              {/* and Design */}
            </>
          }
          description="Most digital agencies build the platform and leave the content to the client. We start with the content. Because our team also writes annual reports, sustainability reports and investor presentations, we understand what investors, regulators, employees and customers come to a corporate website to find, and we structure the platform around those needs."
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
        headline="A website is your company’s most visited document. We build it like one.  "
        description="We build digital platforms that bring an organisation’s story, information and brand together in one seamless experience. From corporate websites and investor relations portals to interactive annual report microsites and ESG data hubs, we combine content strategy, UX, UI and full-stack development to create platforms that are intuitive to navigate, engaging to explore and designed around the way stakeholders actually look for information.

Our role continues well beyond launch. From information architecture and development to optimisation, maintenance and ongoing support, we manage the digital experience across its lifecycle, keeping platforms fast, accessible, secure and compliant as audiences, regulations and organisations evolve.
"
        pillars={irPillarsData}
        isTech={true}
      />

      <OneTeamStatement
        subtitle="What this means for our clients"
        mainTitle="a digital presence"
        outerImage="/images/offerings/web/outer-img.png"
        innerImage="/images/offerings/web/inner-img.png"
        paragraphSegments={teamParagraph}
      />

      {/* The stats grid below it */}
      <ImpactStats stats={statsData} />

      {/* <WorkCards 
                isTabbed={true} 
                tabs={webTabsData} 
                isVideo={false} 
            /> */}

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
