import { getMetadata } from "@/data/metadata";

export const metadata = getMetadata("faqs");

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How involved will our team need to be during the Annual Report process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The client provides inputs, attends interviews and reviews drafts. The assigned project manager is the main point of contact and handles day-to-day coordination."
      }
    },
    {
      "@type": "Question",
      "name": "Will K&A coordinate with different departments within our organisation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. K&A liaises with departments via the client's internal coordinator where possible, or the project manager will engage directly to gather Annual report content."
      }
    },
    {
      "@type": "Question",
      "name": "How do you maintain confidentiality when working with sensitive company information?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "All Annual Reports operate under confidentiality protocols and NDAs. Information is handled only by the internal project team and shared through secure channels."
      }
    },
    {
      "@type": "Question",
      "name": "Can you work with companies that already have internal content prepared?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. K&A can edit, structure and apply designing knowledge to client-provided content for Annual Reports, Sustainability Reports and ESG reports."
      }
    },
    {
      "@type": "Question",
      "name": "How does K&A structure the overall reporting process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Each Annual Report is led by a project manager who manages coordination and timelines. Research analysts conduct interviews and draft content, the editorial team refines the narrative, the creative team develops the visual layout and the production team typesets statutory reports and financial sections."
      }
    },
    {
      "@type": "Question",
      "name": "How many review stages are typically involved in a project?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Drafts are shared at multiple stages, including content drafts, edited versions and design proofs, allowing feedback to be incorporated throughout the process of Annual Report or Sustainability Report."
      }
    },
    {
      "@type": "Question",
      "name": "How do you ensure deadlines are met?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A detailed project timeline is shared at the start, and the client servicing team tracks progress with regular follow-ups and milestone reviews."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it typically take to develop an annual or sustainability report?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Typical timelines for Annual Reports and Sustainability Reports are 6-8 weeks, subject to scope and revert of input and approvals from the clients."
      }
    },
    {
      "@type": "Question",
      "name": "Can K&A assist with both print and digital report formats?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Deliverables include print-ready PDFs and production files, interactive digital PDFs, web-ready HTML reports and responsive microsites. K&A also produces investor presentations and web content derived from the report content."
      }
    },
    {
      "@type": "Question",
      "name": "Can you help us structure our sustainability or ESG disclosures?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The team converts raw ESG data into structured narrative and disclosures suitable for Sustainability Reports and ESG reports."
      }
    },
    {
      "@type": "Question",
      "name": "Can K&A support us beyond the report itself?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Support can extend to corporate presentations, coffee-table books, brochures, website content and other corporate communication materials to maintain consistency across platforms."
      }
    }
  ]
};

export default function FAQsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
