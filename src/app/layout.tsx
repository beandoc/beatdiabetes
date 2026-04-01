import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Beat Diabetes — Clinical Patient Portal",
  description: "Official T1D Patient Handbook and Management Portal - Command Hospital (SC), Pune",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
