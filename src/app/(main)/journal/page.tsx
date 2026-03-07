"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Footer } from "@/components/layout/shared/footer";

const categories = [
  { name: "All Stories", href: "#", active: true },
  { name: "Interviews", href: "#" },
  { name: "Style Guide", href: "#" },
  { name: "Sustainability", href: "#" },
  { name: "The Archive", href: "#" },
];

const articles = [
  {
    id: 1,
    category: "Style Guide",
    title: "The New Minimalists: 10 Wardrobe Essentials for Winter",
    description:
      "How to curate a modular rental wardrobe that works for every occasion, from boardroom to bistro.",
    date: "Oct 12",
    author: "Elena V.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCBdqR5tlgJGs7wk97mXh617uVgoVnzWkY2MqZoRasiYwEW7DnC_wzAUqwxjPujOKeezHLt1d6ZDkOBoZ7FlEJK3Nwnyxcj93r6avPrVV3qD7imF4kFn31UgEErsKtdTmHGEiht0bWDD2JscnLbDXowqq3hMfF7jsRfvwzc23Welx-FBbYtw65gIry-o11R3jZ-pJNnuImhrb5fOik3C7eZ8QESvIH_ov0RNTvnCFRJVZeeDNKCqbCC60kkVGHBB9RmVCFPLBEvXz9c",
    cols: "md:col-span-8",
    aspect: "aspect-16/9",
  },
  {
    id: 2,
    category: "Behind the Scenes",
    title: "At Home with Marine Serre: Upcycling Luxury",
    date: "Oct 08",
    author: "Julian R.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD4A2LTeco14taLxdVIh6cYT1omA0mRHD3vog0DkaRl9zMLi3-9awlA-G5GCgDWj3qtV62bin1_ZjHSvSvK2xeG11jEdWEjqC33FJEHzW8247y3IuY3R3Y5iTMoz3ji8oL4QoHF_mvgBzgLeSxjKyNKci9PfIG7dI_f914Zhq96lT0HqvUdVGyhz_1jU-IRPO2GKi4V5c-RxbCBcc4d9uD19c6Z2qqOpcpGqWH9b0V-ACYbWontNZ44q_wiOFVheLVE2JHiMZu1HufD",
    cols: "md:col-span-4",
    aspect: "aspect-4/5",
  },
  {
    id: 3,
    category: "The Archive",
    title: "The Art of Curating a Rental Archive",
    date: "Oct 05",
    author: "Marcus T.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDpjCrnTio_461nhH3XxB7LqV9VvEd0zLKNtl6oa5baT3vRNbI_mpWz5TE4RZJQjQ4Jc8R9sJWsThMTYnmW4wcksEEXbnx9Y1A0ZPwFFrOYvttn6UVu61JOg3O5_Jjl1_kwc9x5YorlEQ91H9MB0YMex7vqvB7kbRkYtJepwh_WNXCZ4Gcc_7fFRDmXvM9XF8RDdheGqu0Ks4G1CRfbCGu-BE95ExQHlKb0qk1FG0yhV3DvBi1qeuG0MMZUItcpcPUK-0AiwRsM5Q_3",
    cols: "md:col-span-4",
    aspect: "aspect-square",
  },
  {
    id: 4,
    category: "Interview",
    title: "Sustainability Silhouettes: Copenhagen's Best",
    date: "Sep 28",
    author: "Sarah K.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBgDoCJgo4Zv3J0wATcas5biSiE5pq9-314LdnBorqh_CrUXU9gNkm9qs_v3I-l0ILVRXzO0YCnLt9LI8aWbjcMH4xzp8xIxepxwnb0uVbAnu2v8UFP_nCk6Dr1iHG5sZktsvvML_JW5QxHvswtI5DmzSDk8uQGa4SMo-pHf5qsTFJxk6hTTxZDWnVdJH7SrdBxTCa9qKny0SlbbE3fAY4c5QnpNWmlvvYd5KFnTuHktSn4sqctHEtunbW84sBMiIijedTgn9SVNPCg",
    cols: "md:col-span-4",
    aspect: "aspect-square",
  },
  {
    id: 5,
    category: "Style Guide",
    title: "Investing in Accessories You Never Own",
    date: "Sep 24",
    author: "Leo D.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCqklsvV0YHW8Ey2cZcyy-tCGpVbLUCVqtqmUNxoSVRgDQaFkJFt-EEPR7EHmI7AWCTO3qwcPS6yaFilJAfJsodqM_Gwnv60fTYfBrJ8dQpXjYMOSSZnzgsnbA2EpTRRU9kqDDgMAvpUG3JyiGFOvRvgF9t72M2F2Ms9YERp3Q_SBvxPcEmg0txcxyK3XzgdhWGSxblMDH83x3etAPBuKWtozLNZwBQl1BbkzEX0831dLNKrVIYkRG2_kQyYpdthiuhiJU4IoLhzdrp",
    cols: "md:col-span-4",
    aspect: "aspect-square",
  },
];

