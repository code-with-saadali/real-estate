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
      className={`${cinzel.variable} ${poppins.variable} h-full font-serif antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#efefef] text-[#1c1c1a] has-[[aria-label='Property_actions']]:pb-[calc(80px+env(safe-area-inset-bottom))] md:has-[[aria-label='Property_actions']]:pb-0 [&_:is(button,a,input,select,textarea)]:[-webkit-tap-highlight-color:transparent] [&_:focus-visible]:outline-2 [&_:focus-visible]:outline-solid [&_:focus-visible]:outline-[#8a7045] [&_:focus-visible]:outline-offset-4">
        <SmoothScroll />
        <Navbar />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
