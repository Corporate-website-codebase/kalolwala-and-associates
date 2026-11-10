
import { getMetadata } from "@/data/metadata";
import WebsitePage from "./WebsitePage";

export const metadata = getMetadata("digital");

export default function Page() {
  return (
    <WebsitePage/>
  );
}