import { Instrument_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const sans = Instrument_Sans({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: "%s // devlinks",
    default: "devlinks | Centralize Your Developer Presence",
  },
  description:
    "Build and customize your devlinks profile to share all your developer-related links in one place. Seamlessly connect your GitHub, LinkedIn, and other platforms with a single, sharable URL.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.className} text-base text-dark_grey`}>
      <body className="w-screen flex items-center justify-center overflow-x-hidden bg-light_grey">
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 4000,
            style: {
              maxWidth: "650px",
              paddingLeft: "16px",
              borderRadius: "12px",
              background: "#333",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "600",
              lineHeight: "24px",
            },
          }}
        />
        <div className="flex-grow">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
