import { business } from "@/config/business";
import { SectionTitle } from "@/components/ui/SectionTitle";

/** "Lucía Ferrés" → "LF" */
function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
}

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
              {/*
                Sin fotos de personas: usamos las iniciales como monograma.
                Con un cliente real, acá van retratos (idealmente todos con la misma luz).
              */}
              <div
                aria-hidden
                className="flex aspect-[4/5] items-end justify-between border border-line bg-[radial-gradient(ellipse_at_30%_0%,color-mix(in_srgb,var(--color-dusk)_45%,transparent),transparent_70%)] p-6 transition-colors duration-500 group-hover:border-accent/60"
              >
                <span className="font-display text-8xl leading-none text-paper/90">{initials(a.name)}</span>
                <span className="text-xs uppercase tracking-[0.3em] text-muted">{business.name}</span>
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
