import CarouselSection from "@/components/blogs/CarouselSection";
import Header from "@/components/blogs/Header";
import Footers from "@/components/Footers";
import { getMetadata } from "@/data/metadata";

export const metadata = getMetadata("blogs");


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