import type { Metadata } from "next";
import Departments from "@/components/careers/Departments";
import Header from "@/components/careers/Header";
import OpenRoles from "@/components/careers/Roles";
import Footers from "@/components/Footers";

export const metadata: Metadata = {
  title: "Careers | K&A",
  alternates: {
    canonical: "/careers",
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