import Image from "next/image";
import Link from "next/link";

const galleryImages = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAONPieYOLIIyCEb1CI2UBxOcXSV__9oaY6tXrKoOrGA30rPK6xgRh-drfLiMyo8MNd70OJMzEwNEoRA93l6ffdVkkrydOqXbUID7Fi2WHylrqljHFd7gggYvmIwjVtEMMNywMvJIKzu4OVdvIBWFrtDyqoP1_tUw8WG5FBRY7U9vYysrxipEGf0FtAvvazPhlumA_GA3a6KJf_tULPe7WZ_GzHs_ZV0vp1YSYf0HmFVPwYTmMd9DdGsFydEDaWHDrUO6TChs4L9rxw",
    alt: "Fashion editorial — monochrome tailored suit",
    stagger: false,
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuATONzS5IsDEkFqVqLbj2Xeptb5WnPJ7rTHVaDuXo0GFqt4TmerIZMOloxYnTgwmBhI7Z3PfvJre7PRYIWyb6Bz7Lor28ci32v36iqP2N1NsxtcKTHvqW2kRCmTO9l2XJnCfnrtHyr9NXIEvylou4D_BkipNTLeWlA-7n_bMV2eWtLrlhtLoTdA6xaRuzcEc0JhFbWYyKTFUzOF4nn4PvT0stwimGlZ7-rMVseSWx9SYNrdZQB8XivZBNfBM_q3NTSV_Z27ow295x-g",
    alt: "Fashion editorial — structured blazer ensemble",
    stagger: true,
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBB6xzONwHCpUen7mjw_Zw52gWK6-W22rAgAbe2-Bbs5PCxwltbNhsDW87rzAerO5L8V04QOw5b9QoE1Itoore1xNVE9_dhxcvk5WqfEcn9rzeXsDcdCadgkN-xfg7lTXYGt0mGi0qRGiWQKb-r0YY1ZU8jqrHBZF5IzKKeZUZ0_UKz-jlk5P3zwjawyWVYrhOUZza1pC4fn0NaDM5CqJt2i96AgYiGoFQGGWssMOmGkM_dv4Vi_MqM0emvhRsG9hSIrFzCv2g8zsco",
    alt: "Fashion editorial — evening gown detail",
    stagger: false,
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyyvCC-HJbxYtKkLjk18VzaIqulQeimd9fK8uOGqhckrFmUQ0wa-AjcoRAbbU2Taoe4UX1zNaquTXpv8VSgdnw7W8TDNpc9oXIdzOgBSHL1FCaORlA_6wolQ7ARXro_CObJwAHWXqipm1RZX-Pmf19fd0nKNqmQpaaleQtAHZm4AGQMwaL0X2zhRrkBOE3zlyYZ2oBsguknzyP17IDi03zdyrNMWnqwtN_JJ75Dq4gIDTKippxHgncB6RSAHenMtiukIX4wZE0gRs9",
    alt: "Fashion editorial — leather accessories",
    stagger: true,
  },
] as const;

export function Gallery() {
  return (
    <section
      className="bg-brand-primary py-12 md:py-24"
      aria-labelledby="gallery-heading"
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-12">
        <div className="flex flex-col items-center mb-8 md:mb-16 text-center">
          <span className="text-brand-accent text-xs font-bold tracking-[0.4em] uppercase mb-4">
            Gallery
          </span>
          <h2
            id="gallery-heading"
            className="font-serif text-2xl md:text-4xl text-white"
          >
            Style Inspiration
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          {galleryImages.map((img, i) => (
            <Link
              key={i}
              href="/category/archive"
              className={`relative aspect-3/5 overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 block ${
                img.stagger ? "md:mt-12" : ""
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
