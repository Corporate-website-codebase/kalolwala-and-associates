import type { Metadata } from "next";
import { CANONICALS, PAGE_TITLES, PAGE_DESCRIPTIONS } from "@/constants/seo";
import Departments from "@/components/careers/Departments";
import Header from "@/components/careers/Header";
import OpenRoles from "@/components/careers/Roles";
import Footers from "@/components/Footers";

export const metadata: Metadata = {
  title: PAGE_TITLES.careers,
  description: PAGE_DESCRIPTIONS.careers,
  alternates: {
    canonical: CANONICALS.careers,
  },
};

const Career = () => {

    return (
        <div className="marginal">
            <Header />
            <Departments />
            <OpenRoles />
            <Footers nextPageName="Contact" nextPageLink="/" />
        </div>
    );
};

export default Career;