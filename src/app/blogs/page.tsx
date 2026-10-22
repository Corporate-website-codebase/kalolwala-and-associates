import CarouselSection from "@/components/blogs/CarouselSection";
import Footers from "@/components/Footers";
import { getMetadata } from "@/data/metadata";
import { getLocalBlogCards, calculateReadingTime, normalizeCategory, type BlogPostCard } from "@/data/blogs";
import { getPosts } from "@/lib/wordpress";

export const metadata = getMetadata("blogs");
export const revalidate = 600;

// Curated category overrides from Blog categories.xlsx (Sheet 3)
const EXCEL_SLUG_CATEGORY_MAP: Record<string, string> = {
  "annual-report-cover-design-board-approval": "Corporate Branding & Design",
  "indias-gdp-grew-7-8-but-what-does-that-really-mean": "Stakeholder Communication & Presentations",
  "brsr-core-fy-2026-27-value-chain-reporting": "ESG, BRSR & Sustainability Reporting",
  "scope-1-emissions-india": "ESG, BRSR & Sustainability Reporting",
  "brsr-vs-gri-vs-integrated-reporting": "ESG, BRSR & Sustainability Reporting",
  "sebi-brsr-reporting-format": "ESG, BRSR & Sustainability Reporting",
};

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
          "wp:term"?: Array<Array<{ taxonomy?: string; name?: string }>>;
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

        // Determine category: Priority 1: Curated override from Excel, Priority 2: WordPress embedded category term
        let rawCategory = EXCEL_SLUG_CATEGORY_MAP[post.slug] || "";
        if (!rawCategory) {
          const terms = post._embedded?.["wp:term"] || [];
          for (const termGroup of terms) {
            if (Array.isArray(termGroup)) {
              const catTerm = termGroup.find(
                (t) => t.taxonomy === "category" && t.name && t.name.toLowerCase() !== "uncategorized"
              );
              if (catTerm?.name) {
                rawCategory = catTerm.name;
                break;
              }
            }
          }
        }
        const category = normalizeCategory(rawCategory || "ESG, BRSR & Sustainability Reporting");

        return {
          id: String(post.id),
          source: "cms" as const,
          category,
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