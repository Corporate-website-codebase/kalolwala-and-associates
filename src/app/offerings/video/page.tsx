// "use client";

// import ReportShowcase from "@/components/services/ReportShowcase";
// import { PAYLOADS } from "@/data/payloads";
// import { Metadata } from "next";
// import { useRouter } from "next/navigation";
// export const metadata: Metadata = {
//   title: "Integrated Annual Report Case Study | K&A Case Study",
//   description:
//     "How K&A shaped the integrated annual report: the narrative, structure and design choices behind it. Read the case study.",
// };
// export default function VideoSelectionPage() {
//   const router = useRouter();
//   const payload = PAYLOADS["video"];

//   const handleCategorySelect = (type: string) => {
//     // Map internal types to new URL slugs
//     if (type === "corporate") {
//       router.push("/offerings/video/corporate-films-video-reports");
//     } else if (type === "annual") {
//       router.push("/offerings/video/annual-report-video-reports");
//     } else {
//       // Fallback for unknown types
//       console.warn("Unknown video category type:", type);
//     }
//   };

//   if (!payload) {
//     return <div>Video content not found.</div>;
//   }

//   return (
//     <ReportShowcase
//       {...payload}
//       activeKey="video"
//       activeType={null}
//       onCategorySelect={handleCategorySelect}
//     />
//   );
// }
import { redirect } from "next/navigation";

export default function VideoSelectionPage() {
  // Automatically redirect users to the new route on the server
  redirect("/offerings/corporate-films-video-reports");
}