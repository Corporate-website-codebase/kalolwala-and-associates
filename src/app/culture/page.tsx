import type { Metadata } from "next";
import { CANONICALS, PAGE_TITLES, PAGE_DESCRIPTIONS } from "@/constants/seo";
import Zoomer from "@/components/zoomer";
import TeamSection from "@/components/culture/TeamSection/page";
import Footers from "@/components/Footers";

export const metadata: Metadata = {
  title: PAGE_TITLES.culture,
  description: PAGE_DESCRIPTIONS.culture,
  alternates: {
    canonical: CANONICALS.culture,
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
