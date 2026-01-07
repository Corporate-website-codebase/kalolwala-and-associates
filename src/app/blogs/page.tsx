'use client';

import CarouselSection from "@/components/blogs/CarouselSection";
import Header from "@/components/blogs/Header";
import Footers from "@/components/Footers";


const Blogs = () => {

    return (
        <div>
            <Header />
            <CarouselSection />
            <div className="marginal">
                <Footers nextPageName="Careers" nextPageLink="/" />
            </div>
        </div>
    );
};

export default Blogs