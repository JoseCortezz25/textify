import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Textify Docs",
  description: "Turn your ideas into neat drafts with ease, optimizing your time and ensuring the appropriate tone, on any internet writing platform."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      {children}
    </main>
  );
}
