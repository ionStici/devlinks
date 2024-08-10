import { Instrument_Sans } from "next/font/google";
import "./globals.css";

const sans = Instrument_Sans({ subsets: ["latin"] });

export const metadata = {
  title: { template: "%s // DevLinks", default: "DevLinks" },
  description: "Links Sharing App // Frontend Mentor Challenge",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`w-screen flex items-center justify-center bg-light_grey ${sans.className} text-base`}
      >
        <div className="flex-grow">{children}</div>
      </body>
    </html>
  );
}
