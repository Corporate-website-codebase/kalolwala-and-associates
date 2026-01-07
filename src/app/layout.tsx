// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
// import { Dosis } from "next/font/google";
import { Anton } from "next/font/google";
import { Noto_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";

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
export const metadata: Metadata = {
  title: "K&A - India's largest independent stakeholder communication agency",
  description: "India's largest independent stakeholder communication agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/zmg6oqe.css" />
      </head>
      <body className={`${anton.variable} ${noto.variable}  antialiased`}>
        <Navbar />
        <SmoothScroll>
          <main className="relative w-full h-full">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}