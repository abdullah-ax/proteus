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
      <body className="app-body">
        <div className="app-shell">
          <div className="app-screen">
            <ConvexClientProvider>
              <RewardsProvider>{children}</RewardsProvider>
            </ConvexClientProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
