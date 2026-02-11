// app/layout.tsx
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
// import { Dosis } from "next/font/google";
import { Anton } from "next/font/google";
import { Noto_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import { PassTransitionProvider } from "@/components/StackedCurtainTransition";
import Popup from "@/components/Popup";
import { PAGE_METADATA } from "@/data/metadata";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});
// const dosis = Dosis({
//   weight: "400",
//   subsets: ["latin"],
//   variable: "--font-noto-sans",
// });
const noto = Noto_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-noto-sans",
});

const home = PAGE_METADATA.home;
export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000/"),
  title: home.title,
  description: home.description,
  alternates: {
    canonical: home.canonical,
    languages: {
      en: process.env.SITE_URL || "http://localhost:3000/",
      "x-default": process.env.SITE_URL || "http://localhost:3000/",
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
          strategy="afterInteractive"
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
        <link rel="stylesheet" href="https://use.typekit.net/zmg6oqe.css" />
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
            <main className="relative w-full h-full">{children}</main>
          </SmoothScroll>
          <Popup />
        </PassTransitionProvider>
      </body>
    </html>
  );
}
