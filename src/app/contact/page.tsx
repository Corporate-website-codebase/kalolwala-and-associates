import type { Metadata } from "next";
import LetsTalk from "@/components/contact/LetsTalk";
import Footers from "@/components/Footers";
import "leaflet/dist/leaflet.css";

export const metadata: Metadata = {
  title: "Contact | K&A",
  alternates: {
    canonical: "/contact",
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