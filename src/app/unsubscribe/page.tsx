import React from 'react';
import Link from 'next/link';
import { Frown, AlertCircle, XCircle } from 'lucide-react';
import Footers from '@/components/Footers';

export default async function UnsubscribePage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
    const resolvedParams = await searchParams;
    const status = resolvedParams.status;

    let title = "Unsubscribe";
    let message = "Processing your request...";
    let icon = <AlertCircle className="w-12 h-12 text-neutral-400 mx-auto mb-6" strokeWidth={1.5} />;

    let buttonText = "Explore Blogs";
    let buttonLink = "/blogs";

    if (status === 'success') {
        title = "Unsubscribed Successfully";
        message = "You have been successfully removed from our mailing list. We're sorry to see you go!";
        icon = <Frown className="w-12 h-12 text-neutral-800 mx-auto mb-6" strokeWidth={1.5} />;
    } else if (status === 'invalid') {
        title = "Invalid Link";
        message = "This unsubscribe link is invalid or has already been used. You might have already unsubscribed.";
        icon = <XCircle className="w-12 h-12 text-red-500 mx-auto mb-6" strokeWidth={1.5} />;
        buttonText = "Contact Support";
        buttonLink = "/contact";
    } else if (status === 'error') {
        title = "Something went wrong";
        message = "We encountered an error processing your request. Please try again later or contact support.";
        icon = <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-6" strokeWidth={1.5} />;
        buttonText = "Contact Support";
        buttonLink = "/contact";
    }

    return (
        <div className="min-h-screen flex flex-col font-sans">
            <div className="flex-grow flex items-center justify-center bg-[#f3f4f6] px-4 py-16 min-h-150 lg:min-h-200">
                <div className="max-w-md w-full bg-white overflow-hidden border border-neutral-200 text-center rounded-none relative">
                    <div className="p-10">
                        {icon}

                        <h1 className="text-2xl font-bold text-neutral-900 mb-3 tracking-tight">
                            {title}
                        </h1>

                        <p className="text-neutral-500 mb-8 leading-relaxed text-sm">
                            {message}
                        </p>

                        <Link
                            href={buttonLink}
                            className="inline-block bg-[#f5c518] text-black text-base font-bold px-10 py-3 rounded-none hover:bg-[#e0b416] transition-colors w-full"
                        >
                            {buttonText}
                        </Link>
                    </div>
                </div>
            </div>

            <Footers nextPageLink="/" nextPageName="Home" />
        </div>
    );
}
