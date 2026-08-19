import type { Metadata } from 'next'

type PageMetadata = {
    title: string
    description?: string
    canonical: string
}

/**
 * Central metadata config for all static pages.
 * Add/edit page SEO (title, description, canonical) here.
 */
export const PAGE_METADATA: Record<string, PageMetadata> = {
    home: {
        title: 'K&A - India’s Largest Stakeholder Communication Agency',
        description:
            'K&A is India’s largest independent stakeholder communication agency, specialising in annual reports, ESG and corporate storytelling.',
        canonical: '/',
    },
    about: {
        title: 'About Kalolwala & Associates | ESG Advisory & Consulting',
        description:
            'Discover K&A’s journey as India’s largest independent stakeholder communication firm, delivering high-impact reporting, design and communication solutions.',
        canonical: '/about',
    },
    careers: {
        title: 'Explore Careers | K&A',
        description:
            'Explore careers at Kalolwala & Associates, grow creatively with roles in business development, research, editorial, design & digital. Apply now to be part of our team.',
        canonical: '/careers',
    },
    contact: {
        title: 'Contact Kalolwala & Associates | ESG Advisory & Consulting',
        canonical: '/contact',
        description:
            'Connect with K&A to explore expert solutions in corporate communication, reporting, ESG, branding and digital engagement.',
    },
    culture: {
        title: 'Culture & Values at Kalolwala & Associates | Our ESG Team',
        description:
            'Experience life at K&A, where creativity meets strategy, collaboration sparks innovation and every conversation drives excellence.',
        canonical: '/culture',
    },
    offerings: {
        title: 'Our Offerings | ESG Advisory & Sustainability | Kalolwala',
        description:
            'Transform how your organisation communicates: K&A delivers expert annual reporting, ESG insights, branding, digital strategies and impactful stakeholder engagement.',
        canonical: '/offerings',
    },
    blogs: {
        title: 'ESG & Sustainability Blog | Insights | Kalolwala & Associates',
        description:
            'Read expert articles on stakeholder communication, ESG, annual reports & corporate storytelling, insights from Kalolwala to inform and inspire your brand strategy.',
        canonical: '/blogs',
    },
    faqs: {
        title: 'FAQs | ESG & Sustainability Consulting | Kalolwala & Associates',
        description:
            'Learn about timelines, reporting process, ESG support, deliverables, and how we ensure confidentiality and quality.',
        canonical: '/faqs',
    },
}

export function getMetadata(page: keyof typeof PAGE_METADATA): Metadata {
    const { title, description, canonical } = PAGE_METADATA[page]

    return {
        title,
        ...(description && { description }),
        alternates: {
            canonical,
        },
    }
}
