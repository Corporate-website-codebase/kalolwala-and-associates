import { notFound } from "next/navigation";
import { Metadata } from "next";
import { BLOG_DATA, getBlogBySlug } from "@/data/blogs";
import BlogDetailPage from "@/components/blogs/BlogDetailPage";
import Footers from "@/components/Footers";

// Static generation for known slugs
export function generateStaticParams() {
  return BLOG_DATA.filter((post) => post.slug).map((post) => ({
    slug: post.slug!,
  }));
}

export const dynamicParams = true;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    return { title: "Blog Not Found | K&A" };
  }

  return {
    title: `${post.title} | K&A Blogs`,
    description: post.excerpt,
    alternates: {
      canonical: `/blogs/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post || !post.content) {
    notFound();
  }

  return (
    <>
      <BlogDetailPage post={post} />
      <Footers nextPageName="Careers" nextPageLink="/careers" />
    </>
  );
}
