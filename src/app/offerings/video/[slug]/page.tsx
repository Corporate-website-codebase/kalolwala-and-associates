"use client";

import ReportShowcase from "@/components/services/ReportShowcase";
import { PAYLOADS } from "@/data/payloads";
import { notFound, useRouter, useParams } from "next/navigation";

// Mapping from URL slug to internal data 'type'
const SLUG_TO_TYPE: Record<string, string> = {
  "corporate-films-video-reports": "corporate",
  "annual-report-video-reports": "annual",
};

export default function VideoCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const payload = PAYLOADS["video"];

  const activeType = SLUG_TO_TYPE[slug];

  if (!payload || !activeType) {
    notFound();
  }

  const handleBack = () => {
    router.push("/offerings/video");
  };

  return (
    <ReportShowcase
      {...payload}
      activeKey="video"
      activeType={activeType}
      onBack={handleBack}
    />
  );
}
