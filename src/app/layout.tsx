import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Propeldock — A clearer way to work together",
  description: "Collaborative operating system for agencies and their clients. Move work forward.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-brand-seafoam selection:text-brand-teal">
        {children}
      </body>
    </html>
  );
}
