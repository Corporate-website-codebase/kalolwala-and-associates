import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  BLOG_DATA,
  getBlogBySlug,
  type BlogPost,
} from "@/data/blogs";
import BlogDetailPage from "@/components/blogs/BlogDetailPage";
import Footers from "@/components/Footers";
import { getPosts } from "@/lib/wordpress";

type WordPressPost = {
  id: number;
  date: string;
  modified: string;
  slug: string;
  status: string;

  title: {
    rendered: string;
  };

  content: {
    rendered: string;
  };

  excerpt: {
    rendered: string;
  };

  _embedded?: {
    author?: Array<{
      id: number;
      name: string;
    }>;

    "wp:featuredmedia"?: Array<{
      source_url?: string;
      alt_text?: string;
      media_details?: {
        sizes?: {
          large?: {
            source_url?: string;
          };
          medium_large?: {
            source_url?: string;
          };
          full?: {
            source_url?: string;
          };
        };
      };
    }>;
  };
};

export async function generateStaticParams() {
  return BLOG_DATA.filter((post) => post.slug).map((post) => ({
    slug: post.slug!,
  }));
}

export const dynamicParams = true;

type Props = {
  params: Promise<{ slug: string }>;
};

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  /*
   * Check existing local blogs first
   */
  const localPost = getBlogBySlug(slug);

  if (localPost) {
    return {
      title: localPost.metaTitle || localPost.title,
      description: localPost.excerpt,
      alternates: {
        canonical: `/blogs/${slug}`,
      },
    };
  }

  /*
   * Check WordPress
   */
  const wordpressPosts: WordPressPost[] = await getPosts();

  const wordpressPost = wordpressPosts.find(
    (post) => post.slug === slug,
  );

  if (!wordpressPost) {
    return {
      title: "Blog Not Found | K&A",
    };
  }

  const blogTitle = wordpressPost.title.rendered;

  const blogDescription = wordpressPost.excerpt.rendered
    .replace(/<[^>]*>/g, "")
    .trim();

  const blogUrl = `https://www.kalolwala.com/blogs/${slug}`;

  const blogImage =
    wordpressPost._embedded?.["wp:featuredmedia"]?.[0]
      ?.source_url;

  return {
    title: blogTitle,
    description: blogDescription,

    robots: {
      index: true,
      follow: true,
    },

    alternates: {
      canonical: blogUrl,
    },

    openGraph: {
      title: blogTitle,
      description: blogDescription,
      url: blogUrl,
      siteName: "Kalolwala & Associates",
      type: "article",

      ...(blogImage
        ? {
            images: [
              {
                url: blogImage,
                alt: blogTitle,
              },
            ],
          }
        : {}),
    },

    twitter: {
      card: "summary_large_image",
      title: blogTitle,
      description: blogDescription,

      ...(blogImage
        ? {
            images: [blogImage],
          }
        : {}),
    },
  };
}

/* =========================================================
   PAGE
========================================================= */

export default async function BlogPostPage({
  params,
}: Props) {
  const { slug } = await params;

  /*
   * ========================================================
   * 1. CHECK LOCAL / HARDCODED BLOGS FIRST
   * ========================================================
   */

  const localPost = getBlogBySlug(slug);

  if (localPost && localPost.content) {
    return (
      <>
        <BlogDetailPage
          key={localPost.id}
          post={localPost}
        />

        <Footers
          nextPageName="Careers"
          nextPageLink="/careers"
        />
      </>
    );
  }

  /*
   * ========================================================
   * 2. GET WORDPRESS POSTS
   * ========================================================
   */

  const wordpressPosts: WordPressPost[] = await getPosts();

  /*
   * Find the current WordPress article
   */
  const wordpressPost = wordpressPosts.find(
    (post) => post.slug === slug,
  );

  if (!wordpressPost) {
    notFound();
  }

  /*
   * ========================================================
   * 3. CONVERT ALL WORDPRESS POSTS TO BLOGPOST STRUCTURE
   *
   * IMPORTANT:
   * We do this because BlogDetailPage expects:
   *
   * title: string
   *
   * NOT:
   *
   * title: { rendered: string }
   * ========================================================
   */

  const wordpressBlogs: BlogPost[] = wordpressPosts
    .filter((post) => post.status === "publish")
    .map((post) => {
      const featuredMedia =
        post._embedded?.["wp:featuredmedia"]?.[0];

      const image =
        featuredMedia?.media_details?.sizes?.large
          ?.source_url ||
        featuredMedia?.media_details?.sizes
          ?.medium_large?.source_url ||
        featuredMedia?.media_details?.sizes?.full
          ?.source_url ||
        featuredMedia?.source_url ||
        "";

      return {
        id: String(post.id),

        source: "cms",

        title: post.title.rendered,

        metaTitle: post.title.rendered,

        slug: post.slug,

        content: post.content.rendered,

        excerpt: post.excerpt.rendered
          .replace(/<[^>]*>/g, "")
          .trim(),

        date: new Date(
          post.date,
        ).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),

        url: "",

        image,

        imageAlt:
          featuredMedia?.alt_text ||
          post.title.rendered,

        author:
          post._embedded?.author?.[0]?.name || "",
      };
    });

  /*
   * ========================================================
   * 4. CURRENT WORDPRESS BLOG
   * ========================================================
   */

  const wordpressBlog = wordpressBlogs.find(
    (blog) => blog.slug === wordpressPost.slug,
  );

  /*
   * This should normally never happen, but keeps the page
   * safe if the current post wasn't included in the mapped
   * published posts.
   */
  if (!wordpressBlog) {
    notFound();
  }

  /*
   * ========================================================
   * 5. RENDER
   *
   * wordpressBlogs is now safe to pass to BlogDetailPage.
   *
   * The More Articles sidebar can therefore use BOTH:
   *
   * - BLOG_DATA
   * - WordPress CMS articles
   * ========================================================
   */

  return (
    <>
      <BlogDetailPage
        key={wordpressBlog.id}
        post={wordpressBlog}
        wordpressPosts={wordpressBlogs}
      />

      <Footers
        nextPageName="Careers"
        nextPageLink="/careers"
      />
    </>
  );
}