import type { Metadata } from "next";
import { Anonymous_Pro } from "next/font/google";
import "./globals.css";
import HashedBorder from "./components/HashedBorder";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import { AppContextProvider } from "./context/AppContext";

const font = Anonymous_Pro({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EHAX",
  description:
    "Welcome to EHAX, we are the official ethical hacking and cybersecurity society of DTU.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className}`}>
        <AppContextProvider>
          <HashedBorder>
            <Loader>
              <Navbar />
              {children}
            </Loader>
          </HashedBorder>
        </AppContextProvider>
          

        <script defer src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
        <script defer src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.globe.min.js"></script>
        <script defer src="/bg.js"></script>
      </body>
    </html>
  );
}
