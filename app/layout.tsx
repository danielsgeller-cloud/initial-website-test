import "../styles/globals.css";

export const metadata = {
  title: "Pictures in Ceramic",
  description: "Premium enamel memorial cameos since 1993",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="site-header-inner">
            <div className="brand">
              <span className="brand-title">Pictures in Ceramic</span>
              <span className="brand-tagline">
                Premium enamel memorial cameos since 1993
              </span>
            </div>
            <nav className="main-nav">
              <a href="/">Home</a>
              <a href="/about">About</a>
              <a href="/shop">Shop</a>
              <a href="/contact">Order Form</a>
            </nav>
          </div>
        </header>

        <main className="page-container">{children}</main>

        <footer className="site-footer">
          <p>© {new Date().getFullYear()} Pictures in Ceramic. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
