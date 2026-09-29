import type { Metadata } from "next";
// Remove standard Script import
import "./globals.css";
import { Anton, Noto_Sans } from "next/font/google";
// Import the optimized GTM component
import { GoogleTagManager } from "@next/third-parties/google";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import { PassTransitionProvider } from "@/components/StackedCurtainTransition";
import Popup from "@/components/Popup";
import { PAGE_METADATA } from "@/data/metadata";
import Script from "next/script";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-anton",
});

const noto = Noto_Sans({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans",
});
const home = PAGE_METADATA.home;
export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "https://www.kalolwala.com"),
  title: home.title,
  description: home.description,
openGraph: {
    title: home.title,
    description: home.description,
    siteName: "Kalolwala & Associates",
    url: process.env.SITE_URL || "https://www.kalolwala.com/",
    type: "website",
    images: [
      {
        url: `/api/og.png?title=${encodeURIComponent((home.title || '').replace(/[\u2018\u2019]/g, "'"))}&path=%2F`,
        type: "image/png",
        width: 1200,
        height: 630,
        alt: home.title,
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: home.title,
    description: home.description,
    images: [`/api/og.png?title=${encodeURIComponent((home.title || '').replace(/[\u2018\u2019]/g, "'"))}&path=%2F`],
  },
  alternates: {
    canonical: home.canonical,
    languages: {
      en: process.env.SITE_URL || "https://www.kalolwala.com",
      "x-default": process.env.SITE_URL || "https://www.kalolwala.com",
    },
  },
  verification: {
    google: "nZdF0YGHOkhdaZjvtTM7t5y7tvx23ggkUuKt3HwUopM",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${anton.variable} ${noto.variable}  antialiased`}>
        <GoogleTagManager gtmId="GTM-N6SR3K3C" />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N6SR3K3C"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <PassTransitionProvider colors={["#555555", "#3D3D3D", "#252525"]}>
          <Navbar />
          {/* <SmoothScroll> */}
            <main className="relative w-full h-full selection:bg-yellow-400/15">{children}</main>
          {/* </SmoothScroll> */}
          {/* <Popup /> */}
        </PassTransitionProvider>
      </body>
    </html>
  );
}
