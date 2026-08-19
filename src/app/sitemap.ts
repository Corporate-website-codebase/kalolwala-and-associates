import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import { PAYLOADS } from '@/data/payloads'
import { BLOG_DATA } from '@/data/blogs'

function getRoutes(dir: string, basePath: string = ''): string[] {
  const routes: string[] = []
  if (!fs.existsSync(dir)) return routes

  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const excludedFolders = ['api', 'sitemap', 'sitemap.xml']

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      if (entry.name === 'page.tsx' || entry.name === 'page.ts') {
        routes.push(basePath || '/')
      }
      continue
    }

    if (
      excludedFolders.includes(entry.name) ||
      entry.name.startsWith('_') ||
      entry.name.startsWith('(')
    ) continue

    // Handle dynamic [slug] routes according to their specific parent directory
    if (entry.name === '[slug]') {
      if (basePath === '/offerings') {
        const slugRoutes = Object.values(PAYLOADS)
          .map((payload: any) => payload.seo?.slug)
          .filter(Boolean)
          .map((slug: string) => `/offerings/${slug}`)
        routes.push(...slugRoutes)
      } else if (basePath === '/offerings/video') {
        routes.push(
          '/offerings/video/corporate-films-video-reports',
          '/offerings/video/annual-report-video-reports'
        )
      }
      continue
    }

    const nestedRoutes = getRoutes(
      path.join(dir, entry.name),
      `${basePath}/${entry.name}`
    )
    routes.push(...nestedRoutes)
  }

  return routes
}

export default function sitemap(): MetadataRoute.Sitemap {
  const rawBaseUrl = process.env.SITE_URL || 'https://www.kalolwala.com'
  const baseUrl = rawBaseUrl.startsWith('http')
    ? rawBaseUrl.replace(/\/$/, '')
    : `https://${rawBaseUrl.replace(/\/$/, '')}`
  const appDir = path.join(process.cwd(), 'src', 'app')
  const routes = getRoutes(appDir)

  const staticAndOfferingRoutes = routes.map((route) => {
    const formattedPath = route === '/' ? (baseUrl ? '/' : '/') : route
    return `${baseUrl}${formattedPath}`
  })

  const blogRoutes = BLOG_DATA
    .filter((post) => post.slug)
    .map((post) => `${baseUrl}/blogs/${post.slug}`)

  const allUrls = [...staticAndOfferingRoutes, ...blogRoutes]

  // Remove duplicates using Set
  const uniqueUrls = Array.from(new Set(allUrls))

  const now = new Date()

  return uniqueUrls.map((url) => ({
    url: url || '/',
    lastModified: now,
  }))
}
