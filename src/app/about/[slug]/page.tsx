import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Footers from '@/components/Footers'
import VisionaryDetailPage from '@/components/about/VisionaryDetailPage'
import {
    getAllVisionarySlugs,
    getVisionaryBySlug,
    VISIONARIES_LIST,
} from '@/data/visionaries'

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    return getAllVisionarySlugs().map((slug) => ({
        slug,
    }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const visionary = getVisionaryBySlug(slug)

    if (!visionary) {
        return {
            title: 'Visionary Not Found | Kalolwala & Associates',
        }
    }

    const siteUrl = process.env.SITE_URL || 'https://www.kalolwala.com'
    const pagePath = `/about/${slug}`
    const pageUrl = `${siteUrl}${pagePath}`
    const cleanTitle = visionary.seo.title.replace(/[\u2018\u2019]/g, "'")
    const ogImageUrl = `${siteUrl}${visionary.image}`

    return {
        title: visionary.seo.title,
        description: visionary.seo.description,
        keywords: visionary.seo.keywords,
        robots: {
            index: true,
            follow: true,
        },
        alternates: {
            canonical: pagePath,
        },
        openGraph: {
            title: visionary.seo.title,
            description: visionary.seo.description,
            url: pageUrl,
            siteName: 'Kalolwala & Associates',
            type: 'profile',
            images: [
                {
                    url: ogImageUrl,
                    width: 2000,
                    height: 1500,
                    alt: visionary.name,
                },
                {
                    url: `${siteUrl}/api/og.png?title=${encodeURIComponent(cleanTitle)}&path=${encodeURIComponent(pagePath)}`,
                    width: 1200,
                    height: 630,
                    alt: visionary.name,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: visionary.seo.title,
            description: visionary.seo.description,
            images: [ogImageUrl],
        },
    }
}

export default async function VisionaryPage({ params }: Props) {
    const { slug } = await params
    const visionary = getVisionaryBySlug(slug)

    if (!visionary) {
        notFound()
    }

    const otherVisionary =
        VISIONARIES_LIST.find((item) => item.slug !== slug) || VISIONARIES_LIST[0]

    const siteUrl = process.env.SITE_URL || 'https://www.kalolwala.com'

    const personSchema = {
        '@type': 'Person',
        '@id': `${siteUrl}/about/${slug}#person`,
        name: visionary.name,
        jobTitle: visionary.designation,
        worksFor: {
            '@type': 'Organization',
            name: 'Kalolwala & Associates',
            url: siteUrl,
            logo: `${siteUrl}/images/kna.png`,
        },
        description: visionary.seo.description,
        image: `${siteUrl}${visionary.image}`,
        url: `${siteUrl}/about/${slug}`,
        sameAs: visionary.linkedin ? [visionary.linkedin] : [],
    }

    const breadcrumbSchema = {
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: siteUrl,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'About Us',
                item: `${siteUrl}/about`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: visionary.name,
                item: `${siteUrl}/about/${slug}`,
            },
        ],
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [personSchema, breadcrumbSchema],
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <main className="min-h-screen bg-black pt-16">
                <VisionaryDetailPage visionary={visionary} otherVisionary={otherVisionary} />
                <div className="marginal">
                    <Footers nextPageName="About Us" nextPageLink="/about" />
                </div>
            </main>
        </>
    )
}
