import type { Metadata } from "next";
import "./globals.css";
import Background from "@/components/background";

export const metadata: Metadata = {
  title: "Elliot Luo | Personal Site",
  description: "Personal website of Elliot Luo"
};


export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}


