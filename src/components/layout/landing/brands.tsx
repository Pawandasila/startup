export function Brands() {
  const brands = ["PRADA", "LOEWE", "KHAITE", "CELINE", "TOTEME", "THE ROW"];

  return (
    <section
      className="bg-background-light border-b border-border-color py-10 md:py-12 overflow-hidden"
      aria-label="Featured designer brands"
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-12">
        <p className="text-[10px] uppercase tracking-[0.3em] text-text-muted mb-6 md:mb-8 text-center font-bold">
          Curated From Global Houses
        </p>
        <ul
          className="flex flex-wrap justify-center md:justify-between items-center gap-6 md:gap-12 lg:px-24"
          aria-label="Designer brand list"
        >
          {brands.map((brand) => (
            <li key={brand}>
              <span className="font-serif text-lg md:text-2xl font-bold tracking-tighter cursor-default">
                {brand}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
