"use client";

import { useState, useCallback } from "react";
import { Menu, X, Search, ShoppingBag, Triangle } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { CartDrawer } from "./cart-drawer";
import { useAuth } from "@/context/auth.context";
import { ProfileButton } from "@/module/user/component/profile-button";
import { UserCircle } from "lucide-react";

const navLinks = [
  { label: "The Archive", href: "/category/archive" },
  { label: "Designers", href: "/category/designers" },
  { label: "New Arrivals", href: "/category/new-arrivals" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
] as const;

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user } = useAuth();
  const closeMenu = useCallback(() => setIsOpen(false), []);
  const openMenu = useCallback(() => setIsOpen(true), []);
  const openCart = useCallback(() => setIsCartOpen(true), []);

  return (
    <>
      <header className="fixed top-0 w-full z-50" role="banner">
        <div className="md:hidden px-3 pt-3">
          <nav
            className="flex h-14 items-center justify-between rounded-full border border-border-color bg-background-light/85 px-4 backdrop-blur-xl shadow-sm"
            aria-label="Main navigation"
          >
            <button
              onClick={openMenu}
              className="text-brand-primary p-2 -ml-2 hover:text-brand-accent transition-colors"
              aria-label="Open navigation menu"
              aria-expanded={isOpen}
              aria-controls="mobile-nav-drawer"
            >
              <Menu className="w-5 h-5" aria-hidden="true" />
            </button>
            <Link
              className="flex items-center gap-2 group"
              href="/"
              aria-label="Luxe Rental — Home"
            >
              <Triangle
                className="w-4 h-4 text-brand-accent fill-brand-accent transition-transform group-hover:rotate-12"
                aria-hidden="true"
              />
              <span className="font-serif text-lg font-bold tracking-tight text-brand-primary">
                LUXE RENTAL
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={openCart}
                className="text-brand-primary relative p-1.5 hover:text-brand-accent transition-colors"
                aria-label="Shopping bag, 0 items"
              >
                <ShoppingBag className="w-5 h-5" aria-hidden="true" />
                <span
                  className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-accent text-[9px] font-bold text-background"
                  aria-hidden="true"
                >
                  0
                </span>
              </button>
            </div>
          </nav>
        </div>

        {/* ─── DESKTOP: full-width two-row bar ─── */}
        <div className="hidden md:block">
          {/* Top row: social + logo + search/theme/cart */}
          <div className="bg-background-light/90 backdrop-blur-xl border-b border-border-color">
            <div className="max-w-[1440px] mx-auto px-12">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center gap-4 text-brand-primary">
                  <Link
                    href="#"
                    className="hover:text-brand-accent transition-colors"
                    aria-label="GitHub"
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </Link>
                  <Link
                    href="#"
                    className="hover:text-brand-accent transition-colors"
                    aria-label="Twitter"
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </Link>
                  <Link
                    href="#"
                    className="hover:text-brand-accent transition-colors"
                    aria-label="Instagram"
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </Link>
                </div>

                {/* Center: Logo */}
                <Link
                  className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 hover:opacity-80 transition-opacity group"
                  href="/"
                  aria-label="Luxe Rental — Home"
                >
                  <Triangle
                    className="w-5 h-5 text-brand-accent fill-brand-accent transition-transform group-hover:rotate-12"
                    aria-hidden="true"
                  />
                  <span className="font-serif text-2xl font-bold tracking-tight text-brand-primary">
                    LUXE RENTAL
                  </span>
                </Link>

                {/* Right: search, theme, cart */}
                <div className="flex items-center gap-4">
                  <button
                    className="flex items-center gap-2 rounded-full bg-surface/60 border border-border-color px-4 py-2 text-xs text-text-muted hover:border-brand-primary/30 transition-colors cursor-pointer"
                    aria-label="Open search archive"
                    aria-haspopup="dialog"
                  >
                    <span className="font-sans tracking-wider">
                      Search here...
                    </span>
                    <Search className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <ThemeToggle />
                  <button
                    onClick={openCart}
                    className="text-brand-primary relative hover:text-brand-accent transition-all p-1.5"
                    aria-label="Shopping bag, 0 items"
                  >
                    <ShoppingBag className="w-5 h-5" aria-hidden="true" />
                    <span
                      className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-accent text-[9px] font-bold text-background"
                      aria-hidden="true"
                    >
                      0
                    </span>
                  </button>

                  <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-2 hidden lg:block" />

                  {user ? (
                    <ProfileButton />
                  ) : (
                    <Link
                      href="/login"
                      className="hidden lg:flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-slate-100 hover:text-primary transition-colors h-10 px-4 group"
                    >
                      <UserCircle className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
                      Sign In
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          <nav
            className="bg-background-light/80 backdrop-blur-xl border-b border-border-color"
            aria-label="Main navigation"
          >
            <div className="max-w-[1440px] mx-auto px-12">
              <ul
                className="flex items-center justify-center gap-10 h-12"
                role="menubar"
                aria-label="Primary navigation"
              >
                {navLinks.map((link) => (
                  <li key={link.label} role="none">
                    <Link
                      href={link.href}
                      role="menuitem"
                      className="relative font-sans text-sm text-text-main hover:text-brand-accent transition-colors tracking-wide group"
                    >
                      {link.label}
                      <span
                        className="absolute -bottom-1 left-0 w-0 h-px bg-brand-accent transition-all duration-300 group-hover:w-full"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-60 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />
      <aside
        id="mobile-nav-drawer"
        className={`fixed top-0 left-0 h-full w-[300px] z-70 bg-background-light shadow-2xl transform transition-transform duration-500 ease-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-border-color">
            <span className="font-serif text-lg font-bold tracking-tight text-brand-primary">
              LUXE RENTAL
            </span>
            <button
              onClick={closeMenu}
              className="text-brand-primary hover:text-brand-accent transition-colors p-1"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-6">
            <nav aria-label="Mobile navigation">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className="block text-brand-primary font-sans text-base font-medium tracking-wide py-3 px-4 rounded-lg hover:bg-surface hover:text-brand-accent transition-all"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-8 pt-6 border-t border-border-color">
              <Link
                href="/search"
                onClick={closeMenu}
                className="flex items-center gap-3 text-brand-primary font-sans text-sm font-bold uppercase tracking-widest py-3 px-4 rounded-lg hover:bg-surface hover:text-brand-accent transition-all"
                aria-label="Search the archive"
              >
                <Search className="w-4 h-4" aria-hidden="true" />
                Search Archive
              </Link>
              <button
                onClick={() => {
                  closeMenu();
                  openCart();
                }}
                className="flex w-full items-center gap-3 text-brand-primary font-sans text-sm font-bold uppercase tracking-widest py-3 px-4 rounded-lg hover:bg-surface hover:text-brand-accent transition-all"
                aria-label="View shopping bag"
              >
                <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                Shopping Bag
              </button>
            </div>
          </div>

          <div className="p-6 border-t border-border-color bg-slate-50/50 dark:bg-slate-900/20">
            {user ? (
              <div className="flex justify-center">
                <ProfileButton />
              </div>
            ) : (
              <Link
                href="/login"
                onClick={closeMenu}
                className="block w-full text-center bg-brand-primary text-background py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-brand-accent transition-all duration-300 rounded-none"
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      </aside>

      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  );
}
