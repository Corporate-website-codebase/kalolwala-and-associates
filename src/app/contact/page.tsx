import type { Metadata } from "next";
import { CANONICALS, PAGE_TITLES, PAGE_DESCRIPTIONS } from "@/constants/seo";
import LetsTalk from "@/components/contact/LetsTalk";
import Footers from "@/components/Footers";
import "leaflet/dist/leaflet.css";

export const metadata: Metadata = {
  title: PAGE_TITLES.contact,
  description: PAGE_DESCRIPTIONS.contact,
  alternates: {
    canonical: CANONICALS.contact,
  },
};


const Contact = () => {

    return (
            <div>
                <LetsTalk/>
        <Footers nextPageName="Home" nextPageLink="/" />
            </div>
    );
};

export default Contact;