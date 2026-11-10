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
        title: 'About Kalolwala & Associates | Annual Report Agency',
        description:
            'K&A is India\'s largest independent stakeholder communication consultancy: 10+ years, 120+ specialists and 300+ clients served in FY25.',
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
    video: {
        title: 'Corporate Film & Video Production Agency | K&A',
        description:
            'K&A creates corporate films and annual report video using strategic storytelling, motion graphics, cinematic visuals and authentic voiceovers.',
        canonical: '/offerings/video',
    },
    iar:{
        title:'Integrated Annual Reporting Services India | K&A',
        description:'K&A delivers integrated annual reporting services in India that combine financial, ESG and stakeholder insights with clear, engaging report design.',
        canonical:'/offerings/integrated-annual-reporting'
    },
    esg:{
        title:'Sustainability & ESG Reporting Services India | K&A',
        description:'K&A provides sustainability and ESG reporting services in India, helping companies communicate their environmental, social and governance performance effectively.',
        canonical:'/offerings/sustainability-esg-reporting'
    },
    investor:{
        title:'Investor & Corporate Presentation Design Services | K&A',
        description:'K&A helps companies draft corporate and investor presentations that turn complex information into clear, compelling visuals for investors and larger stakeholders.',
        canonical:'/offerings/investor-corporate-presentations'
    },
    design:{
        title:'Corporate Brand Identity Design Agency | K&A',
        description:'K&A is a corporate brand identity design agency creating distinctive creatives through strategy, visual identity and storytelling.',
        canonical:'/offerings/corporate-branding-design'
    },
    
    digital:{
        title:'Corporate Website & Microsite for Annual Report | K&A',
        description:'Build secure, scalable corporate websites, annual report microsite and digital solutions with K&A. We combine robust development, UX, AI and new-age technology.',
        canonical:'/offerings/corporate-websites'
    },
    granules:{
        title: "Granules India Integrated Annual Report | K&A Case Study",
  description:
    "How K&A shaped the integrated annual report for Granules India: the narrative, structure and design choices behind it. Read the case study.",
        canonical:'/offerings/case-studies/iar/granules'
    },
    solar:{
        title: "Integrated Annual Report Case Study | K&A Case Study",
  description:
    "How K&A shaped the integrated annual report: the narrative, structure and design choices behind it. Read the case study.",
        canonical:'/offerings/case-studies/iar/solar'
    },
    gulfOil:{
         title: "Gulf Oil Integrated Annual Report | K&A Case Study",
  description:
    "How K&A shaped the integrated annual report for Gulf Oil: the narrative, structure and design choices behind it. Read the case study.",
        canonical:'/offerings/case-studies/iar/gulf-oil'
    }

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
