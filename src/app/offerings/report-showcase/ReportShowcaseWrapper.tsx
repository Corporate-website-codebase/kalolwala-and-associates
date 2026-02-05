// "use client";

// import { useSearchParams } from "next/navigation";
// import { PAYLOADS } from "@/data/payloads";
// import ReportShowcase from "@/components/services/ReportShowcase";

// export default function ReportShowcaseWrapper() {
//   const params = useSearchParams();
//   const key = params.get("key") || "integrated";

//   const payload = PAYLOADS[key];

//   return <ReportShowcase {...payload} />;
// }

"use client";

import { useSearchParams, redirect } from "next/navigation";
import { PAYLOADS } from "@/data/payloads";
import ReportShowcase from "@/components/services/ReportShowcase";
import { useEffect } from "react";

export default function ReportShowcaseWrapper() {
  const params = useSearchParams();
  const rawKey = params.get("key");
  
  // 1. Check if the key exists and is present in your PAYLOADS data
  const isValid = rawKey && Object.prototype.hasOwnProperty.call(PAYLOADS, rawKey);

  // 2. If the key is missing or invalid, redirect to the Base URL (Home)
  if (!isValid) {
    redirect("/offerings"); // 👈 Redirects to localhost:3000/
    // If you want to redirect to the default report instead, use:
    // redirect("/report-showcase?key=integrated");
  }

  // 3. If valid, get the data and render
  const payload = PAYLOADS[rawKey];

  return <ReportShowcase {...payload} />;
}