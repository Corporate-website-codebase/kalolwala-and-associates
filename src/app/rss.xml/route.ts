import { BLOG_DATA, decodeHtmlEntities } from '@/data/blogs'
import { getPosts } from '@/lib/wordpress'

function escapeXml(unsafe: string): string {
    return decodeHtmlEntities(unsafe)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')
}

function cleanDescription(text: string): string {
    return escapeXml(text.replace(/<[^>]*>/g, '').trim())
}

function toRfc822Date(dateStr?: string): string {
    if (!dateStr) return new Date().toUTCString()
    const d = new Date(dateStr)
    return isNaN(d.getTime()) ? new Date().toUTCString() : d.toUTCString()
}

export const revalidate = 3600 // Cache for 1 hour

export async function GET() {
    const rawBaseUrl = process.env.SITE_URL || 'https://www.kalolwala.com'
    const baseUrl = rawBaseUrl.startsWith('http')
        ? rawBaseUrl.replace(/\/$/, '')
        : `https://${rawBaseUrl.replace(/\/$/, '')}`

    // Fetch WordPress posts
    let wpPosts: any[] = []
    try {
        wpPosts = await getPosts()
    } catch {
        wpPosts = []
    }

    const items: Array<{
        title: string
        link: string
        description: string
        pubDate: string
        guid: string
        author?: string
    }> = []

    // 1. Process local blogs
    for (const post of BLOG_DATA) {
        if (!post.slug) continue
        items.push({
            title: post.title,
            link: `${baseUrl}/blogs/${post.slug}`,
            description: post.excerpt || post.title,
            pubDate: toRfc822Date(post.date),
            guid: `${baseUrl}/blogs/${post.slug}`,
            author: post.author || 'Kalolwala & Associates',
        })
    }

    // 2. Process WordPress posts
    for (const post of wpPosts) {
        if (!post.slug || post.status !== 'publish') continue
        // Avoid duplicate slugs
        if (items.some((item) => item.guid.endsWith(`/blogs/${post.slug}`))) continue

        const title = post.title?.rendered || 'Untitled'
        const rawExcerpt = post.excerpt?.rendered || ''
        const author = post._embedded?.author?.[0]?.name || 'Kalolwala & Associates'

        items.push({
            title,
            link: `${baseUrl}/blogs/${post.slug}`,
            description: cleanDescription(rawExcerpt) || title,
            pubDate: toRfc822Date(post.date),
            guid: `${baseUrl}/blogs/${post.slug}`,
            author,
        })
    }

    // Sort newest first
    items.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())

    const itemsXml = items
        .map(
            (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.link)}</link>
      <description>${cleanDescription(item.description)}</description>
      <pubDate>${item.pubDate}</pubDate>
      <guid isPermaLink="true">${escapeXml(item.guid)}</guid>
      <author>${escapeXml(item.author || 'Kalolwala & Associates')}</author>
    </item>`
        )
        .join('\n')

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Kalolwala &amp; Associates - Insights &amp; Blogs</title>
    <link>${baseUrl}/blogs</link>
    <description>Latest insights on stakeholder communication, ESG reporting, BRSR, annual reports, and corporate storytelling from Kalolwala &amp; Associates.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>`

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
        },
    })
}
