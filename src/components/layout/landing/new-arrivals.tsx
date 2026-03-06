import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: string;
  brand: string;
  size: string;
  badge?: string;
  badgeColor?: string;
  image: string;
  hoverImage: string;
}

const products: Product[] = [
  {
    id: "loewe-silk-dress",
    name: "Silk Drape Dress",
    price: "$120/day",
    brand: "Loewe",
    size: "Size FR 38",
    badge: "RARE",
    badgeColor: "bg-brand-primary",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDLE80KaBzEPlxUK5mjZS8dik5fIBG76B76n4_aSvF4CDA9Cdxp5haCiu7moESyLCNSIuZFsJgRo8-3unnjFsV4lZmAt5BdT6_DLcc7Zmwpt7KHIOmlkKYsuZY7Gx3XIhLy-08YajIbLsfGXlCLwnhMwEhBrEcgRh--wmE-rlawfIZ3rbcfr9-Wd61dXGn7BBV3LR9Wqyjj218Pb8RNywW4FlmH0ebwezwAy4kSc4-J5x---uYF_5bjK5qnlLIsjL9IWpG0CSQ8zMtS",
    hoverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAONPieYOLIIyCEb1CI2UBxOcXSV__9oaY6tXrKoOrGA30rPK6xgRh-drfLiMyo8MNd70OJMzEwNEoRA93l6ffdVkkrydOqXbUID7Fi2WHylrqljHFd7gggYvmIwjVtEMMNywMvJIKzu4OVdvIBWFrtDyqoP1_tUw8WG5FBRY7U9vYysrxipEGf0FtAvvazPhlumA_GA3a6KJf_tULPe7WZ_GzHs_ZV0vp1YSYf0HmFVPwYTmMd9DdGsFydEDaWHDrUO6TChs4L9rxw",
  },
  {
    id: "row-blazer",
    name: "Structured Blazer",
    price: "$85/day",
    brand: "The Row",
    size: "Size FR 36",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAhO2Pxtn2QQ3r1scQfMsGsj2ta3sfKtwYL04q3JDy-_i8HHTR-g0dM7KdFtaVMr3P4f6aPdXdZcY73kAwwcnONIHw7-wrxQixCY6DMFHikgygo985rbHS4CAsR_qSAvBlvoS_TTvRH3aRcGe7guiO-gPtD9bIvpEbfIQQrQ6sR6KgdVKq3mjI1meS_m97dBtujR-o64irbh9OL2sY1Kb-Gq0-ATSMxirp7vS7D5WPtR2Ozx1BiZEzAJ9NYYWvriuIBN-yMeQPE0IWQ",
    hoverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuATONzS5IsDEkFqVqLbj2Xeptb5WnPJ7rTHVaDuXo0GFqt4TmerIZMOloxYnTgwmBhI7Z3PfvJre7PRYIWyb6Bz7Lor28ci32v36iqP2N1NsxtcKTHvqW2kRCmTO9l2XJnCfnrtHyr9NXIEvylou4D_BkipNTLeWlA-7n_bMV2eWtLrlhtLoTdA6xaRuzcEc0JhFbWYyKTFUzOF4nn4PvT0stwimGlZ7-rMVseSWx9SYNrdZQB8XivZBNfBM_q3NTSV_Z27ow295x-g",
  },
  {
    id: "valentino-gown",
    name: "Crepe Evening Gown",
    price: "$195/day",
    brand: "Valentino",
    size: "Size FR 40",
    badge: "NEW",
    badgeColor: "bg-brand-accent",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB84-Cat442JnF8eEqSzdwVV8S92Vc2xSJUDN3O6IK4F-QojcRoK7t6sKGkk6teuJjPQ54KyCUtKPyFwEC9H0MQJugXN-Q49qO75Ba9M7cGv4t9ff5poiHiduXTRUau7SlAHoaH210QCX2iqZIfnUjCmGhbEFVbu8qxBrzoPlPRo6NFwQh5vmH7NdgfDK6Zbuilu00S8ctMrL5-m44q2cKcj4U4oQSFL7fmmhnbAtM-zv8t_7FOu3DUwQsx7bvvJQ65xXNJiHXpFejp",
    hoverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBB6xzONwHCpUen7mjw_Zw52gWK6-W22rAgAbe2-Bbs5PCxwltbNhsDW87rzAerO5L8V04QOw5b9QoE1Itoore1xNVE9_dhxcvk5WqfEcn9rzeXsDcdCadgkN-xfg7lTXYGt0mGi0qRGiWQKb-r0YY1ZU8jqrHBZF5IzKKeZUZ0_UKz-jlk5P3zwjawyWVYrhOUZza1pC4fn0NaDM5CqJt2i96AgYiGoFQGGWssMOmGkM_dv4Vi_MqM0emvhRsG9hSIrFzCv2g8zsco",
  },
  {
    id: "bottega-pouch",
    name: "Intrecciato Pouch",
    price: "$60/day",
    brand: "Bottega Veneta",
    size: "One Size",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBrzaFwntdbTBHQvcGBIt2TRIOM0Mb2ZLEYkLmRdYlQa0Ew_4dDIyWA39u9_YYHouXB9kRmEuJdQDpXewDXeSl3iqtJIFtPlmAElp7O5h__7KsZuUvxkcgg-buO4KyaBljDJSmjQ578VP4Njr_5A1cBzNvDrYqumpElWpW9ghTQngKNTLX1olKUQaEaFuE3eD36VWndaU4WOMzgvhsrpRyBotvYfIfJo1BOzPqxJeitThzBc6zuxJw8EgdC46jJJT8bhI6BrjARPSiV",
    hoverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAyyvCC-HJbxYtKkLjk18VzaIqulQeimd9fK8uOGqhckrFmUQ0wa-AjcoRAbbU2Taoe4UX1zNaquTXpv8VSgdnw7W8TDNpc9oXIdzOgBSHL1FCaORlA_6wolQ7ARXro_CObJwAHWXqipm1RZX-Pmf19fd0nKNqmQpaaleQtAHZm4AGQMwaL0X2zhRrkBOE3zlyYZ2oBsguknzyP17IDi03zdyrNMWnqwtN_JJ75Dq4gIDTKippxHgncB6RSAHenMtiukIX4wZE0gRs9",
  },
];

