import { Hero } from "@/components/layout/landing/hero";
import { Brands } from "@/components/layout/landing/brands";
import { Features } from "@/components/layout/landing/features";
import { Editorial } from "@/components/layout/landing/editorial";
import { NewArrivals } from "@/components/layout/landing/new-arrivals";
import { Gallery } from "@/components/layout/landing/gallery";
import { Testimonials } from "@/components/layout/landing/testimonials";
import { CTA } from "@/components/layout/landing/cta";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-brand-primary focus:text-background focus:px-4 focus:py-2 focus:text-sm focus:font-bold"
      >
        Skip to main content
      </Link>
      <main id="main-content" className="min-h-screen bg-background-light">
        <Hero />
        <Brands />
        <Editorial />
        <NewArrivals />
        <Features />
        <Gallery />
        <Testimonials />
        <CTA />
      </main>
    </>
  );
}
