import type { Metadata } from "next";
import "./globals.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Pictures in Ceramic - Enamel Memorial Cameos",
  description:
    "Custom enamel photo memorial cameos for headstones and mausoleums.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-50 text-neutral-900">
        <Nav />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
