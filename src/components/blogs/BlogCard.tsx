import type { BlogPost } from '@/data/blogs'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export interface BlogCardProps {
    post?: BlogPost
    blog?: BlogPost
    card?: BlogPost
    className?: string
}

function parseAuthor(rawAuthor?: string) {
    if (!rawAuthor) {
        return { name: 'Kalolwala & Associates', initials: 'KA' }
    }

    const clean = rawAuthor
        .replace(/^thoughts penned down by\s+/i, '')
        .replace(/^research by\s+/i, '')
        .replace(/^editorial team at\s+/i, 'Editorial Team, ')
        .trim()

    const primaryName = clean.split(/[,·|–-]/)[0]?.trim() || clean
    const words = primaryName.replace(/[^a-zA-Z\s&]/g, '').trim().split(/\s+/).filter(Boolean)

    let initials = 'KA'
    if (words.length >= 2) {
        initials = (words[0][0] + words[words.length - 1][0]).toUpperCase()
    } else if (words.length === 1 && words[0].length > 0) {
        initials = words[0].slice(0, 2).toUpperCase()
    }

    return {
        name: primaryName || 'K&A Editorial',
        initials: initials || 'KA',
    }
}

export default function BlogCard({ post, blog, card, className = '' }: BlogCardProps) {
    const item = post || blog || card

    if (!item) return null

    // Determine whether this links internally to our blog reader or directly to an external article
    const isInternal = !!(item.slug && item.content)
    const href = isInternal ? `/blogs/${item.slug}` : item.url
    const image = item.image
    const author = parseAuthor(item.author)

    const cardContent = (
        <article className="group relative flex flex-col h-full overflow-hidden rounded-2xl bg-white/95 border border-white/90 shadow-xs hover:shadow-md transition-transform duration-300 ease-out hover:-translate-y-1 transform-gpu">
            {/* Fixed aspect ratio thumbnail container */}
            <div className="relative w-full px-0.5 pt-0.5">
                <div className="relative w-full aspect-16/8 overflow-hidden rounded-[14px] bg-neutral-100">
                    {image ? (
                        <>
                            <Image
                                src={image}
                                alt={item.imageAlt || item.title}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
                                className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105 transform-gpu"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                        </>
                    ) : (
                        <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
                            <span className="text-neutral-400 text-sm">
                                Kalolwala & Associates
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Article details and action footer */}
            <div className="flex flex-col grow px-6 pt-5 pb-6">
                {/* Article title */}
                <div className="min-h-20 flex flex-col items-start mb-4">
                    <h3
                        className="leading-tight font-noto-sans font-normal text-neutral-900 transition-colors duration-300 group-hover:text-black"
                        style={{ fontSize: 'clamp(17px, 1.5vw, 18px)' }}
                    >
                        {item.title}
                    </h3>
                </div>

                {/* Action footer: Author with initial logo on the left, "READ ARTICLE" + arrow on the right */}
                <div className="pt-3 mt-auto border-t border-neutral-900/10 flex justify-between items-center gap-3">
                    {/* Author & Initial Logo */}
                    <div className="flex items-center gap-2.5 min-w-0">
                        <div className="size-7 rounded-full bg-neutral-900 text-white flex items-center justify-center font-mono text-[10px] font-semibold tracking-wider shrink-0 transition-colors duration-300 group-hover:bg-neutral-800">
                            {author.initials}
                        </div>
                        <div className="flex flex-col min-w-0 leading-tight">
                            <span className="text-xs font-medium text-neutral-900 truncate">
                                {author.name}
                            </span>
                            <span className="text-[11px] text-neutral-500 mt-0.5">
                                {item.date}
                            </span>
                        </div>
                    </div>

                    {/* Read Article link */}
                    <div className="flex items-center gap-1.5 text-neutral-600 shrink-0">
                        <span className="font-noto-sans normal-case text-sm group-hover:text-neutral-900 transition-colors duration-300">
                            Read Article
                        </span>

                        <div className="relative overflow-hidden flex items-center justify-center">
                            {/* First arrow: disappears up-right on hover */}
                            <ArrowUpRight className="size-4 transition-all duration-300 ease-out group-hover:translate-x-5 group-hover:-translate-y-5 group-hover:opacity-0" />

                            {/* Second arrow: enters from bottom-left and appears on hover */}
                            <ArrowUpRight className="absolute size-4 -translate-x-5 translate-y-5 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )

    if (isInternal) {
        return (
            <Link
                href={href}
                prefetch={true}
                className={`group block w-full h-full outline-none ${className}`.trim()}
            >
                {cardContent}
            </Link>
        )
    }

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group block w-full h-full outline-none ${className}`.trim()}
        >
            {cardContent}
        </a>
    )
}

export { BlogCard }
