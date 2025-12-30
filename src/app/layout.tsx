import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/providers/language-provider";
import enMessages from "@/messages/en.json";
import { routing } from "@/i18n/routing";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AskMi",
  description: "Connecting Brands with Influencers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get default locale messages
  const locale = routing.defaultLocale;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <LanguageProvider locale={locale} messages={enMessages}>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
