import type { BlogPost } from '@/data/blogs'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

export interface BlogCardProps {
    post?: BlogPost
    blog?: BlogPost
    card?: BlogPost
    className?: string
}

export default function BlogCard({ post, blog, card, className = '' }: BlogCardProps) {
    const item = post || blog || card

    if (!item) return null

    // Determine whether this links internally to our blog reader or directly to an external article
    const isInternal = !!(item.slug && item.content)
    const href = isInternal ? `/blogs/${item.slug}` : item.url
    const image = item.image

    return (
        <a
            href={href}
            {...(!isInternal && {
                target: '_blank',
                rel: 'noopener noreferrer',
            })}
            className={`group block w-full h-full outline-none ${className}`.trim()}
        >
            <article className="group relative flex flex-col h-full overflow-hidden rounded-2xl bg-white/60 backdrop-blur-xl border border-white/80 shadow-sm hover:shadow-xl transition-all duration-500 ease-out hover:-translate-y-1">
                {/* Thumbnail banner or fallback placeholder */}
                {image ? (
                    <div className="relative w-full">
                        <div className="relative w-full overflow-hidden rounded-xl bg-neutral-100">
                            <Image
                                src={image}
                                alt={item.imageAlt || item.title}
                                width={800}
                                height={450}
                                unoptimized
                                className="block w-full h-auto transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                        </div>
                    </div>
                ) : (
                    <div className="px-3 pt-3">
                        <div className="relative w-full aspect-[16/9] rounded-xl bg-neutral-200 flex items-center justify-center">
                            <span className="text-neutral-400 text-sm">Kalolwala & Associates</span>
                        </div>
                    </div>
                )}

                {/* Article details and action footer */}
                <div className="flex flex-col flex-grow px-6 pt-5 pb-6">
                    {/* Publication date */}
                    <div className="h-[16px] flex items-start mb-3">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 leading-none">
                            {item.date}
                        </span>
                    </div>

                    {/* Article title */}
                    <div className="min-h-[58px] flex items-start">
                        <h3
                            className="leading-tight font-noto-sans font-medium text-neutral-900 transition-colors duration-300 group-hover:text-neutral-600"
                            style={{ fontSize: 'clamp(17px, 1.5vw, 21px)' }}
                        >
                            {item.title}
                        </h3>
                    </div>

                    {/* Read more button with animated icon */}
                    <div className="mt-auto pt-5 border-t border-neutral-900/10 flex justify-between items-center">
                        <p
                            className="font-noto-sans uppercase tracking-widest font-bold text-neutral-600 group-hover:text-neutral-900 transition-colors duration-300"
                            style={{ fontSize: '10px' }}
                        >
                            READ MORE
                        </p>

                        <div className="bg-white p-2 rounded-full border border-neutral-900/10 group-hover:shadow-sm transition-all duration-300">
                            <ArrowUpRight className="text-neutral-800 w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                    </div>
                </div>
            </article>
        </a>
    )
}

export { BlogCard }
