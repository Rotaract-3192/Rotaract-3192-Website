import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@/lib/mockAuthClient";

export const metadata: Metadata = {
  title: "Rotaract District 3192 Portal",
  description: "Rotaract District 3192 administrative and member portal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth" suppressHydrationWarning>
        <head>
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link
            href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Manrope:wght@200;400;600;800&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="antialiased min-h-screen">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
