"use client";

import Image from "next/image";
import { X, Calendar, ShoppingBag, ArrowRight, Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const content = (
    <div className="flex flex-col h-full bg-[#FFFEFA]">
      <header className="flex flex-col px-6 md:px-8 pt-6 md:pt-8 pb-5 border-b border-[#E5E5E5]">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-serif text-xl md:text-2xl font-medium tracking-tight text-brand-primary">
            Your Selection
          </h2>
          {!isDesktop && (
            <button
              onClick={() => onOpenChange(false)}
              className="p-2 -mr-2 text-brand-primary hover:text-brand-accent transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>
        <div className="text-[10px] uppercase tracking-widest text-text-muted flex gap-2 items-center">
          <span className="text-brand-primary font-bold border-b border-brand-primary pb-0.5">
            Cart
          </span>
          <span>—</span>
          <span>Information</span>
          <span>—</span>
          <span>Payment</span>
        </div>
      </header>

      {/* Estimated Delivery */}
      <div className="px-6 md:px-8 py-3 border-b border-[#E5E5E5] bg-surface flex items-center gap-4">
        <Calendar className="w-4 h-4 text-brand-primary" strokeWidth={1.5} />
        <div className="flex flex-col text-xs text-brand-primary">
          <span className="font-medium">Est. Delivery: Oct 10</span>
          <span className="text-text-muted">Return by: Oct 16</span>
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6 no-scrollbar">
        <div className="flex flex-col gap-8">
          {/* Item 1 */}
          <div className="group flex gap-4 relative">
            <div className="w-[65px] h-[90px] shrink-0 bg-surface overflow-hidden relative border border-[#E5E5E5]">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOdrF9KW4pVsuLHjNc9WsPiQKW3rFyw5cQ2bO5bK2arDIxVhzveamRFNDW1ACUN_zfBAp5TDpj0tC43kgbN28dxHlL52iSeRQdab1vb3M7kXjHs6EWdQ5x2mcnxiv3H3MnbYMt17kjbT-AA69MI76H7AyYbAZzAr9mkDHvsjfkQ_ES_jsurif0zhx9hKGRNtiQo3JzvGDK3JtWa_Z4pyPm-rqCyj_tplRrjpClPEUu7WcdTDlER9dWkAynS5XUDg6qg_AwpUq4y6OL"
                alt="Asymmetric Silk Dress"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-bold tracking-[0.05em] uppercase text-brand-primary/60">
                    Loewe
                  </span>
                  <span className="font-sans text-xs text-brand-primary tabular-nums font-medium">
                    $120.00
                  </span>
                </div>
                <h3 className="font-serif text-sm leading-tight text-brand-primary mb-2">
                  Asymmetric Silk Dress
                </h3>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 text-[11px] text-brand-primary/70">
                    <Calendar
                      className="w-3 h-3 text-text-muted"
                      strokeWidth={1.5}
                    />
                    <span>
                      Oct 10 — Oct 16{" "}
                      <span className="text-text-muted ml-0.5">(6 Days)</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-brand-primary/70">
                    <ShoppingBag
                      className="w-3 h-3 text-text-muted"
                      strokeWidth={1.5}
                    />
                    <span>Size: M</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <button className="text-[9px] cursor-pointer uppercase tracking-widest text-text-muted hover:text-brand-primary transition-colors duration-300 border-b border-transparent hover:border-brand-primary">
                  Edit Dates
                </button>
                <div className="flex gap-4">
                  <button className="text-[9px] cursor-pointer uppercase tracking-widest text-brand-primary border-b border-brand-primary hover:text-text-muted hover:border-text-muted transition-all duration-300 pb-0.5">
                    Save
                  </button>
                  <button className="text-[9px] cursor-pointer uppercase tracking-widest text-brand-primary border-b border-brand-primary hover:text-red-600 hover:border-red-600 transition-all duration-300 pb-0.5">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-[#E5E5E5] w-full"></div>

          {/* Item 2 */}
          <div className="group flex gap-4 relative">
            <div className="w-[65px] h-[90px] shrink-0 bg-surface overflow-hidden relative border border-[#E5E5E5]">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQrSloR490m2hI5yTdITgTMhcOzphZmTfNg6T8Dy4FhqUQngMJUirYfjuwSTwx99te_3eT91Y_T2exHGQp92yFkYNInUs4iK_jHCGvlxq9n0_txKdxtrAr9X-w9Atv-pyj4BJkROGjUHuO_Yy8S3gn011HnqiLuBdLz4SkPOP_jhlxh0I3H2Hhm__4qoK4bOYho4VsYPbTF1c-mq6j_XGapGmatifcqEzLPQqRnQ96B7wpvcNC4YNbIqAkC4OKHDBDY20vWTi0774s"
                alt="Mini Jodie"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-bold tracking-[0.05em] uppercase text-brand-primary/60">
                    Bottega Veneta
                  </span>
                  <span className="font-sans text-xs text-brand-primary tabular-nums font-medium">
                    $85.00
                  </span>
                </div>
                <h3 className="font-serif text-sm leading-tight text-brand-primary mb-2">
                  Mini Jodie
                </h3>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 text-[11px] text-brand-primary/70">
                    <Calendar
                      className="w-3 h-3 text-text-muted"
                      strokeWidth={1.5}
                    />
                    <span>
                      Oct 10 — Oct 16{" "}
                      <span className="text-text-muted ml-0.5">(6 Days)</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-brand-primary/70">
                    <ShoppingBag
                      className="w-3 h-3 text-text-muted"
                      strokeWidth={1.5}
                    />
                    <span>One Size</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <button className="text-[10px] uppercase tracking-widest text-text-muted hover:text-brand-primary transition-colors duration-300 border-b border-transparent hover:border-brand-primary">
                  Edit Dates
                </button>
                <div className="flex gap-4">
                  <button className="text-[10px] uppercase tracking-widest text-brand-primary border-b border-brand-primary hover:text-text-muted hover:border-text-muted transition-all duration-300 pb-0.5">
                    Save
                  </button>
                  <button className="text-[10px] uppercase tracking-widest text-brand-primary border-b border-brand-primary hover:text-red-600 hover:border-red-600 transition-all duration-300 pb-0.5">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-[#E5E5E5] w-full"></div>

          {/* Delivery Options */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.05em] uppercase text-brand-primary mb-4">
              Delivery Options
            </h4>
            <div className="flex w-full border border-[#E5E5E5]">
              <button className="flex-1 py-3 text-[10px] md:text-xs uppercase tracking-widest text-brand-primary border-r border-[#E5E5E5] hover:bg-surface transition-colors">
                Pickup
              </button>
              <button className="flex-1 py-3 text-[10px] md:text-xs uppercase tracking-widest text-white bg-brand-primary border-r border-[#E5E5E5]">
                Standard ($10)
              </button>
              <button className="flex-1 py-3 text-[10px] md:text-xs uppercase tracking-widest text-brand-primary hover:bg-surface transition-colors">
                Express ($25)
              </button>
            </div>
          </div>

          {/* Suggestions */}
          <div className="mt-4 mb-6">
            <h4 className="font-serif text-lg italic text-text-muted mb-4">
              Complete the look
            </h4>
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              <div className="w-[140px] shrink-0 cursor-pointer group">
                <div className="aspect-3/4 bg-surface mb-2 overflow-hidden relative border border-[#E5E5E5]">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0XLupX8VfeqQMVCzAZakfHzsCrWupiriDDZZQGGJfWiGGAkxzjXwI3ArKbzkU40i4OJCbSHfpzsVXyHEO4kU6VPr2HDORlwEfOeuyQKpxo1io30LN6Xqj2FX3eOMzxAZXem0IyZNIslJd69KhmMYTUFOV5DDokHbo-ZPnQoRLpaD_-strULV3X9kpGEl4-uPcqM3xnTKgySgsk1x4bar83Lu85pT4MSfD5ZxZOGocTKmamwMqtFFyW7hlyUIJ0WPlf4KZZyYwlcBH"
                    alt="Khaite Clutch"
                    fill
                    className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white p-1 shadow-sm border border-[#E5E5E5]">
                      <Plus className="w-4 h-4 text-brand-primary" />
                    </div>
                  </div>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-brand-primary">
                  Khaite
                </p>
                <p className="text-xs text-text-muted mt-0.5">
                  Lotus Clutch, $45
                </p>
              </div>
              <div className="w-[140px] shrink-0 cursor-pointer group">
                <div className="aspect-3/4 bg-surface mb-2 overflow-hidden relative border border-[#E5E5E5]">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqHuzYTdN4DRgrS0sP4o_aLdlZ-d84NziHg5OGw_hLtCVgpe4h3NvDHXTrqP4EwrldicMFVakuQloMn5iFXsuZZUZhoJ4TEFjduUTpDBkJj6w4EaC8wpSLoIDddMN2BXbb7E8So6vtjh6JFmd7gtVp6_My1usSRg4_Vf6sN6vNbMHPI53D3UBMJIzLXi2hH8DX0xG3HNHt5w55wIxPmSwrysUjSwiPWG9H2r9dspii9MdNbzrtpA11N8JzP_lOX0QbviTs7_ziAzcW"
                    alt="Saint Laurent Pumps"
                    fill
                    className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white p-1 shadow-sm border border-[#E5E5E5]">
                      <Plus className="w-4 h-4 text-brand-primary" />
                    </div>
                  </div>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-brand-primary">
                  Saint Laurent
                </p>
                <p className="text-xs text-text-muted mt-0.5">
                  Opyum Pumps, $60
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#F9F8F6] border-t border-[#E5E5E5] px-6 py-5">
        <div className="mb-6">
          <div className="flex justify-between items-baseline">
            <span className="font-serif text-lg text-brand-primary">Total</span>
            <span className="font-serif text-2xl md:text-2xl text-brand-primary font-medium tabular-nums">
              $225.00
            </span>
          </div>
        </div>
        <button className="w-full bg-brand-primary hover:bg-black text-white h-12 flex items-center justify-between px-6 mb-4 transition-all duration-300 group shadow-sm uppercase text-xs font-bold tracking-widest">
          <span>Proceed to Payment</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );

  if (isDesktop) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="p-0 sm:max-w-[480px] border-l border-[#E5E5E5]">
          <SheetHeader className="sr-only">
            <SheetTitle>Shopping Cart</SheetTitle>
          </SheetHeader>
          {content}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="p-0 h-[92vh] border-t border-[#E5E5E5] rounded-t-[32px] overflow-hidden">
        <DrawerHeader className="sr-only">
          <DrawerTitle>Shopping Cart</DrawerTitle>
        </DrawerHeader>
        {content}
      </DrawerContent>
    </Drawer>
  );
}
