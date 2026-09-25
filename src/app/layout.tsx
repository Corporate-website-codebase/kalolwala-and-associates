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
        url: `/api/og?title=${encodeURIComponent(home.title || '')}`,
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
    images: [`/api/og?title=${encodeURIComponent(home.title || '')}`],
  },
  alternates: {
    canonical: home.canonical,
    languages: {
      en: process.env.SITE_URL || "https://www.kalolwala.com",
      "x-default": process.env.SITE_URL || "https://www.kalolwala.com",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="gtm"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-N6SR3K3C');`,
          }}
        />
        <meta
          name="google-site-verification"
          content="nZdF0YGHOkhdaZjvtTM7t5y7tvx23ggkUuKt3HwUopM"
        />
        {/* Add preconnect to speed up Typekit fetching without removing it */}
        
        {/* <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" /> */}
        {/* <link rel="stylesheet" href="https://use.typekit.net/zmg6oqe.css" /> */}
      </head>
      <body className={`${anton.variable} ${noto.variable}  antialiased`}>
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
          <SmoothScroll>
            <main className="relative w-full h-full selection:bg-yellow-400/15">{children}</main>
          </SmoothScroll>
          {/* <Popup /> */}
        </PassTransitionProvider>
        {/* Use the native Next.js GTM component which handles hydration automatically */}
        {/* <GoogleTagManager gtmId="GTM-N6SR3K3C" /> */}
      </body>
    </html>
  );
}