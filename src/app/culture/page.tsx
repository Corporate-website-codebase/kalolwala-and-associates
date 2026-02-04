import type { Metadata } from "next";
import Zoomer from "@/components/zoomer";
import TeamSection from "@/components/culture/TeamSection/page";
import Footers from "@/components/Footers";

export const metadata: Metadata = {
  title: "Culture | K&A",
  alternates: {
    canonical: "/culture",
  },
};

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
