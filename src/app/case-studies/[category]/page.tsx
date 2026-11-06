
import { Fragment } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getCaseStudyCategory, getCaseStudySlugs } from '@/data/caseStudies';
// TODO: adjust these three import paths to where the components live in your project

import WorkCards from '@/components/services/WorkCards';
import Footers from '@/components/Footers';
import Heading from '@/components/caseStudies/Heading';

type PageProps = {
    params: Promise<{ category: string }>;
};

export function generateStaticParams() {
    return getCaseStudySlugs().map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category } = await params;
    const data = getCaseStudyCategory(category);
    if (!data) return {};

    return {
        title: data.metaTitle,
        description: data.metaDescription,
    };
}

// The line that must exist: a default export that is a component
export default async function CaseStudyCategoryPage({ params }: PageProps) {
    const { category } = await params;
    const data = getCaseStudyCategory(category);

    if (!data) notFound();

    return (
        <main>
            <div className="bg-[#E3E3E3] pt-20 text-[#1A1A1A] font-sans overflow-x-hidden min-h-screen">
                <Heading
                    title={
                        <>
                            {data.titleLines.map((line, i) => (
                                <Fragment key={line}>
                                    {i > 0 && <br  />}
                                    {line}
                                </Fragment>
                            ))}
                        </>
                    }
                />

                <WorkCards works={data.works} />
            </div>

            <Footers nextPageName={data.nextPage.name} nextPageLink={data.nextPage.link} />
        </main>
    );
}