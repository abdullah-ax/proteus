import type { Metadata } from "next";
import { Bebas_Neue, Manrope } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { RewardsProvider } from "./RewardsProvider";

const displayFont = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-ocean-display",
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-ocean-body",
});

export const metadata: Metadata = {
  title: "Proteus — Red Sea Explorer",
  description: "AI-powered Red Sea exploration platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${bodyFont.variable} ocean-font`}>
        <ConvexClientProvider>
          <RewardsProvider>{children}</RewardsProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
