import { Quote } from "lucide-react";

export function Testimonials() {
  return (
    <section
      className="py-16 md:py-32 bg-background border-y border-border-color"
      aria-labelledby="testimonial-heading"
    >
      <h2 id="testimonial-heading" className="sr-only">
        What Our Members Say
      </h2>
      <div className="max-w-[1440px] mx-auto px-4 md:px-12">
        <figure className="max-w-4xl mx-auto text-center">
          <Quote
            className="w-10 h-10 text-brand-accent mb-8 md:mb-12 mx-auto rotate-180"
            aria-hidden="true"
          />
          <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-8 md:mb-12">
            &quot;The archive is exceptional. Being able to access such rare
            pieces with this level of service has completely changed how I think
            about my seasonal wardrobe.&quot;
          </blockquote>
          <figcaption>
            <span className="block text-xs font-bold tracking-widest uppercase">
              Elena V.
            </span>
            <span className="block text-[10px] tracking-[0.2em] text-text-muted uppercase mt-1">
              Founding Member • Paris
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
