
import { Suspense } from "react";
import ReportShowcaseWrapper from "./ReportShowcaseWrapper";

export default function ReportShowcasePage() {
  return (
    <Suspense fallback={<div className="p-10">Loading...</div>}>
      <ReportShowcaseWrapper />
    </Suspense>
  );
}
