import Zoomer from "@/components/zoomer";
import TeamSection from "@/components/culture/TeamSection/page";
import Footers from "@/components/Footers";
import { getMetadata } from "@/data/metadata";

export const metadata = getMetadata("culture");

export default function CulturePage() {
  return (
    <>
      {/* <Header/> */}
      <Zoomer />
      <TeamSection/>
      <Footers nextPageName="Offerings" nextPageLink="/offerings" />
    </>
  );
}
