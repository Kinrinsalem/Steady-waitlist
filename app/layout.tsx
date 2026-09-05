import type { Metadata } from "next";
import { Fraunces, Instrument_Serif } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

const fraunces = Fraunces({
  variable: "--font-fraunces-face",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Steady — A calmer way to feel steady",
  description:
    "Join the Steady waitlist and be first to discover a calmer way to check in, reach out, and keep going.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
