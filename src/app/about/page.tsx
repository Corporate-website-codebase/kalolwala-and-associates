import BenchmarkSection from "@/components/about/BenchmarkSection";
import CapabilityCards from "@/components/about/CapabilityCards";
import Header from "@/components/about/Header";
import ImpactBanner from "@/components/about/ImpactBanner";
import SlowMarquee from "@/components/about/SlowMarquee";
import SuccessStoriesSlider from "@/components/about/VerticalSuccessStories";
import Footers from "@/components/Footers";
import { marqueeImages } from "@/components/marquee-images";
import Founders from "@/Home/Founders";
import { getMetadata } from "@/data/metadata";

export const metadata = getMetadata("about");

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "WebSite",
        "@id": "https://www.kalolwala.com/",
        "name": "Kalolwala & Associates"
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Thing",
        "@id": "https://www.kalolwala.com/about",
        "name": "About Us"
      }
    }
  ]
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
  // add more....
];
const AboutUs = () => {

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
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
        <Footers nextPageName="Blogs" nextPageLink="/blogs" />
      </div>
    </div>
  );
};

export default AboutUs;