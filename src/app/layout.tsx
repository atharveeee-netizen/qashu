import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Qashu",
  description: "Qashu - Self-directed Quantum Reference Knowledge Base",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=Schibsted+Grotesk:wght@400;700&family=Source+Sans+Pro:ital,wght@0,400;0,600;1,400;1,600&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"
          crossOrigin="anonymous"
        />
        <script
          defer
          src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="antialiased min-h-screen bg-[#161618] text-[#e4e4e7]">
        {children}
      </body>
    </html>
  );
}
