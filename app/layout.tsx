import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { LanguageProvider } from "../components/LanguageProvider";

export const metadata: Metadata = {
  title: "Pictures in Ceramic - Enamel Memorial Cameos",
  description:
    "Custom enamel memorial medallions for headstones, mausoleums, and home memorials.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-50 text-neutral-900">
        <LanguageProvider>
          <Nav />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}