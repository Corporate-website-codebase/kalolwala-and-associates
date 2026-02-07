import type { Metadata } from "next";
import { CANONICALS, PAGE_TITLES, PAGE_DESCRIPTIONS } from "@/constants/seo";
import BenchmarkSection from "@/components/about/BenchmarkSection";
import CapabilityCards from "@/components/about/CapabilityCards";
import Header from "@/components/about/Header";
import ImpactBanner from "@/components/about/ImpactBanner";
import SlowMarquee from "@/components/about/SlowMarquee";
import SuccessStoriesSlider from "@/components/about/VerticalSuccessStories";
import Footers from "@/components/Footers";
import { marqueeImages } from "@/components/marquee-images";
import Founders from "@/Home/Founders";

export const metadata: Metadata = {
  title: PAGE_TITLES.about,
  description: PAGE_DESCRIPTIONS.about,
  alternates: {
    canonical: CANONICALS.about,
  },
};

const storiesList = [
  {
    id: 1,
    image: "/images/about/awards/kaleido.webp",
    title: "Kaleido Awards 2025",
    subtitle: "",
    footer: "Kalolwala & Associates Private Limited",
    link: "https://example.com/story-1",
  },
  {
    id: 2,
    image: "/images/about/awards/aster.webp",
    title: "2025 Spotlight Awards",
    subtitle: "LACP Awards",
    footer: "Aster DM Healthcare Limited",
    link: "https://example.com/story-1",
  },
    {
    id: 3,
    image: "/images/about/awards/pds.webp",
    title: "2025 Spotlight Awards",
    subtitle: "LACP Awards",
    footer: "PDS Limited",
    link: "https://example.com/story-3",
  },
  {
    id: 4,
    image: "/images/about/awards/federal_bank.webp",
    title: "2025 Spotlight Awards",
    subtitle: "LACP Awards",
    footer: "Federal Bank Limited",
    link: "https://example.com/story-3",
  },
  {
    id: 5,
    image: "/images/about/awards/indiamart.webp",
    title: "2025 Spotlight Awards",
    subtitle: "LACP Awards",
    footer: "IndiaMART InterMESH Limited",
    link: "https://example.com/story-3",
  },
  {
    id: 6,
    image: "/images/about/awards/marico.webp",
    title: "2023 Vision Awards",
    subtitle: "LACP Awards",
    footer: "Marico Limited",
    link: "https://example.com/story-3",
  },
  {
    id: 7,
    image: "/images/about/awards/birlasoft.webp",
    title: "Vision Awards 2022-23",
    subtitle: "LACP Awards",
    footer: "Birlasoft Limited",
    link: "https://example.com/story-2",
  },
  {
    id: 8,
    image: "/images/about/awards/jubilant.webp",
    title: "Spotlight Awards 2022-23",
    subtitle: "LACP Awards",
    footer: "Jubilant Foodworks Limited",
    link: "https://example.com/story-3",
  },
  
  {
    id: 9,
    image: "/images/about/awards/tasty_bite.webp",
    title: "Vision Awards 2021-22",
    subtitle: "LACP Awards",
    footer: "Tasty Bite",
    link: "https://example.com/story-3",
  },
  // add more...
];
const AboutUs = () => {

  return (
    <div>
      <div className="marginal">
        <ImpactBanner/>
        <Header />
        <CapabilityCards />
        <BenchmarkSection />
        <SlowMarquee duration={50} />
        <Founders/>
      </div>
      <SuccessStoriesSlider stories={storiesList} />
      <div className="marginal">
        <Footers nextPageName="Contact" nextPageLink="/contact" />
      </div>
    </div>
  );
};

export default AboutUs;