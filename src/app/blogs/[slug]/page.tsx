import BlogDetailPage from '@/components/blogs/BlogDetailPage'
import Footers from '@/components/Footers'
import {
    BLOG_DATA,
    calculateReadingTime,
    getBlogBySlug,
    getLocalBlogCards,
    type BlogPost,
    type BlogPostCard,
} from '@/data/blogs'
import { getPosts } from '@/lib/wordpress'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

type WordPressPost = {
    id: number
    date: string
    modified: string
    slug: string
    status: string

    title: {
        rendered: string
    }

    content: {
        rendered: string
    }

    excerpt: {
        rendered: string
    }

    _embedded?: {
        author?: Array<{
            id: number
            name: string
        }>

        'wp:featuredmedia'?: Array<{
            source_url?: string
            alt_text?: string
            media_details?: {
                sizes?: {
                    thumbnail?: {
                        source_url?: string
                    }
                    medium?: {
                        source_url?: string
                    }
                    medium_large?: {
                        source_url?: string
                    }
                    large?: {
                        source_url?: string
                    }
                    full?: {
                        source_url?: string
                    }
                }
            }
        }>
    }
}

export async function generateStaticParams() {
    const localSlugs = BLOG_DATA.filter((post) => post.slug).map((post) => ({
        slug: post.slug!,
    }))

    try {
        const wpPosts = await getPosts()
        const wpSlugs = (wpPosts || [])
            .filter((p) => p.slug && p.status === 'publish')
            .map((p) => ({ slug: p.slug }))

        const allSlugs = [...localSlugs, ...wpSlugs]
        const unique = allSlugs.filter(
            (item, index, self) => index === self.findIndex((t) => t.slug === item.slug)
        )
        return unique
    } catch {
        return localSlugs
    }
}

export const dynamicParams = true
export const revalidate = 600

type Props = {
    params: Promise<{ slug: string }>
}

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const siteUrl = process.env.SITE_URL || 'https://www.kalolwala.com'
    const blogPath = `/blogs/${slug}`
    const blogUrl = `${siteUrl}${blogPath}`

    /*
     * Check existing local blogs first
     */
    const localPost = getBlogBySlug(slug)

    if (localPost) {
        const blogTitle = localPost.metaTitle || localPost.title
        const blogDescription = localPost.excerpt || localPost.title
        const cleanTitle = blogTitle.replace(/[\u2018\u2019]/g, "'")
        const ogImageUrl = `/api/og.png?title=${encodeURIComponent(cleanTitle)}&path=${encodeURIComponent(blogPath)}`

        return {
            title: blogTitle,
            description: blogDescription,
            robots: {
                index: true,
                follow: true,
            },
            alternates: {
                canonical: blogPath,
            },
            openGraph: {
                title: blogTitle,
                description: blogDescription,
                url: blogUrl,
                siteName: 'Kalolwala & Associates',
                type: 'article',
                publishedTime: localPost.date,
                authors: localPost.author ? [localPost.author] : ['Kalolwala & Associates'],
                images: [
                    {
                        url: ogImageUrl,
                        type: 'image/png',
                        width: 1200,
                        height: 630,
                        alt: blogTitle,
                    },
                ],
            },
            twitter: {
                card: 'summary_large_image',
                title: blogTitle,
                description: blogDescription,
                images: [ogImageUrl],
            },
        }
    }

    /*
     * Check WordPress
     */
    const wordpressPosts: WordPressPost[] = await getPosts()

    const wordpressPost = wordpressPosts.find((post) => post.slug === slug)

    if (!wordpressPost) {
        return {
            title: 'Blog Not Found | K&A',
        }
    }

    const blogTitle = wordpressPost.title.rendered
    const blogDescription = wordpressPost.excerpt.rendered.replace(/<[^>]*>/g, '').trim()
    const cleanWpTitle = blogTitle.replace(/[\u2018\u2019]/g, "'")
    const ogImageUrl = `/api/og.png?title=${encodeURIComponent(cleanWpTitle)}&path=${encodeURIComponent(blogPath)}`

    return {
        title: blogTitle,
        description: blogDescription,

        robots: {
            index: true,
            follow: true,
        },

        alternates: {
            canonical: blogPath,
        },

        openGraph: {
            title: blogTitle,
            description: blogDescription,
            url: blogUrl,
            siteName: 'Kalolwala & Associates',
            type: 'article',

            images: [
                {
                    url: ogImageUrl,
                    type: 'image/png',
                    width: 1200,
                    height: 630,
                    alt: blogTitle,
                },
            ],
        },

        twitter: {
            card: 'summary_large_image',
            title: blogTitle,
            description: blogDescription,

            images: [ogImageUrl],
        },
    }
}

