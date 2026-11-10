
import { getMetadata } from "@/data/metadata";

import SustainabilityPage from "./SustainabilityPage";

export const metadata = getMetadata("esg");

export default function Page() {
  return (
    <SustainabilityPage/>
  );
}