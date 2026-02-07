import type { Metadata } from "next";

type PageMetadata = {
  title: string;
  description?: string;
  canonical: string;
};

/**
 * Central metadata config for all static pages.
 * Add/edit page SEO (title, description, canonical) here.
 */
export const PAGE_METADATA: Record<string, PageMetadata> = {
  home: {
    title: "K&A - India’s Largest Stakeholder Communication Agency",
    description:
      "K&A is India’s largest independent stakeholder communication agency, specialising in annual reports, ESG and corporate storytelling.",
    canonical: "/",
  },
  about: {
    title: "About K&A",
    description:
      "Discover K&A’s journey as India’s largest independent stakeholder communication firm, delivering high-impact reporting, design and communication solutions.",
    canonical: "/about",
  },
  careers: {
    title: "Careers | K&A",
    canonical: "/careers",
  },
  contact: {
    title: "Contact Us | K&A",
    canonical: "/contact",
    description:
      "Connect with K&A to explore expert solutions in corporate communication, reporting, ESG, branding and digital engagement.",
  },
  culture: {
    title: "Life & Culture at K&A",
    description:
      "Experience life at K&A, where creativity meets strategy, collaboration sparks innovation and every conversation drives excellence.",
    canonical: "/culture",
  },
  offerings: {
    title: "Explore Our Services | K&A",
    description:
      "Transform how your organisation communicates: K&A delivers expert annual reporting, ESG insights, branding, digital strategies and impactful stakeholder engagement.",
    canonical: "/offerings",
  },
  blogs: {
    title: "Blogs | K&A",
    canonical: "/blogs",
  },
};

export function getMetadata(page: keyof typeof PAGE_METADATA): Metadata {
  const { title, description, canonical } = PAGE_METADATA[page];

  return {
    title,
    ...(description && { description }),
    alternates: {
      canonical,
    },
  };
}
