import type { Metadata } from "next";
import { CANONICALS, PAGE_TITLES, PAGE_DESCRIPTIONS } from "@/constants/seo";
import { Suspense } from "react";
import ReportShowcaseWrapper from "./ReportShowcaseWrapper";

export const metadata: Metadata = {
  title: PAGE_TITLES.reportShowcase,
  description: PAGE_DESCRIPTIONS.reportShowcase,
  alternates: {
    canonical: CANONICALS.reportShowcase,
  },
};

export default function ReportShowcasePage() {
  return (
    <Suspense fallback={<div className="p-10">Loading...</div>}>
      <ReportShowcaseWrapper />
    </Suspense>
  );
}
