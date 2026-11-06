import Link from 'next/link';
import React from 'react';


export interface HeadingProps {
    title: React.ReactNode;

}

export default function Heading({ title }: HeadingProps) {
    return (
        <section className="marginal mx-auto font-noto-sans px-8  max-w-[1600px]">
            {/* 
                Main Content Grid 
                The left side holds both the Title and Description.
                The right side holds the FAQs, starting at the same top baseline as the Title.
            */}
            <div className="grid grid-cols-1 px-6 md:px-12 lg:grid-cols-12 gap-12 lg:gap-16">
                
                {/* Left Column: Title + Paragraph (Dictates the total height) */}
                <div className="lg:col-span-7 flex flex-col">
                    <div className="mb-8 md:mb-12 ">
                        <h1
                            className="font-noto-sans tracking-tight leading-[1.1]"
                            style={{ fontSize: "clamp(40px, 5vw, 72px)" }}
                        >
                            {title}
                        </h1>
                    </div>
                    
                   
                </div>

                
            </div>
        </section>
    );
}