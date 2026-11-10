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
        title: 'India’s Largest Independent Annual Report Agency | K&A',
        description:
            'K&A is India’s Largest Independent Annual Report Agency, specialising in annual reports, integrated reports, sustainability reports, ESG fact book and more.',
        canonical: '/',
    },
    about: {
        title: 'About Kalolwala & Associates | ESG Advisory & Consulting',
        description:
            'Discover K&A’s journey as India’s largest independent stakeholder communication firm, delivering high-impact reporting, design and communication solutions.',
        canonical: '/about',
    },
    careers: {
        title: 'Careers at Kalolwala & Associates | Join Our Team',
        description:
            'Explore careers at Kalolwala & Associates, grow creatively with roles in business development, research, editorial, design & digital. Apply now to be part of our team.',
        canonical: '/careers',
    },
    contact: {
        title: 'Contact Kalolwala & Associates | Offices Across India',
        canonical: '/contact',
        description:
            'Plan your next annual, ESG or BRSR report, investor presentation or corporate film with K&A. Connect with our teams in Kolkata, Mumbai, Gurugram, Hyderabad and Bengaluru.',
    },
    culture: {
        title: 'Life at Kalolwala & Associates | Culture & Values',
        description:
            'Life at Kalolwala & Associates: how our 120+ team of analysts, designers and strategists work together on annual, ESG and BRSR reports. See what we value.',
        canonical: '/culture',
    },
    offerings: {
        title: 'Corporate Communication | ESG & Sustainability | K&A',
        description:
            'Explore K&A’s corporate communication services, from annual reports and ESG reporting to investor presentations, branding, films and digital solutions.',
        canonical: '/offerings',
    },
    blogs: {
        title: 'Corporate Communication & ESG Reporting Blogs | K&A',
        description:
            'Practical articles on communication, integrated annual reports, BRSR, ESG reporting and other important topics from the Kalolwala & Associates team.',
        canonical: '/blogs',
    },
    faqs: {
        title: 'Annual Report FAQs: Process & Timelines | K&A',
        description:
            'How K&A plans, writes and designs annual, ESG and BRSR reports: timelines, corrections, deliverables, confidentiality and quality checks.',
        canonical: '/faqs',
    },
}

export function getMetadata(page: keyof typeof PAGE_METADATA): Metadata {
    const { title, description, canonical } = PAGE_METADATA[page]
    const siteUrl = process.env.SITE_URL || 'https://www.kalolwala.com'
    const fullCanonical = canonical.startsWith('http') ? canonical : `${siteUrl}${canonical}`
    const cleanTitle = title.replace(/[\u2018\u2019]/g, "'")
    const ogImageUrl = `/api/og.png?title=${encodeURIComponent(cleanTitle)}&path=${encodeURIComponent(canonical)}`

    return {
        title,
        ...(description && { description }),
        alternates: {
            canonical,
        },
        openGraph: {
            title,
            ...(description && { description }),
            url: fullCanonical,
            siteName: 'Kalolwala & Associates',
            type: 'website',
            images: [
                {
                    url: ogImageUrl,
                    type: 'image/png',
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            ...(description && { description }),
            images: [ogImageUrl],
        },
    }
}
