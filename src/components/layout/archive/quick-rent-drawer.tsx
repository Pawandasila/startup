"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import type { Product } from "./product-card";

interface QuickRentDrawerProps {
  product: Product;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuickRentDrawer({
  product,
  isOpen,
  onOpenChange,
}: QuickRentDrawerProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Mock sizes for demonstration
  const sizes = product.size.split(" / ");

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-background-light p-0">
        <DrawerHeader className="sr-only">
          <DrawerTitle>{product.name} Quick Rent</DrawerTitle>
          <DrawerDescription>
            Select size and rent {product.name} by {product.brand}
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-6">
          <div className="flex gap-4 mb-8">
            <div className="relative aspect-3/4 w-24 shrink-0 overflow-hidden bg-surface">
              <Image
                src={product.image}
                alt={product.imageAlt}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1">
                {product.brand}
              </h3>
              <p className="font-serif text-xl leading-tight mb-2">
                {product.name}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">${product.price}</span>
                <span className="text-xs text-text-muted">
                  / {product.rentalPeriod}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                Select Size
              </span>
              <Link
                href={`/product/${product.id}`}
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted underline underline-offset-4"
              >
                Size Guide
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`flex-1 min-w-[60px] py-3 text-[10px] font-bold border transition-all ${
                    selectedSize === size
                      ? "bg-brand-primary text-background border-brand-primary"
                      : "bg-background border-border-color text-brand-primary hover:border-brand-primary"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <Button
              className="h-12 bg-white text-brand-primary border border-border-color hover:bg-surface text-[10px] font-bold tracking-[0.2em] uppercase"
              onClick={() => onOpenChange(false)}
            >
              Add to Bag
            </Button>
            <Link
              href={`/product/${product.id}`}
              className="flex h-12 items-center justify-between bg-brand-primary text-background px-4 hover:bg-brand-accent transition-colors"
            >
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase">
                Checkout Now
              </span>
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <Link
            href={`/product/${product.id}`}
            className="block text-center text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted hover:text-brand-primary transition-colors py-2"
            onClick={() => onOpenChange(false)}
          >
            View Full Product Details
          </Link>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
