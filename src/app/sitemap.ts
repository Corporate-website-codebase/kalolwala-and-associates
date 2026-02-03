import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.SITE_URL || ''

  const staticRoutes = [
    '',
    '/about',
    '/blogs',
    '/careers',
    '/contact',
    '/culture',
    '/offerings',
    '/report-showcase',
  ]

  const staticPages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }))

  return staticPages
}
