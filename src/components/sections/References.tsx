import Image from "next/image";
import { business } from "@/config/business";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PhotoCredit } from "@/components/ui/PhotoCredit";

/**
 * Construcciones reales de la zona que el estudio toma como referencia.
 * Se aclara en la propia sección que no son obras del estudio.
 */
export function References() {
  return (
    <section aria-labelledby="referencias-title" id="referencias" className="border-b border-line">
      <div className="mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40">
        <SectionTitle
          id="referencias-title"
          index="01"
          eyebrow="Referencias"
          title="Lo que nos enseña la zona."
          intro="Construcciones de Piriápolis y alrededores, a la sombra de la Sierra de las Ánimas, que miramos antes de proyectar. No son obras del estudio: son las que nos inspiran."
        />

        <ol className="space-y-24 md:space-y-36">
          {business.references.map((r, i) => {
            // Alternamos foto a la izquierda y a la derecha para que el scroll no sea monótono.
            const flip = i % 2 === 1;
            return (
              <li key={r.id} className="grid items-end gap-8 md:grid-cols-12 md:gap-10">
                <figure className={`md:col-span-7 ${flip ? "md:order-2 md:col-start-6" : ""}`} data-reveal>
                  <div className="group relative aspect-[4/3] overflow-hidden bg-ink-soft">
                    <Image
                      src={r.image.src}
                      alt={r.image.alt}
                      fill
                      sizes="(min-width: 768px) 58vw, 100vw"
                      className="object-cover brightness-[0.85] saturate-[0.75] transition duration-[1600ms] ease-out group-hover:scale-[1.04] group-hover:brightness-100 group-hover:saturate-100"
                    />
                  </div>
                  <figcaption className="mt-3">
                    <PhotoCredit credit={r.image.credit} edited />
                  </figcaption>
                </figure>

                <div className={`md:col-span-4 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-9"}`} data-reveal>
                  <p className="font-display text-7xl leading-none text-accent/80 md:text-8xl">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-6 font-display text-4xl leading-none md:text-5xl">{r.name}</h3>
                  <p className="mt-3 text-xs uppercase tracking-[0.25em] text-muted">{r.place}</p>
                  <p className="mt-6 leading-relaxed text-paper/80">{r.lesson}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
