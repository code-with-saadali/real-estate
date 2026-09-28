"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import BrandLogo from "./BrandLogo";
import { useFavourites } from "../_lib/favourites";
import { properties } from "../_lib/collection";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiChevronDown,
  FiMenu,
  FiSearch,
  FiHeart,
  FiX,
} from "react-icons/fi";

const navLinks = [
  {
    label: "Properties",
    href: "/properties",
    dropdown: [
      {
        label: "Properties for Sale",
        href: "/properties?type=sale",
      },
      {
        label: "Properties for Rent",
        href: "/properties?type=rent",
      },
      {
        label: "New Developments",
        href: "/properties?type=new",
      },
      {
        label: "Luxury Collection",
        href: "/properties?type=luxury",
      },
    ],
  },
  {
    label: "Areas",
    href: "/areas",
  },
  {
    label: "Agents",
    href: "/agents",
  },
  {
    label: "About",
    href: "/about",
  },
];

const mobileLinks = [
  {
    number: "01",
    label: "Properties",
    href: "/properties",
  },
  {
    number: "02",
    label: "Buy",
    href: "/properties?type=sale",
  },
  {
    number: "03",
    label: "Rent",
    href: "/properties?type=rent",
  },
  {
    number: "04",
    label: "New Developments",
    href: "/properties?type=new",
  },
  {
    number: "05",
    label: "Areas",
    href: "/areas",
  },
  {
    number: "06",
    label: "Agents",
    href: "/agents",
  },
  {
    number: "07",
    label: "About",
    href: "/about",
  },
];

const menuVariants = {
  closed: {
    x: "100%",
  },
  open: {
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.76, 0, 0.24, 1] as const,
    },
  },
  exit: {
    x: "100%",
    transition: {
      duration: 0.55,
      ease: [0.76, 0, 0.24, 1] as const,
    },
  },
};

const linkContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.18,
    },
  },
};

