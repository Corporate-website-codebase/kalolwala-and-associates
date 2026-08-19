/**
 * Centralized JSON-LD Schema definitions for Kalolwala & Associates
 * Derived from official Vendor Schema - K & A and Schema
 */

const BASE_URL = process.env.SITE_URL || 'https://www.kalolwala.com'

export const organizationGraphSchema = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': ['Organization', 'ProfessionalService'],
            '@id': `${BASE_URL}/#organization`,
            name: 'Kalolwala & Associates',
            alternateName: ['K&A', 'Kalolwala and Associates'],
            legalName: 'Kalolwala and Associates Private Limited',
            url: `${BASE_URL}/`,
            logo: {
                '@type': 'ImageObject',
                '@id': `${BASE_URL}/#logo`,
                url: `${BASE_URL}/kna2.svg`,
                width: 512,
                height: 512,
                caption: 'Kalolwala & Associates',
            },
            image: { '@id': `${BASE_URL}/#logo` },
            description:
                'Kalolwala & Associates delivers annual reports, BRSR, ESG reporting, branding, investor communications, and digital solutions for businesses across India.',
            foundingDate: '2015',
            numberOfEmployees: {
                '@type': 'QuantitativeValue',
                value: '35',
            },
            email: 'info@kalolwala.com',
            telephone: '+91 33 4007 7794',
            address: [
                {
                    '@type': 'PostalAddress',
                    streetAddress:
                        'South City Business Park 770, Eastern Metropolitan Bypass, Adarsha Nagar',
                    addressLocality: 'Anandapur',
                    addressRegion: 'Kolkata, West Bengal',
                    postalCode: '700107',
                    addressCountry: 'IN',
                },
                {
                    '@type': 'PostalAddress',
                    streetAddress:
                        '1507, Marathon Millennium, Lal Bahadur Shastri Marg, Beside Nirmal Lifestyle Mall',
                    addressLocality: 'Mulund West',
                    addressRegion: 'Mumbai, Maharashtra',
                    postalCode: '400080',
                    addressCountry: 'IN',
                },
                {
                    '@type': 'PostalAddress',
                    streetAddress: 'Unit No. 150, 1st Floor, Centrum Plaza, Golf Course Road',
                    addressLocality: 'Sector-53, Gurugram',
                    addressRegion: 'Haryana',
                    postalCode: '122002',
                    addressCountry: 'IN',
                },
                {
                    '@type': 'PostalAddress',
                    streetAddress: '1st Floor, Workafella Western Pearl, Hitech City Rd',
                    addressLocality: 'Kondapur, Hyderabad',
                    addressRegion: 'Telangana',
                    postalCode: '500084',
                    addressCountry: 'IN',
                },
            ],
            knowsAbout: [
                'Integrated annual reporting',
                'Annual report design',
                'BRSR reporting',
                'ESG and sustainability reporting',
                'GRI Standards',
                'IFRS Sustainability Disclosure Standards',
                'Investor presentation design',
                'Stakeholder communication',
                'Corporate branding',
                'Corporate films',
            ],
            sameAs: [
                'https://in.linkedin.com/company/kalolwala-associates-private-limited',
                'https://www.instagram.com/kalolwalaassociates/?hl=en',
                'https://www.facebook.com/kalolwalaassociates/',
                'https://x.com/KalolwalaAssoc',
            ],
            hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Stakeholder communication services',
                itemListElement: [
                    {
                        '@type': 'Offer',
                        itemOffered: {
                            '@id': `${BASE_URL}/offerings/integrated-annual-reporting/#service`,
                        },
                    },
                    {
                        '@type': 'Offer',
                        itemOffered: {
                            '@id': `${BASE_URL}/offerings/sustainability-esg-reporting/#service`,
                        },
                    },
                    {
                        '@type': 'Offer',
                        itemOffered: {
                            '@id': `${BASE_URL}/offerings/investor-corporate-presentations/#service`,
                        },
                    },
                    {
                        '@type': 'Offer',
                        itemOffered: {
                            '@id': `${BASE_URL}/offerings/corporate-branding-design/#service`,
                        },
                    },
                    {
                        '@type': 'Offer',
                        itemOffered: {
                            '@id': `${BASE_URL}/offerings/corporate-websites/#service`,
                        },
                    },
                    {
                        '@type': 'Offer',
                        itemOffered: {
                            '@id': `${BASE_URL}/offerings/corporate-films-video-reports/#service`,
                        },
                    },
                ],
            },
        },
        {
            '@type': 'WebSite',
            '@id': `${BASE_URL}/#website`,
            url: `${BASE_URL}/`,
            name: 'Kalolwala & Associates',
            alternateName: 'K&A',
            description:
                'Kalolwala & Associates delivers annual reports, BRSR, ESG reporting, branding, investor communications, and digital solutions for businesses across India.',
            publisher: { '@id': `${BASE_URL}/#organization` },
            inLanguage: 'en-IN',
        },
        {
            '@type': 'WebPage',
            '@id': `${BASE_URL}/#webpage`,
            url: `${BASE_URL}/`,
            name: 'K&A - India’s Largest Stakeholder Communication Agency',
            description:
                'K&A is India’s largest independent stakeholder communication agency, specialising in annual reports, ESG and corporate storytelling.',
            isPartOf: { '@id': `${BASE_URL}/#website` },
            about: { '@id': `${BASE_URL}/#organization` },
            inLanguage: 'en-IN',
        },
    ],
}

