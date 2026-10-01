import { business } from "@/config/business";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="border-b border-line">
      <div className="mx-auto max-w-4xl px-5 py-28 md:px-10 md:py-40">
        <SectionTitle id="faq-title" index="07" eyebrow="Preguntas frecuentes" title="Lo que casi todos preguntan." />
        {/* <details> es accesible y funciona sin JavaScript. */}
        <div className="divide-y divide-line border-y border-line">
          {business.faq.map((item) => (
            <details key={item.q} className="group py-5" data-reveal>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-2xl md:text-3xl [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden
                  className="shrink-0 text-2xl text-accent transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
