import type { Metadata } from "next";
import "./globals.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { LanguageProvider } from "../components/i18n/LanguageProvider";
import Providers from "./providers";

export const metadata: Metadata = {
    icons: { icon: "/favicon.svg" },
title: "Pictures in Ceramic - Enamel Memorial Cameos",
  description:
    "Custom enamel memorial medallions for headstones, mausoleums, homes, and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-50 text-neutral-900">
        <Providers>
          <LanguageProvider>
            <Nav />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </LanguageProvider>
        </Providers>
      </body>
    </html>
  );
}
