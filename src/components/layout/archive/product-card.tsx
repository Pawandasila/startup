import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, ArrowUpRight, Zap } from "lucide-react";
import { QuickRentDrawer } from "./quick-rent-drawer";

export interface Product {
  id: string;
  brand: string;
  name: string;
  price: number;
  rentalPeriod: string;
  size: string;
  rating: number;
  availability: "now" | "soon";
  availabilityText: string;
  badge?: string;
  badgeStyle?: "dark" | "light" | "accent";
  image: string;
  hoverImage: string;
  imageAlt: string;
  hoverImageAlt: string;
}

interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
}

const badgeStyles = {
  dark: "bg-brand-primary text-background",
  light:
    "bg-background/90 backdrop-blur-sm border border-border-color text-brand-primary",
  accent: "bg-brand-accent text-brand-primary",
} as const;

export function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  const isList = viewMode === "list";
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <article
        className={`group relative border-b border-border-color p-4 md:p-6 transition-colors hover:bg-surface/30 ${
          isList
            ? "flex flex-col sm:flex-row gap-6 sm:items-center sm:pr-8"
            : "border-r"
        }`}
        aria-label={`${product.name} by ${product.brand}`}
      >
        <button
          className={`absolute z-10 text-text-muted hover:text-brand-primary transition-colors ${
            isList ? "top-4 right-4 sm:top-6 sm:right-6" : "top-6 right-6"
          }`}
          aria-label={`Add ${product.name} by ${product.brand} to wishlist`}
        >
          <Heart className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Image container */}
        <div
          className={`relative overflow-hidden bg-surface ${
            isList
              ? "aspect-3/4 w-full sm:w-48 sm:h-64 sm:shrink-0 mb-4 sm:mb-0"
              : "aspect-3/4 w-full mb-4 md:mb-6"
          }`}
        >
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            sizes={
              isList
                ? "(max-width: 640px) 100vw, 192px"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            }
            className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-0"
          />
          <Image
            src={product.hoverImage}
            alt={product.hoverImageAlt}
            fill
            sizes={
              isList
                ? "(max-width: 640px) 100vw, 192px"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            }
            className="object-cover opacity-0 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
            loading="lazy"
          />

          {product.badge && (
            <div className="absolute left-2 top-2">
              <span
                className={`${badgeStyles[product.badgeStyle || "dark"]} text-[10px] font-bold uppercase tracking-widest px-2 py-1`}
              >
                {product.badge}
              </span>
            </div>
          )}

          <div
            className={`absolute bottom-0 left-0 right-0 transform bg-brand-primary transition-all duration-300 ease-out ${isList ? "translate-y-0 sm:translate-y-full group-hover:translate-y-0" : "translate-y-full group-hover:translate-y-0"}`}
          >
            <div
              className={`flex ${isList ? "gap-0 sm:gap-2 p-0 sm:p-3" : "gap-2 p-3"}`}
            >
              {!isList && (
                <button
                  onClick={() => setIsDrawerOpen(true)}
                  className="flex-1 flex items-center justify-center border border-white text-white hover:bg-white hover:text-brand-primary py-2 transition-colors"
                  aria-label={`Quick view ${product.name}`}
                >
                  <span className="text-xs font-bold uppercase tracking-widest">
                    Quick View
                  </span>
                </button>
              )}
              <Link
                href={`/product/${product.id}`}
                className={`flex-1 flex items-center justify-between text-brand-primary hover:bg-brand-accent transition-colors ${
                  isList
                    ? "bg-white/90 sm:bg-white py-3 sm:py-2 px-4 sm:px-3 backdrop-blur-sm sm:backdrop-blur-none border-t border-border-color sm:border-0"
                    : "bg-white py-2 px-3"
                }`}
                aria-label={`Rent ${product.name}`}
              >
                <span className="text-xs font-bold uppercase tracking-widest">
                  Rent
                </span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        {/* Content container */}
        <div
          className={`flex flex-col flex-1 ${isList ? "gap-2 sm:gap-4 sm:ml-4" : "gap-1"}`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-text-muted mb-1">
                {product.brand}
              </h3>
              <p className="font-serif text-xl sm:text-2xl leading-tight text-text-main">
                {product.name}
              </p>
            </div>
            <div className="text-right">
              <span className="text-lg sm:text-xl font-sans tabular-nums font-bold">
                ${product.price}
                <span className="text-text-muted text-[10px] sm:text-sm font-normal ml-1">
                  / {product.rentalPeriod}
                </span>
              </span>
            </div>
          </div>

          <div
            className={`grid ${isList ? "grid-cols-2 gap-y-4 gap-x-8 mt-4" : "grid-cols-1 gap-2 mt-1"}`}
          >
            <div>
              <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold mb-1">
                Size
              </p>
              <p className="text-sm font-sans">{product.size}</p>
            </div>

            <div className={isList ? "" : "hidden md:block"}>
              <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold mb-1">
                Rating
              </p>
              <div className="flex items-center gap-1.5">
                <Star
                  className="w-4 h-4 fill-brand-accent text-brand-accent"
                  aria-hidden="true"
                />
                <span className="text-sm font-sans font-medium">
                  <span className="sr-only">Rated </span>
                  {product.rating}
                  <span className="sr-only"> out of 5 stars</span>
                </span>
              </div>
            </div>

            <div className={isList ? "col-span-2" : "hidden md:block"}>
              <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold mb-1">
                Status
              </p>
              <p
                className={`text-[10px] uppercase tracking-wider font-bold ${
                  product.availability === "now"
                    ? "text-brand-accent"
                    : "text-text-muted"
                }`}
              >
                {product.availabilityText}
              </p>
            </div>
          </div>

          {/* Quick Rent button persistent on mobile grid */}
          {!isList && (
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="mt-4 flex md:hidden w-full items-center justify-center gap-2 bg-brand-primary text-background py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-brand-accent transition-colors"
              aria-label={`Quick rent ${product.name}`}
            >
              <Zap className="size-3 fill-brand-accent text-brand-accent" />
              Quick Rent
            </button>
          )}

          {isList && (
            <p className="hidden sm:block mt-4 text-sm text-text-main/70 max-w-xl leading-relaxed">
              An exquisite piece from our {product.brand} collection. Perfect
              for statement-making occasions, featuring signature craftsmanship
              and exceptional materials. Expertly dry-cleaned and ready for your
              next event.
            </p>
          )}

          {isList && (
            <div className="hidden sm:flex gap-3 mt-6">
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="flex items-center justify-center border border-border-color text-text-main hover:bg-brand-primary hover:text-white px-6 py-2.5 transition-colors"
                aria-label={`Quick view ${product.name}`}
              >
                <span className="text-xs font-bold uppercase tracking-widest">
                  Quick View
                </span>
              </button>
            </div>
          )}
        </div>
      </article>

      <QuickRentDrawer
        product={product}
        isOpen={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
      />
    </>
  );
}
