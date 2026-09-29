import CarouselSection from "@/components/blogs/CarouselSection";
import Footers from "@/components/Footers";
import { getMetadata } from "@/data/metadata";
import { getLocalBlogCards, calculateReadingTime, type BlogPostCard } from "@/data/blogs";
import { getPosts } from "@/lib/wordpress";

export const metadata = getMetadata("blogs");
export const revalidate = 600;

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
  const localCards = getLocalBlogCards();

  let wpCards: BlogPostCard[] = [];
  try {
    const wordpressPosts = await getPosts();
    wpCards = (wordpressPosts || [])
      .filter((post: { status?: string }) => post.status === "publish")
      .map((post: {
        id: number;
        title: { rendered: string };
        slug: string;
        content?: { rendered?: string };
        excerpt?: { rendered?: string };
        date: string;
        _embedded?: {
          "wp:featuredmedia"?: Array<{
            source_url?: string;
            alt_text?: string;
            media_details?: {
              sizes?: {
                medium_large?: { source_url?: string };
                medium?: { source_url?: string };
                large?: { source_url?: string };
                thumbnail?: { source_url?: string };
                full?: { source_url?: string };
                [key: string]: { source_url?: string } | undefined;
              };
            };
          }>;
          author?: Array<{ name?: string }>;
        };
      }) => {
        const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0];
        const image =
          featuredMedia?.media_details?.sizes?.medium_large?.source_url ||
          featuredMedia?.media_details?.sizes?.medium?.source_url ||
          featuredMedia?.media_details?.sizes?.large?.source_url ||
          featuredMedia?.media_details?.sizes?.thumbnail?.source_url ||
          featuredMedia?.source_url ||
          "";

        const excerpt = post.excerpt?.rendered
          ? post.excerpt.rendered.replace(/<[^>]*>/g, "").trim()
          : "";

        return {
          id: String(post.id),
          source: "cms" as const,
          title: post.title.rendered,
          metaTitle: post.title.rendered,
          slug: post.slug,
          excerpt,
          date: new Date(post.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          url: "",
          image,
          imageAlt: featuredMedia?.alt_text || post.title.rendered,
          author: post._embedded?.author?.[0]?.name || "K&A Editorial",
          readingTime: calculateReadingTime(post.content?.rendered || excerpt),
        };
      });
  } catch (err) {
    console.error("Error preparing WordPress blog cards:", err);
  }

  // Pre-sort all cards chronologically on the server to prevent client-side render lag
  const allCards: BlogPostCard[] = [...localCards, ...wpCards].sort((a, b) => {
    const timeA = Date.parse(a.date) || new Date(a.date).getTime() || 0;
    const timeB = Date.parse(b.date) || new Date(b.date).getTime() || 0;
    return timeB - timeA;
  });

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <CarouselSection initialCards={allCards} />

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