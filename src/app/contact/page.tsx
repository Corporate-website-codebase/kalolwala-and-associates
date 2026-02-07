import LetsTalk from "@/components/contact/LetsTalk";
import Footers from "@/components/Footers";
import "leaflet/dist/leaflet.css";
import { getMetadata } from "@/data/metadata";

export const metadata = getMetadata("contact");


const Contact = () => {

    return (
            <div>
                <LetsTalk/>
        <Footers nextPageName="Home" nextPageLink="/" />
            </div>
    );
};

export default Contact;