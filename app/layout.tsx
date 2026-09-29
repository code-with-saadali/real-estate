import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";
import SmoothScroll from "./_components/SmoothScroll";
import Navbar from "./_components/Navbar";
import SiteFooter from "./_components/SiteFooter";

const playfair = Playfair_Display({
  variable: "--font-playfair",
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
  title: {
    default: "Vistelya — A different perspective on living",
    template: "%s | Vistelya",
  },
  description:
    "Discover considered homes, beautiful surroundings, and a different perspective on living with Vistelya.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${poppins.variable} h-full font-serif antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#efefef] text-[#1c1c1a] has-aria-[aria-label='Property_actions']:pb-[calc(80px+env(safe-area-inset-bottom))] md:has-aria-[aria-label='Property_actions']:pb-0 [&_:is(button,a,input,select,textarea)]:[-webkit-tap-highlight-color:transparent] **:focus-visible:outline-2 **:focus-visible:outline-solid **:focus-visible:outline-[#8a7045] **:focus-visible:outline-offset-4">
        <SmoothScroll />
        <Navbar />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
