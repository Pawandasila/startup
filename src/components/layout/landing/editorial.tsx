import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Editorial() {
  return (
    <section
      className="w-full max-w-[1440px] mx-auto bg-border-color border-x border-border-color"
      aria-labelledby="editorial-heading"
    >
      <h2 id="editorial-heading" className="sr-only">
        Editorial Curations
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-border-color">
        {/* Main editorial feature */}
        <article className="group relative col-span-1 md:col-span-2 md:row-span-2 overflow-hidden bg-surface h-[400px] md:h-[800px]">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDI4uiJ7FxeihHXHQGWjigQAOMf6GEPhGY1fF7ClqQta4Nj2_Jufht0TqKenW8PH0P2p6Upztw2kK9-x_XfJ6CFCC4JMdQt_9aXwKhUDwc0FWaoTKuPEgH2DV4VljLyGWSMFKNdhDf22AvT3kTSyemUItRqVkEHNnsruj5ggt_45x122RGds-Slmf-wKROBraY-a1mKd_bbrxUK0yZol2C9C8x_4hTYFtacCxZNikBVKtyOj7gJVFvQ2wEESrdd2FfG1R98RkM7ZMeN"
            alt="The Gala Edit — trending evening wear curated for formal occasions"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"
            aria-hidden="true"
          />
          <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12">
            <span className="text-xs font-bold tracking-[0.3em] text-white/70 uppercase mb-4 block">
              Seasonal Edit
            </span>
            <h3 className="font-serif text-3xl md:text-5xl text-white mb-4 md:mb-6">
              Trending Outfits:
              <br />
              <span className="italic">The Gala Edit</span>
            </h3>
            <Link
              className="inline-flex items-center gap-2 text-white border-b border-white/40 pb-1 text-xs font-bold tracking-widest hover:text-brand-accent hover:border-brand-accent transition-colors uppercase"
              href="/collections/gala-edit"
            >
              Shop the edit
            </Link>
          </div>
        </article>

        {/* Influencer wardrobes */}
        <article className="group relative col-span-1 md:col-span-2 overflow-hidden bg-background-light h-[250px] md:h-[400px]">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYygLWn1ZR-77rWvGurNHziXARPQZ_WfYpwKsl3CmMjm3onCmsNzzqDghEfT1G0kcvwVEDZLnUy_8ORdvCeu-XbKBdhmT3aNzZqcOrEzSTdrindJMU-XOaTLooRYY63nYxcKWCx4OX3T523W27jDs9Z4CKxQhmEwlzN1DSGEhOH1sQrXUBFmML3ZStADN4DLB2FtedehxkyekNAf8CT3GpiWMkW0lAQD-7IIc7AFszoTKAjtKfk6F30qjbqtnamL1Q07EXL3qdqZbl"
            alt="Influencer curated wardrobe collections"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-4">
            <h3 className="font-serif text-2xl md:text-4xl text-white italic drop-shadow-lg">
              Influencer Wardrobes
            </h3>
            <p className="text-white/80 font-sans text-xs tracking-widest mt-4 font-bold uppercase">
              Explore Curated Closets
            </p>
          </div>
        </article>

        {/* Spotlight feature */}
        <article className="group relative col-span-1 md:col-span-1 overflow-hidden bg-surface h-[250px] md:h-[400px]">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFYZRjP1yGiBlbm__KqGPDGsJIZ1H2dh-9efcPV1v99zrTlY5pmx-Op9ABnR_E0ENKn1JIPygDU58JJ0dM0EkAcwFUJw8tXgngwQdPyY9eICpUaNSiAk8P1UIBpANIFjoUtuTLW58wU_19SqGOh5DnzG4xjAyEeaaU7bd1xoaA6b5o6inI0_fiZKDFimq-vzvhb-S69hSmFDp7GJ-pe9KZ7Nwsmcq_WwneOgstdpJsEnRumq6etm4YMEEe5dAbeCwxw12BkAPnJqcO"
            alt="Spotlight on masterwork designer pieces"
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            className="absolute inset-0 bg-brand-primary/40 flex items-end p-4 md:p-8"
            aria-hidden="true"
          />
          <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8">
            <span className="text-brand-accent text-[10px] font-bold tracking-widest uppercase mb-2 block">
              Spotlight
            </span>
            <h3 className="font-serif text-2xl text-white italic">
              The Masterworks
            </h3>
          </div>
        </article>

        {/* Designer index */}
        <div className="col-span-1 md:col-span-1 bg-background-light p-6 md:p-10 flex flex-col justify-between h-auto md:h-[400px]">
          <div>
            <h3 className="font-serif text-2xl mb-8">Designer Index</h3>
            <ul className="space-y-4" aria-label="Featured designers">
              {[
                "Balenciaga",
                "Saint Laurent",
                "Gucci Archive",
                "Maison Margiela",
              ].map((designer) => (
                <li key={designer}>
                  <Link
                    className="text-xs font-bold tracking-widest uppercase hover:text-brand-accent transition-colors block"
                    href={`/designers/${designer.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {designer}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-6 mt-6 border-t border-border-color">
            <Link
              className="text-xs font-bold tracking-widest uppercase inline-flex items-center gap-2 group"
              href="/designers"
            >
              View All Brands
              <ArrowRight
                className="size-4 group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
