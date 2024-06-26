import type { Metadata } from "next";
import { Montserrat as FontSans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "Textify",
  description: "Turn your ideas into neat drafts with ease, optimizing your time and ensuring the appropriate tone, on any internet writing platform."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontSans.className}>
        <GoogleAnalytics gaId={process.env.GA_TRACKING_ID as string} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
      <Toaster richColors />
    </html>
  );
}
