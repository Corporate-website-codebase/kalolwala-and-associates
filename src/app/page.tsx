import Hero from "@/Home/Hero";
import Discover from "@/Home/Discover";
import Locations from "@/Home/Locations";
import Services from "@/Home/Services";
import StatsTop from "@/Home/StatsTop";
import Portfolio from "@/Home/Portfolio";
import Footers from "@/components/Footers";
import Stats from "@/Home/Stats";
import Founders from "@/Home/Founders";

export default function Home() {
  return (
    <>
      <Hero />
      <Discover />
      <Locations />
      <Portfolio />
      <div className="marginal">
        <Services />
      </div>
      <StatsTop />
      <div className="marginal">
        <Stats />
        {/* <Founders /> */}
        <Footers nextPageName="Culture" nextPageLink="/culture" />
      </div>
    </>
  );
}
