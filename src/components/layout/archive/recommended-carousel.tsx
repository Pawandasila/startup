import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface RecommendedItem {
  brand: string;
  name: string;
  price: number;
  image: string;
  alt: string;
  href: string;
}

const recommended: RecommendedItem[] = [
  {
    brand: "Acne Studios",
    name: "Double Breasted Coat",
    price: 195,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB-xsxN7RM9-fLjbHXxsWL7ovs7-ukWdEN2CkqJ1UnXfMWz5R4qoWoE-5jQHRZa945rlNXXLvr58FMw5wa1hcqKR5dsXIVg80UvgYptXS38C5Dr3dJUC4K-zZvq7hHEtrdRWjPWWIVlVOW_G9-tuAXHGDVVcBrtyI1LJkVD3RuppDRFqImcv94pa8YVYFWhjRqVc7exWA57TEtwRffkwgRPfHZ0GlibVYIcwEpEgRzL7ik6Z3hAuB4hD1ew-97rh4EVkA8QH_dJj9XZ",
    alt: "Oversized structured coat in dark wool",
    href: "/product/acne-coat",
  },
  {
    brand: "Loewe",
    name: "Draped Maxi Dress",
    price: 320,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAG4rtoiurSdeXylTp1iLMVTAUhia0fL2Eu0FjNFTIv8UIWWNi6RFEE6ZZzHBUPdq_UiTZdsUEvI9BNkWIz2L0ldHFepbSATET_mQGNNSfv6AgaozzrrvtPKR4_wpeRe7dSF9nD9jNzklt2WYd8uDByMF2PackwAw0xQvARKh7kXHJR4itfp_0_9hr5bh3KPsjKL7VDGjoA6GH_0K8g0jjCIRcB5iOVAtzPHvl_OXA3NBL46eC962_2lQSHI44E2I7kjnohv-Qb6uvB",
    alt: "Minimalist long dress in a dark green shade",
    href: "/product/loewe-dress",
  },
  {
    brand: "Khaite",
    name: "Structured Blazer",
    price: 150,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDNtCfqFVUk_v4N_9zZBmNsoctIYQt4NQIGN88bJDWR_O5Zqha-pRmxMKRzFwRNALvI5XQJYIDxHhsi9rL8XpXIacZfWmAhxXb-xIF4nAqdMgOrBGHNtycOTjw5jlr7gZOxKWO-dKke9cdGQOPWuLnPQntPMRS6ajQTBt1vgD2yX0G9DRr26n-zpxefOJtCeIQf8kw2yhwJvSYhokjBKN8oEm4H13mhYpJz1W_-Js0PTzysqRFwUKGpk--rqg4JkTlSpOKvnESadh6e",
    alt: "Detail of structured blazer lapel and buttons",
    href: "/product/khaite-blazer",
  },
  {
    brand: "The Row",
    name: "Silk Trouser",
    price: 210,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDNhIvGRASgVm2-UzhtK3YeHAc_pKSCCsxlsaKszSMDXD9bKd3DhJmdjoNX40R-IOVJNEHuoxcA1sCyb5oryEMuLVwKEijO3kPNLNwSjvHq_P3rwMB0nmyXCWCGoZ6c6Z79-Qj7OcHBbeZi3ixwykJtYmIR8ThMPUd-y2f6ALVHXyxOpMxhTOYEr6hr1mQaBPf-l7uBLXnFblOyRe7bMCjxj_ca4Nu-z9NIWiNYTCwCs6UtHHTd6U7axuZuzaC13L37jLA42m8KjX_7",
    alt: "Wide-leg silk trousers showing drape and fit",
    href: "/product/row-trouser",
  },
];

export function RecommendedCarousel() {
  return (
    <section
      className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 border-b border-border-color bg-surface py-10 md:py-12 px-6 md:px-12 overflow-hidden"
      aria-labelledby="recommended-heading"
    >
      <div className="flex justify-between items-end mb-8">
        <h2
          id="recommended-heading"
          className="font-serif text-2xl md:text-3xl font-normal"
        >
          Recommended For You
        </h2>
        <div
          className="flex gap-2"
          role="group"
          aria-label="Carousel navigation"
        >
          <button
            className="w-8 h-8 flex items-center justify-center border border-border-color hover:border-brand-primary transition-colors bg-background-light"
            aria-label="Previous recommendations"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            className="w-8 h-8 flex items-center justify-center border border-border-color hover:border-brand-primary transition-colors bg-background-light"
            aria-label="Next recommendations"
          >
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        className="flex gap-6 overflow-x-auto pb-4 -mx-6 px-6 md:-mx-12 md:px-12 scrollbar-hide"
        role="region"
        aria-label="Recommended products carousel"
        style={{ scrollbarWidth: "none" }}
      >
        {recommended.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex-none w-56 md:w-64 group cursor-pointer"
          >
            <div className="relative aspect-3/4 overflow-hidden mb-3 bg-background-light">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="256px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-wide">
                  {item.brand}
                </h3>
                <p className="font-serif text-base leading-tight mt-0.5">
                  {item.name}
                </p>
              </div>
              <span className="text-xs font-sans tabular-nums">
                ${item.price}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
