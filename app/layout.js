import { Instrument_Sans } from "next/font/google";
import "./globals.css";

const sans = Instrument_Sans({ subsets: ["latin"] });

export const metadata = {};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${sans.className} bg-light_grey`}>{children}</body>
    </html>
  );
}
