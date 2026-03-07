"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, ArrowRight, Check } from "lucide-react";
import { Footer } from "@/components/layout/shared/footer";
import { RecommendedCarousel } from "@/components/layout/archive/recommended-carousel";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ReviewsSection } from "@/components/layout/product/reviews-section";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("4 Days");

  const formattedTitle = id
    ? id
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "Designer Product";

  // Dummy product data
  const product = {
    brand: "LOEWE",
    name: formattedTitle,
    price: 240,
    retailPrice: 2800,
    rating: 4.9,
    reviews: 24,
    sizes: ["FR 34", "FR 36", "FR 38", "FR 40", "FR 42"],
    periods: ["4 Days", "8 Days", "14 Days", "30 Days"],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDNyTlMnJ9pQswrknguZl__w7yDQ3Sm3N2sLRsNRxrTEYn29Xl2prcM2oDmnBtE50Ys9kdptItsKwI8enL7SVqwjLBkIwHTZB7vygwTbh_omS2hPl12NcBjxpvts56-fa7SL08oVL7YXHNfd9kBI8oi9kSStDB4CnxE_kqnhmPwLaEMYeG8Y8xO9ATCN-NPomIYdfSv97vZXVzhzSOM7bKqLEw-uVZi0YIpfeJiUlrpzPZWL6aZGhr8SgXipc4BG4m2y75BWDiOgKod",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDBLfA_oFc0i8MyhBwvxmJZSOHQlc7K1vYjI4-2iW99mSocIHv8XE-Ls2p40zMjxYCgvM8f0c1ZHzdlM4qNqm9D4E69_Xt4u_Zn6LuBCv53ZuzfqaZNGefwNLIQtm8q08wTdH0NeBGF91748QvCywG59AZDh0WCE1Wu1JLKv44XMPAUJxK8iYxGUcbCD-dbOwqVtco-B4KUrvpDm0WPj1gmB8W2GE5-rxBcVNe22KRc_3U1neyKnnaNRv3CGXyUXIq97_WGN57mB4CN",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDNhIvGRASgVm2-UzhtK3YeHAc_pKSCCsxlsaKszSMDXD9bKd3DhJmdjoNX40R-IOVJNEHuoxcA1sCyb5oryEMuLVwKEijO3kPNLNwSjvHq_P3rwMB0nmyXCWCGoZ6c6Z79-Qj7OcHBbeZi3ixwykJtYmIR8ThMPUd-y2f6ALVHXyxOpMxhTOYEr6hr1mQaBPf-l7uBLXnFblOyRe7bMCjxj_ca4Nu-z9NIWiNYTCwCs6UtHHTd6U7axuZuzaC13L37jLA42m8KjX_7",
    ],
    description:
      "An exquisite piece from the latest collection. Perfect for statement-making occasions, featuring signature craftsmanship and exceptional materials. Expertly dry-cleaned and ready for your next event. This garment features a structured silhouette with intricate draping details that highlight the brand's commitment to avant-garde design while remaining effortlessly wearable.",
    details: [
      "Main material: 100% Cotton",
      "Lining: 100% Silk",
      "Concealed zip fastening along back",
      "Dry clean only",
      "Made in France",
    ],
    fit: [
      "Fits true to size, take your normal size",
      "Designed for a slim fit",
      "Structured, non-stretchy fabric",
      "Model is 177cm/ 5'10\" and is wearing a FR 36",
    ],
  };

  return (
    <>
      <main className="min-h-screen pt-[56px] md:pt-[112px] bg-background-light">
        <div className="border-b border-border-color px-6 md:px-12 py-4">
          <Breadcrumb>
            <BreadcrumbList className="text-xs uppercase tracking-widest">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="hover:text-brand-primary">
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/category" className="hover:text-brand-primary">
                    Collections
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href="/category/archive"
                    className="hover:text-brand-primary"
                  >
                    The Archive
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-bold text-brand-primary">
                  {product.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Product Section */}
        <section className="flex flex-col lg:flex-row border-b border-border-color">
          {/* Left: Sticky Image Gallery */}
          <div className="w-full lg:w-3/5 xl:w-[65%] border-r-0 lg:border-r border-border-color bg-surface">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-px bg-border-color">
              {product.images.map((img, i) => (
                <div
                  key={i}
                  className={`relative bg-surface aspect-3/4 ${i === 0 ? "md:col-span-2 lg:col-span-1 xl:col-span-2 aspect-4/5" : ""}`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} - View ${i + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Sticky Product Info */}
          <div className="w-full lg:w-2/5 xl:w-[35%] relative">
            <div className="lg:sticky lg:top-[112px] p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col gap-8">
              {/* Header */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <Link
                    href={`/category/${product.brand.toLowerCase()}`}
                    className="text-sm font-bold uppercase tracking-widest text-text-muted hover:text-brand-primary transition-colors"
                  >
                    {product.brand}
                  </Link>
                  <button
                    className="text-text-muted hover:text-brand-primary transition-colors"
                    aria-label={`Add ${product.name} to wishlist`}
                  >
                    <Heart className="w-6 h-6" strokeWidth={1.5} />
                  </button>
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl text-text-main leading-tight">
                  {product.name}
                </h1>

                <div className="flex items-center gap-4 mt-2">
                  <span className="font-sans text-2xl font-bold">
                    ${product.price}
                  </span>
                  <span className="font-sans text-sm text-text-muted line-through">
                    Retail: ${product.retailPrice}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center" aria-hidden="true">
                    <Star className="w-4 h-4 fill-brand-accent text-brand-accent" />
                    <Star className="w-4 h-4 fill-brand-accent text-brand-accent" />
                    <Star className="w-4 h-4 fill-brand-accent text-brand-accent" />
                    <Star className="w-4 h-4 fill-brand-accent text-brand-accent" />
                    <Star className="w-4 h-4 fill-brand-accent text-brand-accent" />
                  </div>
                  <a
                    href="#reviews"
                    className="text-sm font-sans text-text-main/70 underline underline-offset-4 cursor-pointer hover:text-brand-primary"
                  >
                    <span className="sr-only">Rated </span>
                    {product.rating}
                    <span className="sr-only"> out of 5 stars based on </span>
                    {product.reviews} Reviews
                  </a>
                </div>
              </div>

              {/* Sizes */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-bold uppercase tracking-widest text-text-main">
                    Size
                  </span>
                  <button className="text-xs text-text-muted underline underline-offset-4 hover:text-brand-primary transition-colors">
                    Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 border text-sm font-sans transition-all ${
                        selectedSize === size
                          ? "border-brand-primary bg-brand-primary text-background font-bold shadow-md"
                          : "border-border-color hover:border-text-muted text-text-main"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold uppercase tracking-widest text-text-main">
                  Rental Period
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {product.periods.map((period) => (
                    <button
                      key={period}
                      onClick={() => setSelectedPeriod(period)}
                      className={`py-3 px-4 border text-sm font-sans flex justify-between items-center transition-all ${
                        selectedPeriod === period
                          ? "border-brand-primary bg-brand-primary/5 text-brand-primary font-bold"
                          : "border-border-color hover:border-text-muted text-text-main"
                      }`}
                    >
                      <span>{period}</span>
                      {selectedPeriod === period && (
                        <Check className="w-4 h-4" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-4">
                <button
                  className="w-full bg-brand-primary text-white py-4 text-xs font-bold uppercase tracking-[0.2em] transition-transform hover:scale-[1.02] active:scale-100 flex items-center justify-center gap-2 disabled:bg-text-muted disabled:cursor-not-allowed disabled:scale-100"
                  disabled={!selectedSize}
                >
                  Add to Cart
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="flex justify-center items-center gap-6 mt-2 text-xs text-text-muted">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3 h-3" /> Free Returns
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3 h-3" /> Dry Cleaning Included
                  </span>
                </div>
              </div>

              {/* Accordions */}
              <div className="mt-6 border-t border-border-color">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem
                    value="description"
                    className="border-border-color"
                  >
                    <AccordionTrigger className="text-sm font-bold uppercase tracking-widest hover:no-underline hover:text-brand-accent py-5">
                      Editor&apos;s Notes
                    </AccordionTrigger>
                    <AccordionContent className="text-text-main/80 leading-relaxed font-sans text-sm pb-6">
                      {product.description}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem
                    value="details"
                    className="border-border-color"
                  >
                    <AccordionTrigger className="text-sm font-bold uppercase tracking-widest hover:no-underline hover:text-brand-accent py-5">
                      Details & Care
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                      <ul className="list-disc pl-4 space-y-2 text-sm text-text-main/80 font-sans">
                        {product.details.map((detail, i) => (
                          <li key={i}>{detail}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="fit" className="border-border-color">
                    <AccordionTrigger className="text-sm font-bold uppercase tracking-widest hover:no-underline hover:text-brand-accent py-5">
                      Size & Fit
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                      <ul className="list-disc pl-4 space-y-2 text-sm text-text-main/80 font-sans">
                        {product.fit.map((fitInfo, i) => (
                          <li key={i}>{fitInfo}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem
                    value="shipping"
                    className="border-border-color"
                  >
                    <AccordionTrigger className="text-sm font-bold uppercase tracking-widest hover:no-underline hover:text-brand-accent py-5">
                      Shipping & Returns
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-text-main/80 font-sans pb-6 leading-relaxed">
                      Delivery is available across all major cities. A pre-paid
                      return label is included in your package. You can return
                      this item by dropping it off at any authorized shipping
                      location on the final day of your rental period.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        {/* Product Reviews */}
        <ReviewsSection productId={id as string} productName={product.name} />

        {/* You May Also Like */}
        <RecommendedCarousel />
      </main>
    </>
  );
}
