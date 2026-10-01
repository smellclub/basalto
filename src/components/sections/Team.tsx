import Image from "next/image";
import { business } from "@/config/business";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function Team() {
  return (
    <section aria-labelledby="estudio-title" id="estudio" className="border-b border-line bg-ink-soft">
      <div className="mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40">
        <SectionTitle
          id="estudio-title"
          index="04"
          eyebrow="Equipo"
          title="Un estudio chico, a propósito."
          intro="Siempre te atiende la misma persona que dibuja tu casa."
        />
        <ul className="grid gap-10 md:grid-cols-3">
          {business.architects.map((a) => (
            <li key={a.id} className="group" data-reveal>
              {/* Mismo tratamiento en las tres fotos (desaturadas + tinte violeta) para que parezcan una sesión sola. */}
              <div className="relative aspect-[4/5] overflow-hidden border border-line transition-colors duration-500 group-hover:border-accent/60">
                <Image
                  src={a.image}
                  alt={`Retrato de ${a.name}`}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover brightness-[0.88] grayscale-[0.85] contrast-[1.05] transition duration-700 ease-out group-hover:scale-105 group-hover:grayscale-[0.3]"
                />
                <div aria-hidden className="absolute inset-0 bg-dusk/25 mix-blend-multiply" />
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/70 to-transparent" />
                <span aria-hidden className="absolute bottom-5 right-5 text-xs uppercase tracking-[0.3em] text-paper/80">
                  {business.name}
                </span>
              </div>
              <h3 className="mt-6 font-display text-3xl">{a.name}</h3>
              <p className="mt-1 text-xs uppercase tracking-[0.25em] text-accent">{a.role}</p>
              <p className="mt-4 leading-relaxed text-muted">{a.bio}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
