import { business } from "@/config/business";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function Process() {
  return (
    <section aria-labelledby="proceso-title" id="proceso" className="border-b border-line">
      <div className="mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40">
        <SectionTitle
          id="proceso-title"
          index="03"
          eyebrow="Proceso"
          title="Cuatro pasos, sin sorpresas."
          intro="Sabés qué pasa en cada etapa y cuánto cuesta antes de empezarla."
        />
        <ol className="grid gap-px bg-line md:grid-cols-4">
          {business.process.map((step, i) => (
            <li key={step.name} className="bg-ink p-8 md:min-h-72" data-reveal>
              <p className="text-xs tabular-nums text-accent">Paso {i + 1}</p>
              <h3 className="mt-10 font-display text-4xl">{step.name}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
