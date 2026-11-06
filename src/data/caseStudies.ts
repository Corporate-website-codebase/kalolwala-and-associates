
import type { WorkCardItem } from '@/components/services/WorkCards';

export interface CaseStudyCategory {
    /** URL segment: /offerings/case-studies/<slug> */
    slug: string;
    /** Each entry is one line of the heading (a line break is added between them on md+) */
    titleLines: string[];
    metaTitle: string;
    metaDescription: string;
    works: WorkCardItem[];
    nextPage: { name: string; link: string };
}

export const CASE_STUDY_CATEGORIES: Record<string, CaseStudyCategory> = {
    integratedreport: {
        slug: 'integrated-reports',
        titleLines: ['Integrated', 'Reports'],
        metaTitle: 'Integrated Report Case Studies',
        metaDescription: 'Integrated report case studies by K&A.',
        works: [
            {
                id: '1',
                title: 'Hindustan Unilever Limited (HUL)',
                imageUrl: '/case-studies/ir/hul-landscape.webp',
                link: '/case-studies/integrated-reports/hindustan-unilever',
            },
            {
                id: '2',
                title: 'Kotak Mahindra Bank',
                imageUrl: '/case-studies/ir/kotak-landscape.webp',
                link: '/case-studies/integrated-reports/kotak-mahindra-bank',
            },
            {
                id: '3',
                title: 'Tata Consumer Products Limited',
                imageUrl: '/case-studies/ir/tcp-landscape.webp',
                link: '/case-studies/integrated-reports/tata-consumer-products',
            },
        ],
        nextPage: { name: 'Case Studies - Annual Reports', link: '/case-studies/annual-reports' },
    },

    // TODO: replace the placeholder content for the entries below
    annualreport: {
        slug: 'annual-reports',
        titleLines: ['Annual', 'Reports'],
        metaTitle: 'Annual Report Case Studies',
        metaDescription: 'Annual report case studies by K&A.',
        works: [
            {
                id: '1',
                title: 'Pine Labs',
                imageUrl: '/case-studies/ar/pine-landscape.webp',
                link: '/case-studies/annual-reports/pine-labs',
            },
            {
                id: '2',
                title: 'Indian Oil Corporation Limited (IndianOil)',
                imageUrl: '/case-studies/ar/iol-landscape.webp',
                link: '/case-studies/annual-reports/indian-oil',
            },
            {
                id: '3',
                title: 'Engineers India Limited (EIL)',
                imageUrl: '/case-studies/ar/eil-landscape.webp',
                link: '/case-studies/annual-reports/engineers-india',
            },
        ],
        nextPage: { name: 'Case Studies - Sustainability Reports', link: '/case-studies/sustainability-reports' },
    },

    sustainabilityreport: {
        slug: 'sustainability-reports',
        titleLines: ['Sustainability', 'Reports'],
        metaTitle: 'Sustainability Report Case Studies',
        metaDescription: 'Sustainability report case studies by K&A.',
        works: [
            {
                id: '1',
                title: '360 ONE WAM',
                imageUrl: '/case-studies/sr/360-one-wam-landscape.webp',
                link: '/case-studies/sustainability-reports/360-one-wam',
            },
            {
                id: '2',
                title: 'LT Foods',
                imageUrl: '/case-studies/sr/lt-landscape.webp',
                link: '/case-studies/sustainability-reports/lt-foods',
            },
            {
                id: '3',
                title: 'Nxtra',
                imageUrl: '/case-studies/sr/nxtra-landscape.webp',
                link: '/case-studies/sustainability-reports/nxtra',
            },
        ],
        nextPage: { name: 'About Us', link: '/about' },
    },

    // digital: {
    //     slug: 'digital',
    //     titleLines: ['Digital', 'Solutions'],
    //     metaTitle: 'Digital Case Studies',
    //     metaDescription: 'Digital and software case studies by K&A.',
    //     works: [
    //         {
    //             id: '1',
    //             title: 'Client Name',
    //             imageUrl: '/images/services/new/placeholder-digital-1.webp',
    //             link: '/offerings/case-studies/digital/client-name',
    //         },
    //     ],
    //     nextPage: { name: 'About Us', link: '/about' },
    // },
};

/** Look a category up by its URL slug (not by object key) */
export function getCaseStudyCategory(slug: string): CaseStudyCategory | undefined {
    return Object.values(CASE_STUDY_CATEGORIES).find((c) => c.slug === slug);
}

/** All slugs, used to pre-build the pages */
export function getCaseStudySlugs(): string[] {
    return Object.values(CASE_STUDY_CATEGORIES).map((c) => c.slug);
}