import Footers from "@/components/Footers";
import Header from "@/components/services/Header";
import { HorizontalScroll } from "@/components/services/HorizontalScroll";
import ImpactSection from "@/components/services/ImpactSection";
import { getMetadata } from "@/data/metadata";

export const metadata = getMetadata("offerings");

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
        "@id": "https://www.kalolwala.com/offerings",
        "name": "Offerings"
      }
    }
  ]
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": "https://www.kalolwala.com/offerings/#services",
  "name": "Service Offerings by Kalolwala and Associates",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Service",
        "@id": "https://www.kalolwala.com/offerings/#annual-reporting",
        "name": "Annual and Integrated Reporting",
        "provider": {
          "@id": "https://kalolwala.com/#organization"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Service",
        "@id": "https://www.kalolwala.com/offerings/#esg-reporting",
        "name": "Sustainability and ESG Reporting",
        "provider": {
          "@id": "https://kalolwala.com/#organization"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "Service",
        "@id": "https://www.kalolwala.com/offerings/#corporate-presentations",
        "name": "Corporate Presentations and Communication Collaterals",
        "provider": {
          "@id": "https://kalolwala.com/#organization"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 4,
      "item": {
        "@type": "Service",
        "name": "Branding and Design Services",
        "provider": {
          "@id": "https://kalolwala.com/#organization"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 5,
      "item": {
        "@type": "Service",
        "name": "Digital Communication Solutions",
        "provider": {
          "@id": "https://kalolwala.com/#organization"
        }
      }
    }
  ]
};

const Services = () => {

    return (
        <div>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <Header />
            <HorizontalScroll />
            <ImpactSection />
            <div className="marginal">
                <Footers nextPageName="About Us" nextPageLink="/about" />
            </div>
        </div>
    );
};

export default Services;