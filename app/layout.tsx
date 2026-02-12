import type { Metadata } from "next";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { RewardsProvider } from "./RewardsProvider";

export const metadata: Metadata = {
  title: "Proteus",
  description: "Underwater pipelines"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ConvexClientProvider>
          <RewardsProvider>{children}</RewardsProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
