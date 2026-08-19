import { notFound } from "next/navigation";
import ReportShowcase from "@/components/services/ReportShowcase";
import { PAYLOADS, SLUG_TO_KEY_MAPPING } from "@/data/payloads";
import { getBreadcrumbSchema, getServiceSchema } from "@/data/schema";
import { Metadata } from "next";

// Force static generation for known paths (optional but good for SEO)
export function generateStaticParams() {
  return Object.keys(SLUG_TO_KEY_MAPPING).map((slug) => ({
    slug,
  }));
}

export const dynamicParams = true;

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
    notFound();
  }

  const payload = PAYLOADS[key];

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Offerings", url: "/offerings" },
    { name: payload.title || slug },
  ]);

  const serviceSchema = getServiceSchema(slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {serviceSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      )}
      <ReportShowcase {...payload} />
    </>
  );
}
