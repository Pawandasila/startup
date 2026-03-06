"use client";

import { useState, useCallback, use } from "react";
import {
  Search,
  SlidersHorizontal,
  Grid3X3,
  List,
  ChevronLeft,
  ChevronRight,
  X,
  ChevronsUpDown,
  Check,
} from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/layout/shared/footer";
import { ArchiveFilters } from "@/components/layout/archive/filters";
import { ProductCard } from "@/components/layout/archive/product-card";
import type { Product } from "@/components/layout/archive/product-card";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const sortOptions = [
  { label: "Newest First", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Rating", value: "rating" },
  { label: "Popularity", value: "popularity" },
] as const;

const products: Product[] = [
  {
    id: "loewe-anthurium",
    brand: "Loewe",
    name: "Anthurium Dress",
    price: 240,
    rentalPeriod: "4 DAYS",
    size: "FR 36 / 38",
    rating: 4.9,
    availability: "now",
    availabilityText: "Available Now",
    badge: "High Demand",
    badgeStyle: "dark",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDNyTlMnJ9pQswrknguZl__w7yDQ3Sm3N2sLRsNRxrTEYn29Xl2prcM2oDmnBtE50Ys9kdptItsKwI8enL7SVqwjLBkIwHTZB7vygwTbh_omS2hPl12NcBjxpvts56-fa7SL08oVL7YXHNfd9kBI8oi9kSStDB4CnxE_kqnhmPwLaEMYeG8Y8xO9ATCN-NPomIYdfSv97vZXVzhzSOM7bKqLEw-uVZi0YIpfeJiUlrpzPZWL6aZGhr8SgXipc4BG4m2y75BWDiOgKod",
    hoverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDBLfA_oFc0i8MyhBwvxmJZSOHQlc7K1vYjI4-2iW99mSocIHv8XE-Ls2p40zMjxYCgvM8f0c1ZHzdlM4qNqm9D4E69_Xt4u_Zn6LuBCv53ZuzfqaZNGefwNLIQtm8q08wTdH0NeBGF91748QvCywG59AZDh0WCE1Wu1JLKv44XMPAUJxK8iYxGUcbCD-dbOwqVtco-B4KUrvpDm0WPj1gmB8W2GE5-rxBcVNe22KRc_3U1neyKnnaNRv3CGXyUXIq97_WGN57mB4CN",
    imageAlt:
      "Woman wearing an elegant structured white dress in a minimal studio setting",
    hoverImageAlt:
      "Close up detail of fabric texture and stitching on a white designer dress",
  },
  {
    id: "row-gala-pant",
    brand: "The Row",
    name: "Gala Pant",
    price: 180,
    rentalPeriod: "4 DAYS",
    size: "US 4 / 6 / 8",
    rating: 4.8,
    availability: "soon",
    availabilityText: "Available in 2 days",
    badge: "Classic",
    badgeStyle: "light",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB1ZcIyMqkNuvuSLMCn5lh0RV2z7LRG6kinEf3h8t8pjQsX4X6iF75d664WlbKGvHA8USo__fRS5fcxTpZtMQeW7DQ6dIlDcpAIGNHaYsRIovqCLavKo8PlIgWSnUdWsluEkTBOE7NEfMnlglZJKAwVzXBOcxxoRiM92jtsGB11GDDFpWD_OD6zfhqv8IYmDhS6751xdjHH7dW0r8bKxBt1tFmYNPLg0C6yzyWXHwVflQfgSNPe1qRvuwkgZdvcxV6BdUZHK7Za_7bh",
    hoverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDNhIvGRASgVm2-UzhtK3YeHAc_pKSCCsxlsaKszSMDXD9bKd3DhJmdjoNX40R-IOVJNEHuoxcA1sCyb5oryEMuLVwKEijO3kPNLNwSjvHq_P3rwMB0nmyXCWCGoZ6c6Z79-Qj7OcHBbeZi3ixwykJtYmIR8ThMPUd-y2f6ALVHXyxOpMxhTOYEr6hr1mQaBPf-l7uBLXnFblOyRe7bMCjxj_ca4Nu-z9NIWiNYTCwCs6UtHHTd6U7axuZuzaC13L37jLA42m8KjX_7",
    imageAlt:
      "Model posing in high-waisted wide-leg trousers and a minimalist top",
    hoverImageAlt:
      "Rear view of the trousers showing the fit and drape of the fabric",
  },
  {
    id: "khaite-maddy",
    brand: "Khaite",
    name: "Maddy Top",
    price: 110,
    rentalPeriod: "4 DAYS",
    size: "S / M",
    rating: 5.0,
    availability: "now",
    availabilityText: "Available Now",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBSsRAqRve4WlJW8bmq8Vkxufm6EE6nbua5QDnGLjApkr5zN2Rr0LiyplFiXhX9Y9X9a0Z21afrP-aPtaaZOyVlEOl89AaHMZ0Fz-tw_CYgg1NeE6ePbc-9z9koAGLFywFQ7Az7rJD1p0nhb4zJzPsjh7Gpf1uQTn30ZBrMCjRc_qOGitMarccsVG2r6tjmfP3hdtVuXFs8GJV62CxjyvqUtm-5EnGKOc-gQMdjk49OkDaxjh1wSgNtnrlVOvrdtH9HSQ_ycj5XU3qA",
    hoverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDNtCfqFVUk_v4N_9zZBmNsoctIYQt4NQIGN88bJDWR_O5Zqha-pRmxMKRzFwRNALvI5XQJYIDxHhsi9rL8XpXIacZfWmAhxXb-xIF4nAqdMgOrBGHNtycOTjw5jlr7gZOxKWO-dKke9cdGQOPWuLnPQntPMRS6ajQTBt1vgD2yX0G9DRr26n-zpxefOJtCeIQf8kw2yhwJvSYhokjBKN8oEm4H13mhYpJz1W_-Js0PTzysqRFwUKGpk--rqg4JkTlSpOKvnESadh6e",
    imageAlt: "Fashion model in a structured black blazer with sharp shoulders",
    hoverImageAlt: "Detail shot of the blazer lapel and button details",
  },
  {
    id: "toteme-silk",
    brand: "Totême",
    name: "Evening Silk Dress",
    price: 290,
    rentalPeriod: "4 DAYS",
    size: "EU 36 / 38 / 40",
    rating: 4.7,
    availability: "now",
    availabilityText: "Available Now",
    badge: "New Season",
    badgeStyle: "accent",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCbQt8vCqVOEbhKU86Yw-fYHIk1tcnn8505uwz9oS5zbv9FnDw8sUc0Ew9zF3D3Za5rNbx71VBnWnB8o1Qfty098EBIDT3SFA1-8_wNK3xq3S5b7fleNSJ64BJ1ghr5VhvUhXfvuLwiSGNP3KdEBl_5cNJxnjn0wHwrJjgFsv4DDO2EX7_DEubFP7uqksK2vEMk1IZtddDgh7wHkxhzMvVaA1sYF9y117Zp5bUnLajfF3WQrFoalrKoYnU9miIyCJJNT4XnNTt3n1aQ",
    hoverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBVUFvCqiEHofrM4TYidWmb7ipExfmRKS89bIfr-80Te5hCG9c6e0AT1AqI_ZiLkLTXmhtx8Pibgd9efTYSVz-INYGPYhMFq0ac8Ge88__3hc6k76dNpqeXhneXU_kejG3eZ3Lursv9lg9XJ9sftRjbBj7IXalE0-k2yItOdN1IgxMHMvhXY50MZECbLuoYflJttg17XwJeK7nmsYqp8-YbmYocxwIEN9FtJ9-68Mt14YKH7BiuhuZDSP6NpZHw0gbbnlxTL_fz0ANT",
    imageAlt: "Flowing silk evening gown in a neutral champagne color",
    hoverImageAlt: "Close up of silk fabric drape and texture",
  },
  {
    id: "acne-coat",
    brand: "Acne Studios",
    name: "Double Breasted Coat",
    price: 195,
    rentalPeriod: "4 DAYS",
    size: "34 / 36",
    rating: 4.6,
    availability: "now",
    availabilityText: "Available Now",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB-xsxN7RM9-fLjbHXxsWL7ovs7-ukWdEN2CkqJ1UnXfMWz5R4qoWoE-5jQHRZa945rlNXXLvr58FMw5wa1hcqKR5dsXIVg80UvgYptXS38C5Dr3dJUC4K-zZvq7hHEtrdRWjPWWIVlVOW_G9-tuAXHGDVVcBrtyI1LJkVD3RuppDRFqImcv94pa8YVYFWhjRqVc7exWA57TEtwRffkwgRPfHZ0GlibVYIcwEpEgRzL7ik6Z3hAuB4hD1ew-97rh4EVkA8QH_dJj9XZ",
    hoverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDPn0nxDsAl51oKja88mbvdkiv1DlKhzhn37Xd4rd7RCzRijK9GC_AeQfD0LqN-wAGxUiFOEO5WXg_2QfVMeGk-SkN0cW_TH85GnmAfBvoLMdel8egkbMRHNV_OPnRxq4nDmE3jCYnzBUFeAq49UhFa8ebX659UMyjC8OoTC4XENLRx3osCdZ0NxYeJs7FsUkMtJ8ZBY-xuGmdfZJB7rjmpL5iAs7URdYFXd025EDgA7huDbNqg4hfNXun64GItgHv5ddvHQa8FOrpD",
    imageAlt: "Oversized structured coat in dark wool",
    hoverImageAlt: "Model walking wearing the coat showing movement",
  },
  {
    id: "loewe-maxi",
    brand: "Loewe",
    name: "Draped Maxi Dress",
    price: 320,
    rentalPeriod: "4 DAYS",
    size: "FR 38",
    rating: 5.0,
    availability: "now",
    availabilityText: "Available Now",
    badge: "Runway",
    badgeStyle: "dark",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAG4rtoiurSdeXylTp1iLMVTAUhia0fL2Eu0FjNFTIv8UIWWNi6RFEE6ZZzHBUPdq_UiTZdsUEvI9BNkWIz2L0ldHFepbSATET_mQGNNSfv6AgaozzrrvtPKR4_wpeRe7dSF9nD9jNzklt2WYd8uDByMF2PackwAw0xQvARKh7kXHJR4itfp_0_9hr5bh3KPsjKL7VDGjoA6GH_0K8g0jjCIRcB5iOVAtzPHvl_OXA3NBL46eC962_2lQSHI44E2I7kjnohv-Qb6uvB",
    hoverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA9J26bkbtN9mYka15PAUOmJcRlMC3jOmbk88GmvUJ8q9KxIoBvgbaHcn1bokNRpLH5VkvVbkv4E-GpddmXk85SDEQYMB5A62S1X03oxpmi1m2IjNgJNQU_wrNL224Tr-jhgqXkb_r3BMX4J-iCqQHfdT9eO9vKtTnE9OCpCZ6yrOB4vpg-2Fyy5vOq-VcklAPprb_mZpLIStDFb0pWueQHKkEdIbqnDL2Csj9vZvGPzkpt85zI_SF5SERo1uPXxK_iqPgtQBE_FQfl",
    imageAlt: "Minimalist long dress in a dark green shade",
    hoverImageAlt: "Texture detail of the dark green dress fabric",
  },
];

type ViewMode = "grid" | "list";
type SortValue = (typeof sortOptions)[number]["value"];

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  // Format slug for title display (e.g., "new-arrivals" -> "New Arrivals")
  const formattedTitle = slug
    ? slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "The Archive";

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([
    "Loewe",
    "Tailoring",
  ]);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortValue>("newest");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFilter = useCallback((filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter],
    );
  }, []);

  const clearAllFilters = useCallback(() => {
    setActiveFilters([]);
  }, []);

  const sortedProducts = [...products]
    .filter((p) => {
      if (!searchQuery) return true;
      const term = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(term) ||
        p.brand.toLowerCase().includes(term)
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const gridClass =
    viewMode === "grid"
      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0"
      : "flex flex-col";

  const selectedSortLabel =
    sortOptions.find((o) => o.value === sortBy)?.label ?? "Sort By";

  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row pt-[56px] md:pt-[112px]">
        {/* Mobile filter overlay */}
        {filtersOpen && (
          <div
            className="fixed inset-0 z-60 bg-black/40 md:hidden backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setFiltersOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Left sidebar — independently scrollable */}
        <ArchiveFilters
          isOpen={filtersOpen}
          onClose={() => setFiltersOpen(false)}
          activeFilters={activeFilters}
          onToggleFilter={toggleFilter}
        />

        {/* Right content — independently scrollable */}
        <main
          className="flex-1 flex flex-col bg-background-light md:h-[calc(100vh-112px)] md:overflow-y-auto"
          aria-label="Product listing"
        >
          {/* Search bar */}
          <div className="px-4 py-4 md:px-8 border-b border-border-color bg-background-light">
            <div className="relative w-full max-w-xl mx-auto md:mx-0 flex items-center">
              <Search
                className="absolute left-3 w-4 h-4 text-text-muted"
                aria-hidden="true"
              />
              <label htmlFor="archive-search" className="sr-only">
                Search designers, items, or occasions
              </label>
              <input
                id="archive-search"
                className="w-full bg-surface border border-border-color py-2.5 pl-10 pr-4 text-sm font-sans placeholder:text-text-muted focus:outline-none focus:border-brand-primary transition-colors"
                placeholder="Search designers, items, or occasions..."
                type="search"
                autoComplete="off"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Toolbar */}
          <div className="sticky top-0 z-20 bg-background-light/95 backdrop-blur-sm border-b border-border-color px-4 py-4 md:px-8 flex flex-col gap-4">
            {/* Breadcrumbs — shadcn */}
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
                      Designers
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-bold text-brand-primary">
                    {formattedTitle}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <div>
                <h1 className="font-serif text-3xl md:text-5xl font-normal leading-tight">
                  {formattedTitle}
                </h1>

                {activeFilters.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-text-muted mr-1">
                      Active:
                    </span>
                    {activeFilters.map((filter) => (
                      <span
                        key={filter}
                        className="flex items-center gap-1 bg-surface border border-border-color px-2 py-1 text-xs font-sans"
                      >
                        {filter}
                        <button
                          onClick={() => toggleFilter(filter)}
                          className="hover:text-brand-primary transition-colors"
                          aria-label={`Remove ${filter} filter`}
                        >
                          <X className="w-3 h-3" aria-hidden="true" />
                        </button>
                      </span>
                    ))}
                    <button
                      onClick={clearAllFilters}
                      className="text-xs text-text-muted hover:text-brand-primary underline underline-offset-2 ml-2 transition-colors"
                    >
                      Clear All
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 md:gap-6 shrink-0">
                {/* Mobile filter toggle */}
                <button
                  className="md:hidden flex items-center gap-2 text-sm font-bold uppercase tracking-wider border border-border-color px-3 py-2 hover:border-brand-primary transition-colors"
                  onClick={() => setFiltersOpen(true)}
                  aria-label="Open filters"
                >
                  <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
                  Filters
                </button>

                <span className="text-sm font-sans tracking-wide text-text-muted hidden md:inline-block">
                  {sortedProducts.length} Styles Found
                </span>

                <div className="flex items-center gap-4 border-l border-border-color pl-4 md:pl-6">
                  {/* View mode toggle */}
                  <div
                    className="flex items-center gap-1"
                    role="group"
                    aria-label="View mode"
                  >
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-1.5 transition-colors ${
                        viewMode === "grid"
                          ? "text-brand-primary bg-surface"
                          : "text-text-muted hover:text-brand-primary hover:bg-surface"
                      }`}
                      aria-label="Grid view"
                      aria-pressed={viewMode === "grid"}
                    >
                      <Grid3X3 className="w-5 h-5" aria-hidden="true" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-1.5 transition-colors ${
                        viewMode === "list"
                          ? "text-brand-primary bg-surface"
                          : "text-text-muted hover:text-brand-primary hover:bg-surface"
                      }`}
                      aria-label="List view"
                      aria-pressed={viewMode === "list"}
                    >
                      <List className="w-5 h-5" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Sort dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:text-brand-accent transition-colors"
                        aria-label={`Sort products, currently ${selectedSortLabel}`}
                      >
                        {selectedSortLabel}
                        <ChevronsUpDown
                          className="w-4 h-4"
                          aria-hidden="true"
                        />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      {sortOptions.map((option) => (
                        <DropdownMenuItem
                          key={option.value}
                          onClick={() => setSortBy(option.value)}
                          className="flex items-center justify-between text-xs uppercase tracking-wider cursor-pointer"
                        >
                          {option.label}
                          {sortBy === option.value && (
                            <Check
                              className="w-4 h-4 text-brand-accent"
                              aria-hidden="true"
                            />
                          )}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>

          <div className={gridClass} role="list" aria-label="Products">
            {sortedProducts.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} viewMode={viewMode} />
            ))}

            <RecommendedCarousel />

            {sortedProducts.slice(4).map((p) => (
              <ProductCard key={p.id} product={p} viewMode={viewMode} />
            ))}
          </div>

          <nav
            className="p-8 border-t border-border-color flex justify-center items-center gap-4"
            aria-label="Pagination"
          >
            <button
              className="w-10 h-10 flex items-center justify-center border border-border-color text-text-muted hover:text-brand-primary hover:border-brand-primary transition-colors disabled:opacity-40"
              aria-label="Previous page"
              disabled
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <span className="font-serif text-lg" aria-current="page">
              1 <span className="text-text-muted mx-1">/</span> 4
            </span>
            <button
              className="w-10 h-10 flex items-center justify-center border border-border-color text-text-main hover:bg-brand-primary hover:text-white transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </nav>
        </main>
      </div>
      <Footer />
    </>
  );
}
