import Link from "next/link";
import { Footer } from "@/components/layout/shared/footer";
import Image from "next/image";

const categories = [
  {
    title: "New Arrivals",
    slug: "new-arrivals",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
    description: "The latest luxury additions to our collection.",
  },
  {
    title: "The Archive",
    slug: "archive",
    image:
      "https://images.unsplash.com/photo-1574212726759-ddf270034a74?q=80&w=2070&auto=format&fit=crop",
    description: "Our curated selection of timeless designer pieces.",
  },
  {
    title: "Dresses",
    slug: "dresses",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=2083&auto=format&fit=crop",
    description: "Evening gowns, slip dresses, and statement silhouettes.",
  },
  {
    title: "Outerwear",
    slug: "outerwear",
    image:
      "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2070&auto=format&fit=crop",
    description: "Structured coats, blazers, and luxury layering.",
  },
  {
    title: "Tailoring",
    slug: "tailoring",
    image:
      "https://images.unsplash.com/photo-1588145803277-226e643534f3?q=80&w=2078&auto=format&fit=crop",
    description: "Precision cut suiting and elevated separates.",
  },
  {
    title: "Bags",
    slug: "bags",
    image:
      "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=2030&auto=format&fit=crop",
    description: "Designer handbags, clutches, and everyday totes.",
  },
];

export default function CategoryIndexPage() {
  return (
    <>
      <main className="min-h-screen pt-[56px] md:pt-[112px] bg-background-light pb-20">
        <header className="px-6 py-12 md:py-20 md:px-12 max-w-7xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-normal leading-tight mb-6">
            All Collections
          </h1>
          <p className="text-text-main/70 font-sans max-w-2xl mx-auto text-base md:text-lg">
            Explore our meticulously curated categories, featuring runway pieces
            and modern classics from the fashion industry&apos;s most esteemed
            designers.
          </p>
        </header>

        <section className="px-6 md:px-12 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="group flex flex-col items-center text-center"
              >
                <div className="relative aspect-4/5 w-full overflow-hidden bg-surface mb-6">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <h2 className="font-serif text-2xl md:text-3xl mb-2 transition-colors group-hover:text-brand-accent">
                  {category.title}
                </h2>
                <p className="text-sm font-sans text-text-muted">
                  {category.description}
                </p>
                <div className="mt-4 border-b border-text-main pb-1 text-xs font-bold uppercase tracking-widest opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  Explore Collection
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
