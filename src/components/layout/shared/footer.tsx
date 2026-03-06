import { ArrowRight, Triangle } from "lucide-react";
import Link from "next/link";

const navigationLinks = [
  { label: "The Archive", href: "/category/archive" },
  { label: "Designers", href: "/designers" },
  { label: "Journal", href: "/journal" },
  { label: "The Atelier", href: "/atelier" },
];

const serviceLinks = [
  { label: "Rent Guide", href: "/rent-guide" },
  { label: "Size & Fit", href: "/size-fit" },
  { label: "Returns", href: "/returns" },
  { label: "Dry Cleaning", href: "/dry-cleaning" },
  { label: "Contact Us", href: "/contact" },
];

export function Footer() {
  return (
    <footer
      className="bg-background-light border-t border-border-color pt-12 md:pt-24 pb-8 md:pb-12 relative z-50"
      role="contentinfo"
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-24">
          <div className="col-span-2 md:col-span-1">
            <Link
              className="flex items-center gap-2 group"
              href="/"
              aria-label="Luxe Rental — Home"
            >
              <Triangle
                className="w-5 h-5 text-brand-accent fill-brand-accent transition-transform group-hover:rotate-12"
                aria-hidden="true"
              />
              <span className="font-serif text-2xl md:text-3xl font-bold tracking-tighter text-brand-primary">
                LUXE RENTAL
              </span>
            </Link>
            <p className="mt-6 text-sm text-text-main/70 leading-relaxed font-sans">
              A digital sanctuary for the modern connoisseur. Curating
              excellence in sustainable fashion consumption.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <h3 className="text-xs font-bold tracking-widest uppercase mb-6 md:mb-8">
              Navigation
            </h3>
            <ul className="space-y-4 text-xs font-bold tracking-widest uppercase text-text-muted">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    className="hover:text-brand-primary transition-colors"
                    href={link.href}
                    aria-label={`Explore our curated ${link.label}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Client services">
            <h3 className="text-xs font-bold tracking-widest uppercase mb-6 md:mb-8">
              Client Service
            </h3>
            <ul className="space-y-4 text-xs font-bold tracking-widest uppercase text-text-muted">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    className="hover:text-brand-primary transition-colors"
                    href={link.href}
                    aria-label={`View our ${link.label} service information`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h3 className="text-xs font-bold tracking-widest uppercase mb-6 md:mb-8">
              Newsletter
            </h3>
            <p className="text-xs text-text-muted mb-6 leading-relaxed uppercase tracking-wider">
              Join for invitations to private showroom events and new drop
              alerts.
            </p>
            <form
              className="flex border-b border-brand-primary py-2"
              aria-label="Newsletter signup"
              action="#"
              method="post"
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                className="bg-transparent border-none p-0 w-full text-[10px] focus:ring-0 placeholder-text-muted font-bold tracking-widest outline-none"
                placeholder="EMAIL ADDRESS"
                type="email"
                autoComplete="email"
                required
              />
              <button
                type="submit"
                className="text-brand-primary hover:text-brand-accent transition-colors"
                aria-label="Subscribe to newsletter"
              >
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 md:pt-12 border-t border-border-color gap-4 md:gap-6">
          <small className="text-[10px] font-bold tracking-widest uppercase text-text-muted">
            © {new Date().getFullYear()} Luxe Rental — All Rights Reserved
          </small>
          <nav
            className="flex gap-6 md:gap-8 text-[10px] font-bold tracking-widest uppercase text-text-muted"
            aria-label="Legal links"
          >
            <Link
              className="hover:text-brand-primary transition-colors"
              href="/privacy"
            >
              Privacy Policy
            </Link>
            <Link
              className="hover:text-brand-primary transition-colors"
              href="/terms"
            >
              Terms of Service
            </Link>
            <Link
              className="hover:text-brand-primary transition-colors"
              href="/cookies"
            >
              Cookies
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
