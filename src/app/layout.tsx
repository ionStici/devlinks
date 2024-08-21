import ToasterConfig from "@/components/ui/ToasterConfig";
import { Analytics } from "@vercel/analytics/react";
import { type Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";

const sans = Instrument_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s // devlinks",
    default: "devlinks | Centralize Your Developer Presence",
  },
  description:
    "Build and customize your devlinks profile to share all your developer-related links in one place. Seamlessly connect your GitHub, LinkedIn, and other platforms with a single, sharable URL.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.className} text-base text-dark_grey`}>
      <body className="sm:w-screen sm:flex sm:items-center sm:justify-center sm:overflow-x-hidden">
        <ToasterConfig />
        <div className="sm:flex-grow">{children}</div>
        <Analytics mode="development" />
      </body>
    </html>
  );
}
