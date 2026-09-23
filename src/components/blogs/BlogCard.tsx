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
                {/* Fixed aspect ratio thumbnail container */}
                <div className="relative w-full px-0.5 pt-0.5">
                    <div className="relative w-full aspect-16/8 overflow-hidden rounded-[14px] bg-neutral-100">
                        {image ? (
                            <>
                                <Image
                                    src={image}
                                    alt={item.imageAlt || item.title}
                                    fill
                                    unoptimized
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
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
                    <div className="min-h-[58px] flex flex-col items-start mb-4">
                        <h3
                            className="leading-tight font-noto-sans font-medium text-neutral-900 transition-colors duration-300 group-hover:text-neutral-600"
                            style={{ fontSize: 'clamp(17px, 1.5vw, 21px)' }}
                        >
                            {item.title}
                        </h3>
                       
                    </div>

                    {/* Action footer: Publication date on the left, "READ ARTICLE" + arrow on the right */}
                    <div className=" pt-2 mt-3 border-t border-neutral-900/10 flex justify-between items-center">
                        <span className="text-xs rounded-full  text-neutral-500 leading-none">
                            {item.date}
                        </span>

                        <div className="flex items-center gap-1.5 text-neutral-600">
                            <span className="font-noto-sans normal-case text-sm  group-hover:text-neutral-900 transition-colors duration-300">
                                Read Article
                            </span>

                            <div className="relative  overflow-hidden flex items-center justify-center transition-all duration-300">
                                {/* First arrow: disappears up-right on hover */}
                                <ArrowUpRight className="size-4 transition-all duration-300 ease-out group-hover:translate-x-5 group-hover:-translate-y-5 group-hover:opacity-0" />

                                {/* Second arrow: enters from bottom-left and appears on hover */}
                                <ArrowUpRight className="absolute size-4 -translate-x-5 translate-y-5 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </a>
    )
}

export { BlogCard }
