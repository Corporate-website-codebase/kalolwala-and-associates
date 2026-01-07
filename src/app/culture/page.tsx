import Zoomer from "@/components/zoomer"; 
// import Header from "@/components/culture/header/page";
import TeamSection from "@/components/culture/TeamSection/page";
import Footers from "@/components/Footers";

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
