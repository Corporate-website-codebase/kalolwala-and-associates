import LetsTalk from "@/components/contact/LetsTalk";
import Footers from "@/components/Footers";
import "leaflet/dist/leaflet.css";
import { getMetadata } from "@/data/metadata";

export const metadata = getMetadata("contact");

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
        "@id": "https://www.kalolwala.com/contact",
        "name": "Contact"
      }
    }
  ]
};

const Contact = () => {

    return (
            <div>
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
                />
                <LetsTalk/>
        <Footers nextPageName="Home" nextPageLink="/" />
            </div>
    );
};

export default Contact;