import { notFound, redirect } from "next/navigation";
import ReportShowcase from "@/components/services/ReportShowcase";
import { PAYLOADS, SLUG_TO_KEY_MAPPING } from "@/data/payloads";
import { Metadata } from "next";

// Force static generation for known paths (optional but good for SEO)
export function generateStaticParams() {
  return Object.keys(SLUG_TO_KEY_MAPPING).map((slug) => ({
    slug,
  }));
}

export const dynamicParams = true; // Allow other params if needed (though we likely want 404)

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const key = SLUG_TO_KEY_MAPPING[slug];
  const payload = PAYLOADS[key];

  if (!payload) {
    return {
      title: "Offering Not Found | K&A",
    };
  }

  return {
    title: payload.seo.title,
    description: payload.seo.description,
    alternates: {
      canonical: `/offerings/${slug}`,
    },
  };
}

export default async function OfferingPage({ params }: Props) {
  const { slug } = await params;
  const key = SLUG_TO_KEY_MAPPING[slug];

  if (!key || !PAYLOADS[key]) {
    // If the slug is not found locally, we could redirect to main offerings
    // or return notFound().
    notFound();
  }

  const payload = PAYLOADS[key];

  return <ReportShowcase {...payload} />;
}
