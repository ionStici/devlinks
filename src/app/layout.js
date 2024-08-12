import { Instrument_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
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
    <html lang="en">
      <body
        className={`w-screen flex items-center justify-center bg-light_grey ${sans.className} text-base`}
      >
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 5000,
            style: {
              maxWidth: "500px",
              background: "#333",
              color: "#fff",
              fontWeight: "600",
              fontSize: "16px",
              paddingLeft: "16px",
            },
          }}
        />
        <div className="flex-grow">{children}</div>
      </body>
    </html>
  );
}