const linkItem = {
  hidden: {
    y: 30,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function Navbar() {
  const { saved } = useFavourites();
  const savedCount = properties.filter((property) => saved.includes(property.slug)).length;
  const pathname = usePathname();
  const lenis = useLenis();
  const [menuOpen, setMenuOpen] = useState(false);
  const [propertyOpen, setPropertyOpen] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (menuOpen) lenis?.stop();
    else lenis?.start();

    return () => {
      document.body.style.overflow = previousOverflow;
      if (menuOpen) lenis?.start();
    };
  }, [menuOpen, lenis]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setPropertyOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <header
        className="border-b border-black/5 bg-[#EFEFEF] absolute left-0 top-0 z-50 w-full transition-all duration-500 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-18.5 items-center justify-between px-4 md:px-8 lg:h-21 lg:px-16">
          {/* DESKTOP LEFT */}
          <nav className="hidden flex-1 items-center gap-8 lg:flex">
            {navLinks.map((item) =>
              item.dropdown ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setPropertyOpen(true)}
                  onMouseLeave={() => setPropertyOpen(false)}
                  onFocus={() => setPropertyOpen(true)}
                  onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPropertyOpen(false); }}
                >
                  <Link
                    href={item.href}
                    className="group flex h-21 items-center gap-1.5 text-[13px] font-medium text-[#1C1C1A]"
                  >
                    <span className="relative">
                      {item.label}

                      <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-[#1C1C1A] transition-all duration-300 group-hover:w-full" />
                    </span>

                    <FiChevronDown
                      className={`text-[13px] transition-transform duration-300 ${
                        propertyOpen ? "rotate-180" : ""
                      }`}
                    />
                  </Link>

                  <AnimatePresence>
                    {propertyOpen && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 8,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: 8,
                        }}
                        transition={{
                          duration: 0.2,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="absolute left-0 top-[70px] w-[290px] border border-black/10 bg-[#F8F6F1] p-2 shadow-[0_24px_60px_rgba(0,0,0,0.10)]"
                      >
                        <div className="px-4 pb-3 pt-3">
                          <p className="text-[10px] font-medium uppercase text-black/40">
                            Explore
                          </p>
                        </div>

                        {item.dropdown.map((link) => (
                          <Link
                            key={link.label}
                            href={link.href}
                            onNavigate={() => setPropertyOpen(false)}
                            className="group flex items-center justify-between px-4 py-3.5 text-[13px] text-[#222] transition-colors duration-300 hover:bg-[#ECE9E2]"
                          >
                            {link.label}

                            <FiArrowUpRight className="text-[14px] opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                          </Link>
                        ))}

                        <div className="mt-2 border-t border-black/[0.08] p-2 pt-3">
                          <Link
                            href="/properties"
                            className="flex items-center justify-between px-2 py-2 text-[12px] font-medium text-black/60 transition-colors hover:text-black"
                          >
                            View all properties

                            <FiArrowUpRight />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="group relative text-[13px] font-medium text-[#1C1C1A]"
                >
                  {item.label}

                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-[#1C1C1A] transition-all duration-300 group-hover:w-full" />
                </Link>
              )
            )}
          </nav>

          {/* MOBILE LEFT */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="flex h-10 items-center gap-2 text-[#1C1C1A] lg:hidden"
          >
            <FiMenu className="text-[19px]" />

            <span className="hidden text-[11px] font-medium uppercase md:block">
              Menu
            </span>
          </button>

          {/* LOGO */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2"
          >
            <BrandLogo />
          </Link>

          {/* RIGHT */}
          <div className="flex flex-1 items-center justify-end gap-3">
            <Link
              href="/properties?saved=1#saved-homes"
              aria-label={`Saved homes (${savedCount})`}
              title="Saved homes"
              className="relative flex h-10 min-w-10 items-center justify-center gap-2 rounded-full border border-black/15 px-2 text-[#1C1C1A] transition-colors hover:bg-[#e9e7df] xl:px-4"
            >
              <FiHeart aria-hidden="true" className={`text-lg ${savedCount ? "fill-[#8a7045] text-[#8a7045]" : ""}`} />
              <span className="hidden text-xs xl:inline">Saved homes</span>
              <span className="font absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#1c1c1a] px-1 text-[9px] text-white">{savedCount}</span>
            </Link>
            <Link
              href="/properties#property-search"
              aria-label="Search"
              className="hidden h-10 w-10 items-center justify-center border border-black/10 text-[#1C1C1A] transition-all duration-300 hover:border-black hover:bg-[#1C1C1A] hover:text-white md:flex"
            >
              <FiSearch className="text-[16px]" />
            </Link>

            <Link
              href="/contact?intent=list"
              className="group hidden items-center gap-2 bg-[#1C1C1A] px-5 py-3 text-[12px] font-medium text-white transition-colors duration-300 hover:bg-black lg:flex"
            >
              List Property

              <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>

            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center border border-black/10 text-[#1C1C1A] lg:hidden"
            >
              <FiMenu className="text-[18px]" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-[2px] lg:hidden"
          >
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="exit"
              className="absolute right-0 top-0 flex h-full w-full max-w-[620px] flex-col bg-[#F3F1EC]"
            >
              {/* MOBILE HEADER */}
              <div className="flex h-[74px] shrink-0 items-center justify-between border-b border-black/[0.08] px-4 md:h-[80px] md:px-8 lg:px-16">
                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2"
                >
                  <BrandLogo />
                </Link>

                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="group flex h-10 w-10 items-center justify-center border border-black/10 text-[#1C1C1A] transition-all duration-300 hover:bg-[#1C1C1A] hover:text-white"
                >
                  <FiX className="text-[18px] transition-transform duration-500 group-hover:rotate-90" />
                </button>
              </div>

              {/* MOBILE CONTENT */}
              <div data-lenis-prevent className="flex flex-1 flex-col overflow-y-auto px-4 pb-5 pt-7 md:px-8 md:pt-9 lg:px-16">
                {/* TOP LABEL */}
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.15,
                    duration: 0.5,
                  }}
                  className="mb-5 flex items-center justify-between"
                >
                  <p className="text-[10px] font-medium uppercase text-black/35">
                    Navigation
                  </p>

                  <p className="text-[10px] uppercase text-black/30">
                    Real Estate
                  </p>
                </motion.div>

                {/* LINKS */}
                <motion.nav
                  variants={linkContainer}
                  initial="hidden"
                  animate="visible"
                  className="border-t border-black/[0.08]"
                >
                  {mobileLinks.map((item) => (
                    <motion.div
                      key={item.label}
                      variants={linkItem}
                      className="overflow-hidden"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="group relative flex items-center justify-between border-b border-black/[0.08] py-[15px] md:py-[17px]"
                      >
                        <div className="flex items-start gap-4">
                          <span className="mt-1 text-[9px] font-medium text-black/30">
                            {item.number}
                          </span>

                          <span className="text-[25px] font-medium text-[#1C1C1A] md:text-[31px]">
                            {item.label}
                          </span>
                        </div>

                        <span className="flex h-8 w-8 items-center justify-center overflow-hidden">
                          <FiArrowUpRight className="text-[17px] text-black/35 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-black" />
                        </span>

                        <span className="absolute bottom-0 left-0 h-px w-0 bg-[#1C1C1A] transition-all duration-500 group-hover:w-full" />
                      </Link>
                    </motion.div>
                  ))}
                </motion.nav>

                {/* PROPERTY CTA */}
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.5,
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mt-8"
                >
                  <Link
                    href="/contact"
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-center justify-between bg-[#1C1C1A] px-5 py-5 text-white md:px-6 md:py-6"
                  >
                    <div>
                      <p className="text-[9px] font-medium uppercase text-white/45">
                        Own a property?
                      </p>

                      <p className="mt-1.5 text-[16px] font-medium">
                        List your property with us
                      </p>
                    </div>

                    <span className="flex h-10 w-10 items-center justify-center border border-white/20 transition-all duration-300 group-hover:bg-white group-hover:text-black">
                      <FiArrowRight className="text-[16px] transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </motion.div>

                {/* FOOTER */}
                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    delay: 0.62,
                    duration: 0.5,
                  }}
                  className="mt-auto flex items-end justify-between pt-8"
                >
                  <div>
                    <p className="text-[9px] uppercase text-black/30">
                      Contact
                    </p>

                    <Link
                      href="/contact"
                      className="mt-1.5 block text-[12px] text-[#1C1C1A]"
                    >
                      Start a conversation
                    </Link>
                  </div>

                  <div className="flex gap-4">
                    <Link
                      href="/properties"
                      className="text-[11px] text-black/40 transition-colors hover:text-black"
                    >
                      Properties
                    </Link>

                    <Link
                      href="/about"
                      className="text-[11px] text-black/40 transition-colors hover:text-black"
                    >
                      About
                    </Link>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function SiteNavbar() {
  const pathname = usePathname();
  return <Navbar key={pathname} />;
}
