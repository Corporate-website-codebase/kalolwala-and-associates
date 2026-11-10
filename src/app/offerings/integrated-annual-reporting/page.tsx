
import { getMetadata } from "@/data/metadata";
import IntegratedReportPage from "./IntegratedReportPage";
export const metadata = getMetadata("iar");

export default function Page() {
  return (
    <IntegratedReportPage/>
  );
}