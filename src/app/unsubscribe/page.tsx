import React from 'react';
import Link from 'next/link';
import { Frown, AlertCircle, XCircle } from 'lucide-react';

export default function UnsubscribePage({ searchParams }: { searchParams: { status?: string } }) {
    const status = searchParams.status;
    
    let title = "Unsubscribe";
    let message = "Processing your request...";
    let icon = <AlertCircle className="w-12 h-12 text-neutral-400 mx-auto mb-6" strokeWidth={1.5} />;
    
    if (status === 'success') {
        title = "Unsubscribed Successfully";
        message = "You have been successfully removed from our mailing list. We're sorry to see you go!";
        icon = <Frown className="w-12 h-12 text-neutral-800 mx-auto mb-6" strokeWidth={1.5} />;
    } else if (status === 'invalid') {
        title = "Invalid Link";
        message = "This unsubscribe link is invalid or has already been used. You might have already unsubscribed.";
        icon = <XCircle className="w-12 h-12 text-red-500 mx-auto mb-6" strokeWidth={1.5} />;
    } else if (status === 'error') {
        title = "Something went wrong";
        message = "We encountered an error processing your request. Please try again later or contact support.";
        icon = <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-6" strokeWidth={1.5} />;
    }

    return (
        <div className="min-h-[70vh] flex items-center justify-center bg-[#f3f4f6] px-4 py-16 font-sans">
            <div className="max-w-md w-full bg-white shadow-2xl overflow-hidden border border-neutral-200 text-center rounded-none relative">
                
                {/* Top Border Accent */}
                <div className="h-1 w-full bg-[#111111]" />

                <div className="p-10">
                    {icon}
                    
                    <h1 className="text-2xl font-bold text-neutral-900 mb-3 tracking-tight">
                        {title}
                    </h1>
                    
                    <p className="text-neutral-500 mb-8 leading-relaxed text-sm">
                        {message}
                    </p>
                    
                    <Link 
                        href="/blogs"
                        className="inline-block bg-[#f5c518] text-black text-[13px] font-bold uppercase tracking-widest px-10 py-4 rounded-none hover:bg-[#e0b416] transition-colors w-full"
                    >
                        Return to Blogs
                    </Link>
                </div>
            </div>
        </div>
    );
}
