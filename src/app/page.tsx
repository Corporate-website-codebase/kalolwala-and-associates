import Hero from "@/Home/Hero";
import Discover from "@/Home/Discover";
import Locations from "@/Home/Locations";
import Services from "@/Home/Services";
import StatsTop from "@/Home/StatsTop";
import Portfolio from "@/Home/Portfolio";
import Footers from "@/components/Footers";
import Stats from "@/Home/Stats";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://kalolwala.com/#organization",
  name: "Kalolwala and Associates",
  url: "https://kalolwala.com",
  logo: "https://k-and-a-assets.s3.ap-south-1.amazonaws.com/kna-logo.jpeg",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-33-4007-7794",
    contactType: "customer service",
  },
  sameAs: [
    "https://in.linkedin.com/company/kalolwala-associates-private-limited",
    "https://www.instagram.com/kalolwalaassociates/?hl=en",
    "https://www.facebook.com/kalolwalaassociates/",
    "https://x.com/KalolwalaAssoc",
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://kalolwala.com/#localbusiness-kolkata",
  name: "Kalolwala and Associates - Kolkata",
  url: "https://kalolwala.com",
  parentOrganization: {
    "@id": "https://kalolwala.com/#organization",
  },
  telephone: "+91-33-4007-7794",
  address: {
    "@type": "PostalAddress",
    streetAddress: "33K, Tiljala",
    addressLocality: "Kolkata",
    addressRegion: "West Bengal",
    postalCode: "700039",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 22.52858688286508,
    longitude: 88.37952498368794,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "10:00",
      closes: "18:00",
    },
  ],
  hasMap: "https://www.google.com/maps?q=22.52858688286508,88.37952498368794",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <Hero />
      <Discover />
      <Locations />
      <Portfolio />
      <div className="marginal">
        <Services />
      </div>
      <StatsTop />
      <div className="marginal">
        <Stats />
        {/* <Founders /> */}
        <Footers nextPageName="Culture" nextPageLink="/culture" />
      </div>
    </>
  );
}