export default function JournalPage() {
  return (
    <>
      <main className="min-h-screen pt-[56px] md:pt-[112px] bg-background-light text-brand-primary font-sans">
        <section className="relative w-full h-[90vh] flex items-center overflow-hidden border-b border-brand-primary/10">
          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent z-10"></div>
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQ_gRtw5nGkLYczecInVPbBfNAnplcTuE5CLKeWgSJDEWzkifKFfg_vrhQmHptNGa_ClGM3ZV1MLiRpsjT2svrAVm9uXm--ZBOXQ3vqou6UZVOqojpATX6GcgO5cWF0YxA4iDCggF9RcAJddiL0iVHl77bpHGu5lkxF1iJ9321etdeLsR9oK_JzWgNKS7rZaq2Vzgq4ORtF5MRYIFp39D0R5MvVy8sFVAf3-d6Qwk7fWT_D_3Dt4c6dvtmjgJvnMRCG9RzG_jDhDy4"
              alt="The Future of Ownership"
              fill
              className="object-cover scale-105"
              priority
            />
          </div>
          <div className="relative z-20 px-6 lg:px-12 max-w-4xl pt-20">
            <span className="text-[14px] font-bold text-white uppercase mb-6 block drop-shadow-sm opacity-80">
              Feature Interview
            </span>
            <h1 className="text-white text-4xl md:text-6xl font-serif leading-[1.05] tracking-tighter mb-10 drop-shadow-xl">
              The Future of Ownership: A Conversation with Loewe
            </h1>
            <p className="text-white/80 text-lg md:text-xl font-light mb-12 max-w-2xl font-serif italic leading-relaxed drop-shadow-sm">
              Exploring the evolution of luxury craft in a circular economy, and
              why the next generation of fashionistas are choosing access over
              accumulation.
            </p>
            <Link
              href="#"
              className="inline-flex items-center group text-white border border-white/20 bg-white/5 px-10 py-5 hover:bg-white hover:text-black transition-all duration-500 backdrop-blur-md"
              aria-label="Read full story: The Future of Ownership"
            >
              <span className="text-[11px] uppercase tracking-[0.3em] font-bold">
                Read Full Story
              </span>
              <ArrowRight className="ml-4 w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
            </Link>
          </div>
        </section>

        {/* Category Filter */}
        <nav
          className="flex items-center justify-center gap-8 py-10 border-b border-brand-primary/5 overflow-x-auto no-scrollbar px-6"
          aria-label="Journal categories"
        >
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className={`text-[10px] uppercase tracking-widest font-bold whitespace-nowrap transition-colors ${
                cat.active
                  ? "text-brand-accent"
                  : "text-brand-primary/40 hover:text-brand-primary"
              }`}
              aria-current={cat.active ? "page" : undefined}
            >
              {cat.name}
            </Link>
          ))}
        </nav>

        {/* Journal Feed (Grid) */}
        <section
          className="grid grid-cols-1 md:grid-cols-12 gap-px bg-brand-primary/10 border-b border-brand-primary/10"
          aria-label="Journal articles"
        >
          {articles.map((article) => (
            <article
              key={article.id}
              className={`${article.cols} bg-background-light p-6 lg:p-12 transition-all duration-500 hover:bg-surface border-r border-brand-primary/5 last:border-r-0 group`}
            >
              <div
                className={`${article.aspect} w-full bg-surface mb-8 overflow-hidden relative border border-brand-primary/10`}
              >
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                />
              </div>
              <div className="max-w-xl">
                <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-brand-accent mb-3">
                  {article.category}
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-4 leading-tight group-hover:text-brand-accent transition-colors duration-500 cursor-pointer">
                  <Link href="#" className="hover:no-underline">
                    {article.title}
                  </Link>
                </h2>
                {article.description && (
                  <p className="text-brand-primary/70 text-sm mb-6 leading-relaxed line-clamp-2">
                    {article.description}
                  </p>
                )}
                <p className="text-[10px] text-brand-primary/40 uppercase tracking-widest font-medium">
                  <span className="sr-only">Published on </span>
                  {article.date} <span className="sr-only"> by </span>• By{" "}
                  {article.author}
                </p>
              </div>
            </article>
          ))}
        </section>

        {/* Newsletter Signup */}
        <section className="py-24 px-6 lg:px-12 bg-surface">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-[10px] tracking-[0.4em] font-bold uppercase text-brand-accent mb-6 block">
              Stay Informed
            </span>
            <h2 className="text-4xl md:text-6xl font-serif mb-8 text-brand-primary">
              The Weekly Archive
            </h2>
            <p className="text-brand-primary/60 mb-12 max-w-lg mx-auto leading-relaxed uppercase tracking-wide text-xs">
              Join 50,000+ fashion insiders and receive our weekly journal
              directly to your inbox.
            </p>
            <form
              className="flex flex-col md:flex-row items-stretch justify-center gap-4 max-w-xl mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                className="flex-1 bg-transparent border-b border-brand-primary/20 focus:border-brand-accent focus:ring-0 text-lg px-0 py-4 font-light text-brand-primary placeholder:text-brand-primary/30 outline-none transition-colors"
                placeholder="Email Address"
                type="email"
              />
              <button
                className="bg-brand-primary text-white px-10 py-4 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-brand-accent hover:text-brand-primary transition-all duration-300"
                type="submit"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
