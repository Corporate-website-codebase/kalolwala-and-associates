
import { getMetadata } from "@/data/metadata";
import BrandingPage from "./BrandingPage";


export const metadata = getMetadata("design");

export default function Page() {
  return (
    <BrandingPage/>
  );
}