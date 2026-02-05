import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

function getRoutes(dir: string, basePath: string = ''): string[] {
  const routes: string[] = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  const excludedFolders = ['api']

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

    const nestedRoutes = getRoutes(
      path.join(dir, entry.name),
      `${basePath}/${entry.name}`
    )
    routes.push(...nestedRoutes)
  }

  return routes
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.SITE_URL || ''
  const appDir = path.join(process.cwd(), 'src', 'app')
  const routes = getRoutes(appDir)

  return routes.map((route) => ({
    url: `${baseUrl}${route === '/' ? '' : route}`,
    lastModified: new Date(),
  }))
}
