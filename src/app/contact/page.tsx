'use client';

import LetsTalk from "@/components/contact/LetsTalk";
import Footers from "@/components/Footers";
import "leaflet/dist/leaflet.css";


const Contact = () => {

    return (
            <div>
                <LetsTalk/>
        <Footers nextPageName="Home" nextPageLink="/" />
            </div>
    );
};

export default Contact;