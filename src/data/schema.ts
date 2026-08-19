/**
 * Centralized JSON-LD Schema definitions for Kalolwala & Associates
 * Derived from official Schema - K & A specification
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
