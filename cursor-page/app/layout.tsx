import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CursorPage - Fluid Cursor Effects",
  description: "Next.js 16 project with WebGL fluid cursor effects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
