import type { Metadata } from "next";
import CarouselSection from "@/components/blogs/CarouselSection";
import Header from "@/components/blogs/Header";
import Footers from "@/components/Footers";

export const metadata: Metadata = {
  title: "Blogs | K&A",
  alternates: {
    canonical: "/blogs",
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