export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header style={{padding:20,fontSize:28,fontWeight:'bold'}}>Pictures in Ceramic</header>
        <main style={{padding:20}}>{children}</main>
      </body>
    </html>
  );
}