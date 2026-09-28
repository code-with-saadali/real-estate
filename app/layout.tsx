import type { Metadata } from "next";
import { Cinzel, Poppins } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";
import SmoothScroll from "./_components/SmoothScroll";
import Navbar from "./_components/Navbar";
import SiteFooter from "./_components/SiteFooter";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Vistelya — A different perspective on living", template: "%s | Vistelya" },
  description: "Discover considered homes, beautiful surroundings, and a different perspective on living with Vistelya.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll />
        <Navbar />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
