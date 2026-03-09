import Departments from "@/components/careers/Departments";
import Header from "@/components/careers/Header";
import OpenRoles from "@/components/careers/Roles";
import Footers from "@/components/Footers";
import { getMetadata } from "@/data/metadata";

export const metadata = getMetadata("careers");

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
        "@id": "https://www.kalolwala.com/careers",
        "name": "Careers"
      }
    }
  ]
};

const Career = () => {

    return (
        <div className="marginal">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <Header />
            <Departments />
            <OpenRoles />
            <Footers nextPageName="Contact" nextPageLink="/" />
        </div>
    );
};

export default Career;