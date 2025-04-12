import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppConfig from "./main";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rezoom4Zoom | AI-Powered Resume Tools",
  description: "Parse, analyze and optimize your resume with AI-powered tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interSans.variable} antialiased min-h-screen bg-background text-body`}
      >
        <AppConfig>
          {children}
        </AppConfig>
      </body>
    </html>
  );
}
