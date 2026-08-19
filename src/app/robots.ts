import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    // Ensure baseUrl is an absolute URL with fallback to production domain
    const rawBaseUrl = process.env.SITE_URL || 'https://www.kalolwala.com'
    const baseUrl = rawBaseUrl.startsWith('http')
        ? rawBaseUrl.replace(/\/$/, '')
        : `https://${rawBaseUrl.replace(/\/$/, '')}`
    // If explicitly non-production build/stage, disallow crawling
    if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') {
        return {
            rules: {
                userAgent: '*',
                disallow: '/',
            },
        }
    }

    // Allow crawling in production with valid absolute sitemap URL
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/api/',
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
