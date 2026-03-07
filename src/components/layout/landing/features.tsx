import { Sparkles, Calendar, Package } from "lucide-react";

const steps = [
  {
    number: "01",
    phase: "Selection",
    icon: Sparkles,
    title: "Browse The Archive",
    description:
      "Access the season\u0027s most sought-after pieces, curated by our global fashion editors.",
  },
  {
    number: "02",
    phase: "Experience",
    icon: Calendar,
    title: "Rent For Your Event",
    description:
      "Reserve your chosen piece for 4 or 8 days. Complimentary dry cleaning included.",
  },
  {
    number: "03",
    phase: "Return",
    icon: Package,
    title: "Return With Ease",
    description:
      "Use the prepaid label to return. We handle the rest, ensuring perfection for the next guest.",
  },
] as const;

export function Features() {
  return (
    <section
      className="py-12 md:py-15 border-b border-border-color bg-background-light"
      aria-labelledby="features-heading"
    >
      <h2 id="features-heading" className="sr-only">
        How Luxe Rental Works
      </h2>
      <div className="max-w-[1440px] mx-auto px-4 md:px-12">
        <ol className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border-color border border-border-color">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <li
                key={step.number}
                className="p-6 md:p-12 group transition-colors hover:bg-surface"
              >
                <span className="font-serif text-sm italic text-brand-accent block mb-8">
                  {step.number} — {step.phase}
                </span>
                <Icon
                  className="w-10 h-10 mb-6 text-brand-primary"
                  strokeWidth={1}
                  aria-hidden="true"
                />
                <h3 className="font-serif text-2xl md:text-3xl mb-4">
                  {step.title}
                </h3>
                <p className="font-sans text-sm text-text-main/70 leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
