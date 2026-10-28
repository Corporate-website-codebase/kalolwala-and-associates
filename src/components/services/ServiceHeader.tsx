import Link from 'next/link';
import React from 'react';

export interface FaqItem {
    id: string;
    question: string;
    link: string;
}

export interface ServiceHeaderProps {
    title: React.ReactNode;
    description: string;
    faqs: FaqItem[];
}

export default function ServiceHeader({ title, description, faqs }: ServiceHeaderProps) {
    return (
        <section className="marginal mx-auto font-noto-sans px-8 max-w-[1440px]">
            {/* 
                Main Content Grid 
                The left side holds both the Title and Description.
                The right side holds the FAQs, starting at the same top baseline as the Title.
            */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                
                {/* Left Column: Title + Paragraph (Dictates the total height) */}
                <div className="lg:col-span-7 flex flex-col">
                    <div className="mb-8 md:mb-12">
                        <h1
                            className="font-noto-sans tracking-tight leading-[1.1]"
                            style={{ fontSize: "clamp(40px, 5vw, 72px)" }}
                        >
                            {title}
                        </h1>
                    </div>
                    
                    <p
                        className="leading-relaxed text-gray-800 pt-1"
                        style={{ fontSize: "clamp(16px, 1.2vw, 20px)" }}
                    >
                        {description}
                    </p>
                </div>

                {/* Right Column: FAQs Wrapper */}
                <div className="lg:col-span-5 relative">
                    
                    {/* 
                        Absolute positioning on desktop forces this container to exactly match 
                        the height of the left column (Title + Paragraph). This prevents it from 
                        expanding the grid and forces the scrollbar to appear.
                    */}
                    <div className="lg:absolute lg:inset-0 w-full h-full flex flex-col border-t lg:border-t-0 lg:border-l border-gray-300 pt-8 lg:pt-0 lg:pl-10">
                        
                        <h3 className="text-lg font-bold mb-6 text-[#1A1A1A] uppercase tracking-wide leading-snug">
                            FAQs
                        </h3>

                        {/* Scrollable Area */}
                        <div 
                            data-lenis-prevent="true"
                            className="flex-1 overflow-y-auto pr-4 
                            max-h-[250px] lg:max-h-full lg:min-h-0
                            [&::-webkit-scrollbar]:w-1.5 
                            [&::-webkit-scrollbar-thumb]:bg-gray-300 
                            [&::-webkit-scrollbar-thumb]:rounded-full 
                            hover:[&::-webkit-scrollbar-thumb]:bg-gray-400 
                            [&::-webkit-scrollbar-track]:bg-transparent
                            transition-colors duration-300 overscroll-contain"
                        >
                            {faqs.map((faq, index) => (
                                <React.Fragment key={faq.id}>
                                    <div className="py-4 first:pt-0 group">
                                        <Link href={faq.link} className="flex items-start justify-between gap-4">
                                            <p className="text-[15px] text-gray-700 leading-snug font-medium group-hover:text-black transition-colors">
                                                {faq.question}
                                            </p>
                                            <span className="text-gray-400 group-hover:text-[#1A1A1A] transition-colors text-xl transform group-hover:translate-x-1 duration-300 leading-none">
                                                →
                                            </span>
                                        </Link>
                                    </div>
                                    {/* Divider Line */}
                                    {index !== faqs.length - 1 && <hr className="border-gray-200" />}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}