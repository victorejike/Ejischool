import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ejischool.com"),
  title: {
    default: "EJISCHOOL - Learn Software Development",
    template: "%s | EJISCHOOL"
  },
  description: "Modern W3Schools-style software learning platform with tutorials, playgrounds, certificates, and AI tutor support."
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