/**
 * Service schemas mapping from Schema - K & A (1).docx
 */
const SERVICE_SCHEMAS: Record<string, any> = {
    'integrated-annual-reporting': {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${BASE_URL}/offerings/integrated-annual-reporting/#service`,
        name: 'Integrated Annual Reporting',
        alternateName: ['Annual report design', 'Integrated report design', 'Annual report agency'],
        serviceType: 'Annual and integrated report development',
        category: 'Corporate reporting',
        url: `${BASE_URL}/offerings/integrated-annual-reporting`,
        description:
            'Integrated Annual Reporting combines financial clarity with strategic narrative, enabling organisations to articulate value creation across financial, environmental, social, and governance dimensions.',
        provider: { '@id': `${BASE_URL}/#organization` },
        areaServed: { '@type': 'Country', name: 'India' },
        audience: {
            '@type': 'BusinessAudience',
            name: 'Board of directors, investor relations, and corporate communications teams at listed Indian companies',
        },
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Annual and integrated reporting deliverables',
            itemListElement: [
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Annual Integrated Reporting',
                    },
                },
            ],
        },
        offers: {
            '@type': 'Offer',
            url: `${BASE_URL}/contact`,
            availability: 'https://schema.org/InStock',
            priceSpecification: {
                '@type': 'PriceSpecification',
                priceCurrency: 'INR',
                description: 'Project-based. Quoted against brief.',
            },
        },
        mainEntityOfPage: {
            '@id': `${BASE_URL}/offerings/integrated-annual-reporting/#webpage`,
        },
    },
    'sustainability-esg-reporting': {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${BASE_URL}/offerings/sustainability-esg-reporting/#service`,
        name: 'Sustainability and ESG Reporting',
        alternateName: [
            'ESG report design',
            'BRSR reporting support',
            'Sustainability report design',
        ],
        serviceType: 'Sustainability and ESG report development',
        category: 'Corporate reporting',
        url: `${BASE_URL}/offerings/sustainability-esg-reporting`,
        description:
            'Sustainability & ESG Reporting helps organizations measure, manage, and communicate their environmental, social, and governance performance with transparency.',
        provider: { '@id': `${BASE_URL}/#organization` },
        areaServed: { '@type': 'Country', name: 'India' },
        audience: {
            '@type': 'BusinessAudience',
            name: 'SEBI-listed entities under BRSR, and GRI or ISSB reporters',
        },
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Sustainability and ESG reporting deliverables',
            itemListElement: [
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Sustainability and ESG Reports',
                    },
                },
            ],
        },
        mainEntityOfPage: {
            '@id': `${BASE_URL}/offerings/sustainability-esg-reporting/#webpage`,
        },
    },
    'investor-corporate-presentations': {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${BASE_URL}/offerings/investor-corporate-presentations/#service`,
        name: 'Investor and Corporate Presentation Design',
        alternateName: [
            'Investor deck design',
            'Corporate presentation design',
            'Earnings presentation design',
        ],
        serviceType: 'Investor and corporate presentation design',
        category: 'Investor communication',
        url: `${BASE_URL}/offerings/investor-corporate-presentations`,
        description:
            'Investor & Corporate Presentations enable businesses to communicate financial performance, growth strategy, and corporate vision with clarity and impact.',
        provider: { '@id': `${BASE_URL}/#organization` },
        areaServed: { '@type': 'Country', name: 'India' },
        audience: {
            '@type': 'BusinessAudience',
            name: 'IR, corporate communications and finance teams at listed Indian companies',
        },
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Presentation design deliverables',
            itemListElement: [
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Investor and Corporate Presentation',
                    },
                },
            ],
        },
        mainEntityOfPage: {
            '@id': `${BASE_URL}/offerings/investor-corporate-presentations/#webpage`,
        },
    },
    'corporate-branding-design': {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${BASE_URL}/offerings/corporate-branding-design/#service`,
        name: 'Corporate Branding and Design',
        alternateName: ['Corporate identity design', 'Brand identity design'],
        serviceType: 'Corporate branding and identity design',
        category: 'Brand and design',
        url: `${BASE_URL}/offerings/corporate-branding-design`,
        description:
            'Corporate Branding & Design helps businesses build a strong and consistent brand identity through strategic communication and creative design.',
        provider: { '@id': `${BASE_URL}/#organization` },
        areaServed: { '@type': 'Country', name: 'India' },
        audience: {
            '@type': 'BusinessAudience',
            name: 'Corporate marketing and communications teams',
        },
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Branding and design deliverables',
            itemListElement: [
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Corporate Branding Design',
                    },
                },
            ],
        },
        mainEntityOfPage: {
            '@id': `${BASE_URL}/offerings/corporate-branding-design/#webpage`,
        },
    },
    'corporate-websites': {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${BASE_URL}/offerings/corporate-websites/#service`,
        name: 'Corporate Website and Digital Communication',
        alternateName: [
            'Corporate website design',
            'Digital annual report',
            'Investor relations website',
        ],
        serviceType: 'Corporate website design and digital communication',
        category: 'Digital communication',
        url: `${BASE_URL}/offerings/corporate-websites`,
        description:
            'Corporate Websites empowers businesses with secure, scalable, and high-performance digital solutions.',
        provider: { '@id': `${BASE_URL}/#organization` },
        areaServed: { '@type': 'Country', name: 'India' },
        audience: {
            '@type': 'BusinessAudience',
            name: 'Corporate communications, investor relations and digital teams',
        },
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Digital communication deliverables',
            itemListElement: [
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Corporate Website Design',
                    },
                },
            ],
        },
        mainEntityOfPage: {
            '@id': `${BASE_URL}/offerings/corporate-websites/#webpage`,
        },
    },
    'corporate-films-video-reports': {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${BASE_URL}/offerings/corporate-films-video-reports/#service`,
        name: 'Corporate Films and Video Reports',
        alternateName: ['Corporate film production', 'Video annual report'],
        serviceType: 'Corporate film and video report production',
        category: 'Video and film',
        url: `${BASE_URL}/offerings/corporate-films-video-reports`,
        description:
            'Corporate Films & Video Reports help organizations transform business stories, corporate milestones, and performance updates into engaging visual experiences.',
        provider: { '@id': `${BASE_URL}/#organization` },
        areaServed: { '@type': 'Country', name: 'India' },
        audience: {
            '@type': 'BusinessAudience',
            name: 'Corporate communications and brand teams',
        },
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Film and video deliverables',
            itemListElement: [
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Corporate Films and Video Reports',
                    },
                },
            ],
        },
        mainEntityOfPage: {
            '@id': `${BASE_URL}/offerings/corporate-films-video-reports/#webpage`,
        },
    },
}

export function getServiceSchema(slug: string) {
    return SERVICE_SCHEMAS[slug] || null
}

/**
 * Generate BreadcrumbList Schema dynamically for any page
 */
export function getBreadcrumbSchema(items: Array<{ name: string; url?: string }>) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => {
            const entry: any = {
                '@type': 'ListItem',
                position: index + 1,
                name: item.name,
            }
            if (item.url) {
                entry.item = item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`
            }
            return entry
        }),
    }
}