/* =========================================================
   PAGE
========================================================= */

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params

    /*
     * Fetch WordPress posts for complete article database and recommendations
     */
    let wordpressPosts: WordPressPost[] = []
    try {
        wordpressPosts = await getPosts()
    } catch (error) {
        console.error('Failed to fetch WordPress posts:', error)
    }

    const wordpressBlogs: BlogPostCard[] = wordpressPosts
        .filter((post) => post.status === 'publish')
        .map((post) => {
            const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0]

            // Use lightweight pre-scaled image for thumbnails/sidebars to prevent network choking
            const image =
                featuredMedia?.media_details?.sizes?.medium?.source_url ||
                featuredMedia?.media_details?.sizes?.thumbnail?.source_url ||
                featuredMedia?.media_details?.sizes?.medium_large?.source_url ||
                featuredMedia?.source_url ||
                ''

            const rawExcerpt = post.excerpt?.rendered
                ? post.excerpt.rendered.replace(/<[^>]*>/g, '').trim()
                : ''

            return {
                id: String(post.id),
                source: 'cms' as const,
                title: post.title.rendered,
                metaTitle: post.title.rendered,
                slug: post.slug,
                excerpt: rawExcerpt,
                readingTime: calculateReadingTime(post.content?.rendered || rawExcerpt),
                date: new Date(post.date).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                }),
                url: '',
                image,
                imageAlt: featuredMedia?.alt_text || post.title.rendered,
                author: post._embedded?.author?.[0]?.name || '',
            }
        })

    const localCards = getLocalBlogCards()
    const allBlogCards: BlogPostCard[] = [...localCards, ...wordpressBlogs]

    /*
     * ========================================================
     * 1. CHECK LOCAL / HARDCODED BLOGS FIRST
     * ========================================================
     */

    const localPost = getBlogBySlug(slug)

    if (localPost && localPost.content) {
        const articleSchema = {
            '@type': 'BlogPosting',
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `https://www.kalolwala.com/blogs/${slug}`,
            },
            headline: localPost.title,
            description: localPost.excerpt || localPost.title,
            image: localPost.image ? [localPost.image] : [],
            datePublished: localPost.date,
            dateModified: localPost.date,
            author: {
                '@type': 'Person',
                name: localPost.author || 'Kalolwala & Associates',
            },
            publisher: {
                '@type': 'Organization',
                name: 'Kalolwala & Associates',
                logo: {
                    '@type': 'ImageObject',
                    url: 'https://www.kalolwala.com/images/kna.png',
                },
            },
        }

        const breadcrumbSchema = {
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: 'https://www.kalolwala.com',
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Insights & Blogs',
                    item: 'https://www.kalolwala.com/blogs',
                },
                {
                    '@type': 'ListItem',
                    position: 3,
                    name: localPost.title,
                    item: `https://www.kalolwala.com/blogs/${slug}`,
                },
            ],
        }

        const jsonLd = {
            '@context': 'https://schema.org',
            '@graph': [articleSchema, breadcrumbSchema],
        }

        return (
            <>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />

                <BlogDetailPage
                    key={localPost.id}
                    post={localPost}
                    recentArticles={allBlogCards}
                />

                <Footers nextPageName="Careers" nextPageLink="/careers" />
            </>
        )
    }

    /*
     * ========================================================
     * 2. FIND WORDPRESS POST
     * ========================================================
     */

    const wordpressPost = wordpressPosts.find((post) => post.slug === slug)

    if (!wordpressPost) {
        notFound()
    }

    /*
     * ========================================================
     * 3. CURRENT WORDPRESS BLOG
     * ========================================================
     */

    const baseWordpressBlog = wordpressBlogs.find((blog) => blog.slug === wordpressPost.slug)

    if (!baseWordpressBlog) {
        notFound()
    }

    const activeFeaturedMedia = wordpressPost._embedded?.['wp:featuredmedia']?.[0]
    const heroImage =
        activeFeaturedMedia?.media_details?.sizes?.large?.source_url ||
        activeFeaturedMedia?.media_details?.sizes?.full?.source_url ||
        activeFeaturedMedia?.source_url ||
        baseWordpressBlog.image

    // Attach full content and high-res hero image ONLY to the active blog post being viewed
    const wordpressBlog: BlogPost = {
        ...baseWordpressBlog,
        image: heroImage,
        content: wordpressPost.content.rendered,
    }

    /*
     * ========================================================
     * 4. RENDER
     * ========================================================
     */

    const articleSchema = {
        '@type': 'BlogPosting',
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://www.kalolwala.com/blogs/${slug}`,
        },
        headline: wordpressBlog.title,
        description: wordpressBlog.excerpt || wordpressBlog.title,
        image: wordpressBlog.image ? [wordpressBlog.image] : [],
        datePublished: wordpressBlog.date,
        dateModified: wordpressBlog.date,
        author: {
            '@type': 'Person',
            name: wordpressBlog.author || 'Kalolwala & Associates',
        },
        publisher: {
            '@type': 'Organization',
            name: 'Kalolwala & Associates',
            logo: {
                '@type': 'ImageObject',
                url: 'https://www.kalolwala.com/images/kna.png',
            },
        },
    }

    const breadcrumbSchema = {
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://www.kalolwala.com',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Insights & Blogs',
                item: 'https://www.kalolwala.com/blogs',
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: wordpressBlog.title,
                item: `https://www.kalolwala.com/blogs/${slug}`,
            },
        ],
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [articleSchema, breadcrumbSchema],
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <BlogDetailPage
                key={wordpressBlog.id}
                post={wordpressBlog}
                recentArticles={allBlogCards}
            />

            <Footers nextPageName="Careers" nextPageLink="/careers" />
        </>
    )
}
