
import { getMetadata } from "@/data/metadata";
import CorporatePresentationPage from "./CorporatePresentationPage";

export const metadata = getMetadata("investor");

export default function Page() {
  return (
    <CorporatePresentationPage/>
  );
}