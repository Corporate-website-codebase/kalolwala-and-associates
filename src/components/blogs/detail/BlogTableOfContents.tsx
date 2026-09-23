'use client'

import { useLenis } from 'lenis/react'
import { ChevronDown, ChevronLeft, List, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'

export interface TocHeading {
    id: string
    text: string
    level: number
}

interface TocSection {
    id: string
    text: string
    level: number
    children: TocHeading[]
}

interface BlogTableOfContentsProps {
    headings: TocHeading[]
    isOpen?: boolean
    onToggle?: () => void
    isNavbarVisible?: boolean
}

export default function BlogTableOfContents({
    headings,
    isOpen: controlledOpen,
    onToggle,
    isNavbarVisible = true,
}: BlogTableOfContentsProps) {
    const [internalOpen, setInternalOpen] = useState(true)
    const isControlled = typeof controlledOpen === 'boolean'
    const isOpen = isControlled ? controlledOpen : internalOpen

    const handleToggle = (e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault()
            e.stopPropagation()
        }
        if (onToggle) {
            onToggle()
        } else {
            setInternalOpen(!internalOpen)
        }
    }

    const [activeId, setActiveId] = useState<string>('')
    const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({})
    const lenis = useLenis()

    // Group headings into hierarchical sections (H2 as parent, H3 as accordion children)
    const sections: TocSection[] = useMemo(() => {
        const list: TocSection[] = []
        let currentSection: TocSection | null = null

        for (const h of headings) {
            if (h.level === 2) {
                currentSection = {
                    id: h.id,
                    text: h.text,
                    level: 2,
                    children: [],
                }
                list.push(currentSection)
            } else if (h.level === 3) {
                if (currentSection) {
                    currentSection.children.push(h)
                } else {
                    currentSection = {
                        id: h.id,
                        text: h.text,
                        level: 3,
                        children: [],
                    }
                    list.push(currentSection)
                }
            } else {
                if (currentSection) {
                    currentSection.children.push(h)
                } else {
                    currentSection = {
                        id: h.id,
                        text: h.text,
                        level: h.level,
                        children: [],
                    }
                    list.push(currentSection)
                }
            }
        }
        return list
    }, [headings])

    // Helper to determine if an accordion section is expanded
    // A section is expanded if:
    // 1) An active heading is inside this section (auto-expand during reading)
    // 2) OR the user has not explicitly collapsed it (default: open)
    const isSectionExpanded = (section: TocSection) => {
        const hasActiveItem =
            section.id === activeId || section.children.some((c) => c.id === activeId)
        if (hasActiveItem) return true
        return collapsedSections[section.id] !== true
    }

    const toggleSection = (section: TocSection, e: React.MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()
        const currentlyExpanded = isSectionExpanded(section)
        setCollapsedSections((prev) => ({
            ...prev,
            [section.id]: currentlyExpanded,
        }))
    }

    // Observe active headings on scroll
    useEffect(() => {
        if (headings.length === 0) return

        const headingElements = headings
            .map((h) => document.getElementById(h.id))
            .filter((el): el is HTMLElement => el !== null)

        if (headingElements.length === 0) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            {
                rootMargin: '0px 0px -70% 0px',
                threshold: 0.1,
            },
        )

        headingElements.forEach((el) => observer.observe(el))
        return () => observer.disconnect()
    }, [headings])

    const handleScrollToHeading = (id: string, e: React.MouseEvent) => {
        e.preventDefault()
        const target = document.getElementById(id)
        if (!target) return

        if (lenis) {
            lenis.scrollTo(target, { offset: -100, duration: 1.2 })
        } else {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        setActiveId(id)
    }

    if (headings.length === 0) return null

    return (
        <aside
            data-lenis-prevent="true"
            style={{
                top: isNavbarVisible ? 'var(--navbar-height, 92px)' : '0px',
                height: isNavbarVisible
                    ? 'calc(100vh - var(--navbar-height, 92px))'
                    : '100vh',
            }}
            className={`hidden lg:flex flex-col sticky z-30 shrink-0 border-r border-black/10 bg-[#d4d4d4] text-black transition-[width,top,height] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] overscroll-contain ${
                isOpen ? 'w-72 xl:w-80' : 'w-12 xl:w-14'
            }`}
        >
            {/* Header bar with toggle - pl-6 and pr-6 align with the TOC items below (p-3.5 + px-2.5) */}
            <div
                className={`flex items-center py-3.5 border-b border-black/10 bg-black/5 ${
                    isOpen ? 'justify-between pl-6 pr-6' : 'justify-center p-3.5'
                }`}
            >
                {isOpen && (
                    <div className="flex items-center gap-2.5 min-w-0">
                        <List size={14} className="text-black shrink-0" />
                        <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-black font-semibold truncate">
                            Contents
                        </h3>
                    </div>
                )}

                <button
                    type="button"
                    onClick={handleToggle}
                    aria-label={isOpen ? 'Collapse table of contents' : 'Expand table of contents'}
                    title={isOpen ? 'Collapse table of contents' : 'Expand table of contents'}
                    className="p-1 rounded-md text-neutral-600 hover:text-black hover:bg-black/10 transition-colors cursor-pointer shrink-0"
                >
                    {isOpen ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
                </button>
            </div>

            {/* Content body when open */}
            {isOpen ? (
                <nav
                    data-lenis-prevent="true"
                    className="flex-1 p-3.5 flex flex-col gap-1.5 overflow-y-auto overscroll-contain"
                >
                    {sections.map((section) => {
                        const isSectionActive = activeId === section.id
                        const hasChildren = section.children.length > 0
                        const isExpanded = isSectionExpanded(section)
                        const hasActiveChild = section.children.some((c) => c.id === activeId)

                        if (!hasChildren) {
                            return (
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    onClick={(e) => handleScrollToHeading(section.id, e)}
                                    className={`group flex items-start gap-2.5 py-2 px-2.5 rounded-lg text-xs transition-all duration-200 ${
                                        isSectionActive
                                            ? 'bg-black text-white font-medium shadow-xs'
                                            : 'text-neutral-700 hover:text-black hover:bg-black/5'
                                    }`}
                                >
                                    <span
                                        className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${
                                            isSectionActive
                                                ? 'bg-yellow-400'
                                                : 'bg-neutral-500 group-hover:bg-neutral-800'
                                        }`}
                                    />
                                    <span className="leading-snug line-clamp-2">{section.text}</span>
                                </a>
                            )
                        }

                        return (
                            <div key={section.id} className="flex flex-col rounded-lg">
                                {/* Accordion Header */}
                                <div
                                    className={`group flex items-center justify-between gap-2 py-1.5 px-2 rounded-lg text-xs transition-all duration-200 ${
                                        isSectionActive || hasActiveChild
                                            ? 'bg-black/10 text-black font-medium'
                                            : 'text-neutral-800 hover:text-black hover:bg-black/5'
                                    }`}
                                >
                                    <a
                                        href={`#${section.id}`}
                                        onClick={(e) => handleScrollToHeading(section.id, e)}
                                        className="flex items-start gap-2.5 flex-1 min-w-0"
                                    >
                                        <span
                                            className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${
                                                isSectionActive
                                                    ? 'bg-black'
                                                    : hasActiveChild
                                                    ? 'bg-black/70'
                                                    : 'bg-neutral-500 group-hover:bg-neutral-800'
                                            }`}
                                        />
                                        <span className="leading-snug line-clamp-2">
                                            {section.text}
                                        </span>
                                    </a>

                                    {/* Accordion expand/collapse chevron button */}
                                    <button
                                        type="button"
                                        onClick={(e) => toggleSection(section, e)}
                                        aria-label={isExpanded ? 'Collapse section' : 'Expand section'}
                                        title={isExpanded ? 'Collapse section' : 'Expand section'}
                                        className="p-1 rounded text-neutral-600 hover:text-black hover:bg-black/10 transition-colors cursor-pointer shrink-0"
                                    >
                                        <ChevronDown
                                            size={14}
                                            className={`transition-transform duration-300 ${
                                                isExpanded ? 'rotate-180 text-black' : 'text-neutral-600'
                                            }`}
                                        />
                                    </button>
                                </div>

                                {/* Accordion Collapsible Subheadings */}
                                {isExpanded && (
                                    <div className="pl-4 pr-1 py-1 flex flex-col gap-1 border-l border-black/15 ml-3.5 my-1">
                                        {section.children.map((child) => {
                                            const isChildActive = activeId === child.id
                                            return (
                                                <a
                                                    key={child.id}
                                                    href={`#${child.id}`}
                                                    onClick={(e) => handleScrollToHeading(child.id, e)}
                                                    className={`group flex items-start gap-2 py-1 px-2 rounded-md text-[11px] transition-all duration-200 ${
                                                        isChildActive
                                                            ? 'bg-black text-white font-medium'
                                                            : 'text-neutral-700 hover:text-black hover:bg-black/5'
                                                    }`}
                                                >
                                                    <span
                                                        className={`mt-1.5 w-1 h-1 rounded-full shrink-0 transition-colors ${
                                                            isChildActive
                                                                ? 'bg-yellow-400'
                                                                : 'bg-neutral-500 group-hover:bg-neutral-800'
                                                        }`}
                                                    />
                                                    <span className="leading-snug line-clamp-2">
                                                        {child.text}
                                                    </span>
                                                </a>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </nav>
            ) : (
                /* Collapsed vertical strip */
                <div
                    onClick={handleToggle}
                    className="flex-1 py-8 px-1 flex flex-col items-center gap-6 cursor-pointer hover:bg-black/5 transition-colors"
                    title="Click to expand Table of Contents"
                >
                    <span
                        className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-600 hover:text-black whitespace-nowrap"
                        style={{ writingMode: 'vertical-rl' }}
                    >
                        Table of Contents
                    </span>
                    <ChevronLeft size={14} className="text-neutral-600" />
                </div>
            )}
        </aside>
    )
}
