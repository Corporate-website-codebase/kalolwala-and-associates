import type { Metadata } from "next";
import Footers from "@/components/Footers";
import Header from "@/components/services/Header";
import { HorizontalScroll } from "@/components/services/HorizontalScroll";
import ImpactSection from "@/components/services/ImpactSection";

export const metadata: Metadata = {
  title: "Offerings | K&A",
  alternates: {
    canonical: "/offerings",
  },
};


const Services = () => {

    return (
        <div>
            <Header />
            <HorizontalScroll />
            <ImpactSection />
            <div className="marginal">
                <Footers nextPageName="About Us" nextPageLink="/about" />
            </div>
        </div>
    );
};

export default Services;