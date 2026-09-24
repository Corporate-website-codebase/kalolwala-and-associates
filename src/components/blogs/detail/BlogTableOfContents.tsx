'use client'

import { useLenis } from 'lenis/react'
import { ChevronDown, ChevronLeft, ChevronRight, List, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
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
}

export default function BlogTableOfContents({
    headings,
    isOpen: controlledOpen,
    onToggle,
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
    const [userToggledSections, setUserToggledSections] = useState<Record<string, boolean>>({})
    const [prevHeadings, setPrevHeadings] = useState(headings)
    const lenis = useLenis()

    // Reset user manual toggles when headings change (new article) without useEffect cascading renders
    if (prevHeadings !== headings) {
        setPrevHeadings(headings)
        setUserToggledSections({})
    }

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
    // By default: ALL sections are COLLAPSED. Expand if currently reading (active),
    // or if the user explicitly clicked to toggle it.
    const isSectionExpanded = (section: TocSection) => {
        if (userToggledSections[section.id] !== undefined) {
            return userToggledSections[section.id]
        }
        return section.id === activeId || section.children.some((c) => c.id === activeId)
    }

    const toggleSection = (section: TocSection, e: React.MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()
        const currentlyExpanded = isSectionExpanded(section)
        setUserToggledSections((prev) => ({
            ...prev,
            [section.id]: !currentlyExpanded,
        }))
    }

    // Observe active headings on scroll using IntersectionObserver to eliminate layout thrashing
    useEffect(() => {
        if (headings.length === 0) return

        const headingElements = headings
            .map((h) => ({ id: h.id, el: document.getElementById(h.id) }))
            .filter((item): item is { id: string; el: HTMLElement } => item.el !== null)

        if (headingElements.length === 0) return

        const observer = new IntersectionObserver(
            (entries) => {
                const intersecting = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

                if (intersecting.length > 0) {
                    setActiveId(intersecting[0].target.id)
                }
            },
            {
                rootMargin: '-90px 0px -65% 0px',
                threshold: [0, 1.0],
            },
        )

        headingElements.forEach((h) => observer.observe(h.el))

        // Clear active heading when scrolling back to the top of the page
        const handleScrollTop = () => {
            if (window.scrollY < 250) {
                setActiveId('')
            }
        }
        window.addEventListener('scroll', handleScrollTop, { passive: true })

        return () => {
            observer.disconnect()
            window.removeEventListener('scroll', handleScrollTop)
        }
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
            className={`hidden lg:flex flex-col shrink-0 relative z-10 transition-[width] duration-200 ease-out will-change-[width] transform-gpu ${
                isOpen ? 'w-72 xl:w-80' : 'w-12 xl:w-14'
            }`}
        >
            {/* Sticky sidebar — top/height driven by --navbar-height CSS variable */}
            <div
                data-lenis-prevent="true"
                style={{
                    top: 'var(--navbar-height, 92px)',
                    height: 'calc(100vh - var(--navbar-height, 92px))',
                }}
                className="sticky flex flex-col w-full border-r border-white/10 bg-[#161616] text-neutral-200 overscroll-contain z-10"
            >
                {/* Header bar with toggle */}
                <div
                    className={`flex items-center py-3.5 border-b border-white/10 bg-[#1c1c1c] shrink-0 ${
                        isOpen ? 'justify-between pl-6 pr-6' : 'justify-center p-3.5'
                    }`}
                >
                    {isOpen && (
                        <div className="flex items-center gap-2.5 min-w-0">
                            <List className="w-4 h-4 text-neutral-300 shrink-0" />
                            <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-neutral-200 font-semibold truncate">
                                Contents
                            </h3>
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={handleToggle}
                        aria-label={
                            isOpen ? 'Collapse table of contents' : 'Expand table of contents'
                        }
                        title={isOpen ? 'Collapse table of contents' : 'Expand table of contents'}
                        className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                    >
                        {isOpen ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
                    </button>
                </div>

                {/* Content body when open */}
                <nav
                    data-lenis-prevent="true"
                    className={`flex-1 p-3.5 flex-col gap-1.5 overflow-y-auto overscroll-contain ${
                        isOpen ? 'flex' : 'hidden'
                    }`}
                >
                    {sections.map((section) => {
                        const isSectionActive = activeId === section.id
                        const hasChildren = section.children.length > 0
                        const isExpanded = isSectionExpanded(section)
                        const hasActiveChild = section.children.some((c) => c.id === activeId)
                        const isHighlighted = isSectionActive || hasActiveChild || isExpanded

                        if (!hasChildren) {
                            return (
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    onClick={(e) => handleScrollToHeading(section.id, e)}
                                    className={`group flex items-start gap-2.5 py-2 px-2.5 rounded-lg text-xs transition-all duration-200 ${
                                        isSectionActive
                                            ? 'bg-white/10 text-white font-medium shadow-xs border border-white/10'
                                            : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
                                    }`}
                                >
                                    <span
                                        className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${
                                            isSectionActive
                                                ? 'bg-white'
                                                : 'bg-neutral-600 group-hover:bg-neutral-300'
                                        }`}
                                    />
                                    <span className={`leading-snug line-clamp-2 ${isSectionActive ? 'text-white' : 'text-neutral-400 group-hover:text-white'}`}>
                                        {section.text}
                                    </span>
                                </a>
                            )
                        }

                        return (
                            <div key={section.id} className="flex flex-col rounded-lg">
                                {/* Accordion Header */}
                                <div
                                    className={`group flex items-center justify-between gap-2 py-1.5 px-2 rounded-lg text-xs transition-all duration-200 ${
                                        isHighlighted
                                            ? 'bg-white/10 text-white font-medium shadow-xs border border-white/10'
                                            : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
                                    }`}
                                >
                                    <a
                                        href={`#${section.id}`}
                                        onClick={(e) => handleScrollToHeading(section.id, e)}
                                        className="flex items-start gap-2.5 flex-1 min-w-0"
                                    >
                                        <span
                                            className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${
                                                isHighlighted
                                                    ? 'bg-white'
                                                    : 'bg-neutral-600 group-hover:bg-neutral-300'
                                            }`}
                                        />
                                        <span className={`leading-snug line-clamp-2 ${isHighlighted ? 'text-white' : 'text-neutral-400 group-hover:text-white'}`}>
                                            {section.text}
                                        </span>
                                    </a>

                                    {/* Accordion expand/collapse chevron button */}
                                    <button
                                        type="button"
                                        onClick={(e) => toggleSection(section, e)}
                                        aria-label={
                                            isExpanded ? 'Collapse section' : 'Expand section'
                                        }
                                        title={
                                            isExpanded ? 'Collapse section' : 'Expand section'
                                        }
                                        className="p-1 rounded text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                                    >
                                        <ChevronDown
                                            size={14}
                                            className={`transition-transform duration-300 ${
                                                isExpanded
                                                    ? 'rotate-180 text-white'
                                                    : 'text-neutral-400 group-hover:text-white'
                                            }`}
                                        />
                                    </button>
                                </div>

                                {/* Accordion Collapsible Subheadings */}
                                {isExpanded && (
                                    <div className="pl-4 pr-1 py-1 flex flex-col gap-1 border-l border-white/15 ml-3.5 my-1">
                                        {section.children.map((child) => {
                                            const isChildActive = activeId === child.id
                                            return (
                                                <a
                                                    key={child.id}
                                                    href={`#${child.id}`}
                                                    onClick={(e) =>
                                                        handleScrollToHeading(child.id, e)
                                                    }
                                                    className={`group flex items-start gap-2 py-1 px-2 rounded-md text-[11px] transition-all duration-200 ${
                                                        isChildActive
                                                            ? 'bg-white/10 text-white font-medium'
                                                            : 'text-neutral-400 hover:text-white hover:bg-white/5'
                                                    }`}
                                                >
                                                    <span
                                                        className={`mt-1.5 w-1 h-1 rounded-full shrink-0 transition-colors ${
                                                            isChildActive
                                                                ? 'bg-white'
                                                                : 'bg-neutral-600 group-hover:bg-neutral-300'
                                                        }`}
                                                    />
                                                    <span className={`leading-snug line-clamp-2 ${isChildActive ? 'text-white' : 'text-neutral-400 group-hover:text-white'}`}>
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

                {/* Collapsed vertical strip */}
                <div
                    onClick={handleToggle}
                    className={`flex-1 py-8 px-1 flex-col items-center gap-6 cursor-pointer hover:bg-white/5 transition-colors ${
                        isOpen ? 'hidden' : 'flex'
                    }`}
                    title="Click to expand Table of Contents"
                >
                    <List className="w-4 h-4 text-neutral-400 shrink-0" />
                    <span
                        className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-400 hover:text-white whitespace-nowrap"
                        style={{ writingMode: 'vertical-rl' }}
                    >
                        Table of Contents
                    </span>
                    <ChevronRight size={14} className="text-neutral-400" />
                </div>
            </div>
        </aside>
    )
}
