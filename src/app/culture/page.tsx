import Zoomer from "@/components/zoomer";
import TeamSection from "@/components/culture/TeamSection/page";
import Footers from "@/components/Footers";
import { getMetadata } from "@/data/metadata";

export const metadata = getMetadata("culture");

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
        "@id": "https://www.kalolwala.com/culture",
        "name": "Culture"
      }
    }
  ]
};

export default function CulturePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* <Header/> */}
      <Zoomer />
      <TeamSection/>
      <Footers nextPageName="Offerings" nextPageLink="/offerings" />
    </>
  );
}
