'use client';

import Departments from "@/components/careers/Departments";
import Header from "@/components/careers/Header";
import OpenRoles from "@/components/careers/Roles";
import Footers from "@/components/Footers";

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