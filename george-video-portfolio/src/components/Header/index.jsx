"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Play } from "lucide-react";
import DarkModeToggle from "@/components/DarkModeToggle";
import { ROUTES } from "@/lib/site";

const navItems = ROUTES.filter((r) => r.nav);

const isActive = (pathname, href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        isScrolled || isMobileMenuOpen
          ? "bg-background/90 backdrop-blur-md border-b border-line"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 group" aria-label="GeorgeEditPro home">
            <div className="relative w-10 h-10 bg-linear-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-200">
              <Play className="w-5 h-5 text-white fill-white" aria-hidden="true" />
            </div>
            <span className="text-xl font-bold text-foreground">
              George<span className="text-accent-text">EditPro</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => {
              const active = isActive(pathname, item.path);
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  aria-current={active ? "page" : undefined}
                  className={`relative flex items-center min-h-11 text-sm font-medium transition-colors duration-200 group ${
                    active ? "text-foreground" : "text-muted hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {/* Scales rather than animating width, so hovering never triggers layout. */}
                  <span
                    className={`absolute bottom-3 left-0 w-full h-0.5 bg-accent origin-left transition-transform duration-200 ease-out ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
            <DarkModeToggle />
            <Link
              href="/quote"
              className="px-6 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-full transition-colors duration-200"
            >
              Get a quote
            </Link>
          </nav>

          <div className="flex items-center gap-1 md:hidden">
            <DarkModeToggle />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              className="-mr-2 p-3 text-foreground hover:text-accent-text transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-line transition-all duration-200 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <nav className="flex flex-col p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-current={isActive(pathname, item.path) ? "page" : undefined}
              className="flex items-center min-h-11 text-muted hover:text-accent-text aria-[current=page]:text-foreground font-medium py-3 px-4 rounded-lg hover:bg-accent/10 transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/quote"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-full text-center transition-colors duration-200"
          >
            Get a quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
