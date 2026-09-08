import CarouselSection from "@/components/blogs/CarouselSection";
import Footers from "@/components/Footers";
import { getMetadata } from "@/data/metadata";
import { getPosts } from "@/lib/wordpress";

export const metadata = getMetadata("blogs");

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "WebSite",
        "@id": "https://www.kalolwala.com/",
        name: "Kalolwala & Associates",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Thing",
        "@id": "https://www.kalolwala.com/blogs",
        name: "Blogs",
      },
    },
  ],
};

const Blogs = async () => {
  const wordpressPosts = await getPosts();

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <CarouselSection wordpressPosts={wordpressPosts} />

      <div className="marginal">
        <Footers
          nextPageName="Careers"
          nextPageLink="/careers"
        />
      </div>
    </div>
  );
};

export default Blogs;