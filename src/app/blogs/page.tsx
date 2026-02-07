import type { Metadata } from "next";
import { CANONICALS, PAGE_TITLES, PAGE_DESCRIPTIONS } from "@/constants/seo";
import CarouselSection from "@/components/blogs/CarouselSection";
import Header from "@/components/blogs/Header";
import Footers from "@/components/Footers";

export const metadata: Metadata = {
  title: PAGE_TITLES.blogs,
  description: PAGE_DESCRIPTIONS.blogs,
  alternates: {
    canonical: CANONICALS.blogs,
  },
};


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