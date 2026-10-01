import Image from "next/image";
import { business } from "@/config/business";
import { PhotoCredit } from "@/components/ui/PhotoCredit";

export function Place() {
  const { place } = business;
  return (
    <section aria-labelledby="lugar-title" id="lugar" className="border-b border-line">
      <div className="mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40">
        <div className="grid gap-8 md:grid-cols-12 md:items-end" data-reveal>
          <h2 id="lugar-title" className="font-display text-5xl leading-[0.95] tracking-tight text-balance md:col-span-6 md:text-7xl">
            {place.title}
          </h2>
          <p className="max-w-lg leading-relaxed text-muted md:col-span-5 md:col-start-8">{place.intro}</p>
        </div>

        {/* Una foto grande y dos chicas: el ritmo de una revista, no una grilla pareja. */}
        <ul className="mt-16 grid gap-6 md:mt-20 md:grid-cols-12">
          {place.photos.map((photo, i) => (
            <li
              key={photo.src}
              className={i === 0 ? "md:col-span-7 md:row-span-2" : "md:col-span-5"}
              data-reveal
            >
              <figure>
                <div className={`relative overflow-hidden bg-ink-soft ${i === 0 ? "aspect-[4/5] md:aspect-auto md:h-[44rem]" : "aspect-[4/3]"}`}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes={i === 0 ? "(min-width: 768px) 58vw, 100vw" : "(min-width: 768px) 42vw, 100vw"}
                    className="object-cover brightness-[0.8] saturate-[0.7] transition-[filter] duration-700 hover:brightness-100 hover:saturate-100"
                  />
                </div>
                <figcaption className="mt-3 flex flex-col gap-1 text-xs uppercase tracking-[0.25em] text-muted sm:flex-row sm:items-baseline sm:justify-between">
                  {photo.caption}
                  <PhotoCredit credit={photo.credit} edited />
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
