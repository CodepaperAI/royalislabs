import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, Source_Serif_4 } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ConsentGate } from "@/components/ConsentGate";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap"
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap"
});

const googleTagManagerId = "GTM-TSBCV8CR";

export const metadata: Metadata = {
  title: {
    default: "Royalis Labs | Canadian research peptide catalogue",
    template: "%s | Royalis Labs"
  },
  description:
    "A clean Canadian research peptide catalogue with product data, product imagery, testing status, and discreet domestic shipping.",
  metadataBase: new URL("https://royalislabs.com"),
  icons: {
    icon: "/favicon.svg"
  },
  openGraph: {
    title: "Royalis Labs",
    description:
      "Reference-grade research peptides with clear product details, testing status, and Canada-only shipping.",
    url: "https://royalislabs.com",
    siteName: "Royalis Labs",
    images: [
      {
        url: "/products-original/retatrutide-10mg.png",
        width: 960,
        height: 1200,
        alt: "Royalis Labs Retatrutide 10mg product image"
      }
    ],
    locale: "en_CA",
    type: "website"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${ibmPlexSans.variable} ${sourceSerif.variable}`}>
      <Script id="google-tag-manager" strategy="beforeInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${googleTagManagerId}');
        `}
      </Script>
      <body className="font-sans">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Header />
        <ConsentGate />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
