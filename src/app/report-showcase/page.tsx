import type { Metadata } from "next";
import { Suspense } from "react";
import ReportShowcaseWrapper from "./ReportShowcaseWrapper";

export const metadata: Metadata = {
  title: "Report Showcase | K&A",
  alternates: {
    canonical: "/report-showcase",
  },
};

export default function ReportShowcasePage() {
  return (
    <Suspense fallback={<div className="p-10">Loading...</div>}>
      <ReportShowcaseWrapper />
    </Suspense>
  );
}
