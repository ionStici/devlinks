import { Instrument_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
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
        {/* prettier-ignore */}
        <Toaster position="bottom-center" toastOptions={{ duration: 3000, style: { background: "#333", color: "#fff", fontWeight: "600", fontSize: "16px", paddingLeft: '16px' }, }} />
        <div className="flex-grow">{children}</div>
      </body>
    </html>
  );
}
