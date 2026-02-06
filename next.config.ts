import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Legacy Redirects: /offerings/report-showcase?key=x -> /offerings/[slug]
      {
        source: "/offerings/report-showcase",
        has: [{ type: "query", key: "key", value: "video" }],
        destination: "/offerings/corporate-films-video-reports",
        permanent: true,
      },
      {
        source: "/offerings/report-showcase",
        has: [{ type: "query", key: "key", value: "integrated" }],
        destination: "/offerings/integrated-annual-reporting",
        permanent: true,
      },
      {
        source: "/offerings/report-showcase",
        has: [{ type: "query", key: "key", value: "sustainability" }],
        destination: "/offerings/sustainability-esg-reporting",
        permanent: true,
      },
      {
        source: "/offerings/report-showcase",
        has: [{ type: "query", key: "key", value: "web" }],
        destination: "/offerings/corporate-websites",
        permanent: true,
      },
      {
        source: "/offerings/report-showcase",
        has: [{ type: "query", key: "key", value: "presentations" }],
        destination: "/offerings/investor-corporate-presentations",
        permanent: true,
      },
      {
        source: "/offerings/report-showcase",
        has: [{ type: "query", key: "key", value: "branding" }],
        destination: "/offerings/corporate-branding-design",
        permanent: true,
      },
      // Fallback for base report-showcase (redirect to offerings home)
      {
        source: "/offerings/report-showcase",
        destination: "/offerings",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
