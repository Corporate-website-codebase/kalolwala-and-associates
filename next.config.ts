import type { NextConfig } from 'next'
import withBundleAnalyzer from '@next/bundle-analyzer'
const nextConfig: NextConfig = {
    // Explicitly enforce removal of trailing slashes (e.g. /offerings/ -> /offerings)
    skipTrailingSlashRedirect: false,

    async headers() {
        return [
            {
                source: '/docs/:path*.pdf',
                headers: [
                    {
                        key: 'Link',
                        value: '<https://www.kalolwala.com/docs/:path*.pdf>; rel="canonical"',
                    },
                ],
            },
        ]
    },

    async redirects() {
        return [
            // 1. Legacy CMS Script Redirect (Fixes 403 / 404 on index.php)
            {
                source: '/index.php',
                destination: '/',
                permanent: true,
            },

            // 2. Legacy Showcase Query Redirects
            {
                source: '/report-showcase',
                has: [{ type: 'query', key: 'key', value: 'sustainability' }],
                destination: '/offerings/sustainability-esg-reporting',
                permanent: true,
            },
            {
                source: '/report-showcase',
                has: [{ type: 'query', key: 'key', value: 'integrated' }],
                destination: '/offerings/integrated-annual-reporting',
                permanent: true,
            },
            {
                source: '/report-showcase',
                has: [{ type: 'query', key: 'key', value: 'web' }],
                destination: '/offerings/corporate-websites',
                permanent: true,
            },
            {
                source: '/report-showcase',
                has: [{ type: 'query', key: 'key', value: 'presentations' }],
                destination: '/offerings/investor-corporate-presentations',
                permanent: true,
            },
            {
                source: '/report-showcase',
                has: [{ type: 'query', key: 'key', value: 'branding' }],
                destination: '/offerings/corporate-branding-design',
                permanent: true,
            },
            {
                source: '/report-showcase',
                has: [{ type: 'query', key: 'key', value: 'video' }],
                destination: '/offerings/corporate-films-video-reports',
                permanent: true,
            },
            {
                source: '/report-showcase',
                destination: '/offerings',
                permanent: true,
            },

            // 3. Legacy Migrated Annual Report & Sustainability URLs
            {
                source: '/integrated-annual-reports/upl-ltd',
                destination: '/offerings/integrated-annual-reporting',
                permanent: true,
            },
            {
                source: '/integrated-annual-reports/indian-oil',
                destination: '/offerings/integrated-annual-reporting',
                permanent: true,
            },
            {
                source: '/sustainability-reports/hero',
                destination: '/offerings/sustainability-esg-reporting',
                permanent: true,
            },
            {
                source: '/sustainability-reports/gfl',
                destination: '/offerings/sustainability-esg-reporting',
                permanent: true,
            },
            {
                source: '/tag/social-media-management',
                destination: '/offerings/corporate-branding-design',
                permanent: true,
            },

            // 4. Obsolete /video/ Subroute Redirects
            {
                source: '/offerings/video/integrated-annual-reporting',
                destination: '/offerings/integrated-annual-reporting',
                permanent: true,
            },
            {
                source: '/offerings/video/sustainability-esg-reporting',
                destination: '/offerings/sustainability-esg-reporting',
                permanent: true,
            },
            {
                source: '/offerings/video/corporate-websites',
                destination: '/offerings/corporate-websites',
                permanent: true,
            },
            {
                source: '/offerings/video/investor-corporate-presentations',
                destination: '/offerings/investor-corporate-presentations',
                permanent: true,
            },
            {
                source: '/offerings/video/corporate-branding-design',
                destination: '/offerings/corporate-branding-design',
                permanent: true,
            },
        ]
    },
}
const withAnalyzer = withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
})

export default withAnalyzer(nextConfig)
// export default nextConfig
