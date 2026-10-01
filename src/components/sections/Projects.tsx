import Image from "next/image";
import { business } from "@/config/business";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function Projects() {
  return (
    <section aria-labelledby="obras-title" id="obras" className="border-b border-line">
      <div className="mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40">
        <SectionTitle
          id="obras-title"
          index="01"
          eyebrow="Obras"
          title="Casas bajas, muros de piedra y mucho cielo."
          intro="Una selección de obras recientes en las sierras y la costa este."
        />

        <ol className="space-y-28 md:space-y-44">
          {business.projects.map((p, i) => {
            // Alternamos foto a la izquierda y a la derecha para que el scroll no sea monótono.
            const flip = i % 2 === 1;
            return (
              <li key={p.id} className="grid items-end gap-8 md:grid-cols-12 md:gap-10">
                <figure
                  className={`group relative aspect-[4/5] overflow-hidden bg-ink-soft md:col-span-7 ${
                    flip ? "md:order-2 md:col-start-6" : ""
                  }`}
                  data-reveal
                >
                  <Image
                    src={p.image.src}
                    alt={p.image.alt}
                    fill
                    sizes="(min-width: 768px) 58vw, 100vw"
                    className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]"
                  />
                  {/* Marco fino que aparece al pasar el mouse, como un passe-partout. */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-4 border border-paper/0 transition-colors duration-700 group-hover:border-paper/25"
                  />
                </figure>

                <div
                  className={`md:col-span-4 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-9"}`}
                  data-reveal
                >
                  <p className="font-display text-7xl leading-none text-accent/80 md:text-8xl">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-6 font-display text-4xl leading-none md:text-5xl">{p.name}</h3>
                  <p className="mt-3 text-xs uppercase tracking-[0.25em] text-muted">{p.place}</p>
                  <p className="mt-6 leading-relaxed text-paper/80">{p.summary}</p>
                  <dl className="mt-8 flex gap-10 border-t border-line pt-5 text-sm">
                    <div>
                      <dt className="text-[0.7rem] uppercase tracking-[0.25em] text-muted">Año</dt>
                      <dd className="mt-1 tabular-nums">{p.year}</dd>
                    </div>
                    <div>
                      <dt className="text-[0.7rem] uppercase tracking-[0.25em] text-muted">Superficie</dt>
                      <dd className="mt-1 tabular-nums">{p.area} m²</dd>
                    </div>
                  </dl>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