export function NewArrivals() {
  return (
    <section
      className="py-12 md:py-24 bg-background-light max-w-[1440px] mx-auto px-4 md:px-12 border-x border-border-color"
      aria-labelledby="new-arrivals-heading"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 md:mb-16 gap-4">
        <div>
          <span className="text-brand-accent text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
            New To The Archive
          </span>
          <h2
            id="new-arrivals-heading"
            className="font-serif text-3xl md:text-5xl"
          >
            The Autumn Curation
          </h2>
        </div>
        <Link
          className="text-xs font-bold tracking-widest uppercase border-b border-brand-primary pb-1 shrink-0"
          href="/category/archive"
        >
          View Collection
        </Link>
      </div>
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-x-px gap-y-8 md:gap-y-12 bg-border-color"
        role="list"
        aria-label="New arrival products"
      >
        {products.map((product) => (
          <Link
            key={product.name}
            href={`/product/${product.id}`}
            className="group bg-background-light flex flex-col p-px"
            role="listitem"
          >
            <div className="relative aspect-3/4 overflow-hidden">
              <Image
                src={product.image}
                alt={`${product.name} by ${product.brand}`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-opacity duration-700 opacity-100 group-hover:opacity-0"
              />
              <Image
                src={product.hoverImage}
                alt={`${product.name} by ${product.brand} — alternate view`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-opacity duration-700 opacity-0 group-hover:opacity-100"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-brand-primary translate-y-full transition-transform duration-500 group-hover:translate-y-0">
                <button
                  className="w-full py-4 text-background text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-brand-accent transition-colors"
                  aria-label={`Quick rent ${product.name} — select size`}
                >
                  Quick Rent — Select Size
                </button>
              </div>
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <span
                    className={`${product.badgeColor} text-background text-[9px] font-bold px-2 py-1 tracking-widest uppercase`}
                  >
                    {product.badge}
                  </span>
                </div>
              )}
            </div>
            <div className="pt-4 md:pt-6 pb-2 px-1 md:px-2">
              <div className="flex justify-between items-start mb-2 gap-2">
                <h3 className="font-serif text-base md:text-lg">
                  {product.name}
                </h3>
                <span className="font-sans text-xs md:text-sm text-text-muted shrink-0">
                  {product.price}
                </span>
              </div>
              <p className="text-[10px] font-bold tracking-widest text-text-muted uppercase">
                {product.brand} • {product.size}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
