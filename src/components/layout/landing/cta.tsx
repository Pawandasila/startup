import Link from "next/link";

export function CTA() {
  return (
    <section
      className="w-full bg-brand-primary py-8 border-t border-white/10"
      aria-label="Membership call to action"
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
        <div className="text-white text-center md:text-left">
          <h2 className="font-serif text-2xl md:text-3xl italic">
            Experience Haute Couture.
          </h2>
          <p className="text-white/60 text-xs tracking-widest uppercase mt-2 font-bold">
            Limited monthly memberships available.
          </p>
        </div>
        <Link
          className="bg-brand-accent text-brand-primary px-8 md:px-16 py-4 md:py-5 font-bold text-xs tracking-[0.3em] uppercase hover:bg-white transition-all transform hover:-translate-y-1 w-full md:w-auto text-center"
          href="/membership"
        >
          Start Your Journey
        </Link>
      </div>
    </section>
  );
}
