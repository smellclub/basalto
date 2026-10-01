import { business } from "@/config/business";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function Disciplines() {
  return (
    <section aria-labelledby="hacemos-title" className="border-b border-line bg-ink-soft">
      <div className="mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40">
        <SectionTitle id="hacemos-title" index="02" eyebrow="Qué hacemos" title="Del croquis a la llave." />
        <ul className="border-t border-line">
          {business.disciplines.map((d, i) => (
            <li
              key={d.name}
              className="group grid gap-3 border-b border-line py-8 transition-colors hover:bg-ink/60 md:grid-cols-12 md:items-baseline md:gap-10 md:px-4"
              data-reveal
            >
              <span className="text-xs tabular-nums text-muted md:col-span-1">0{i + 1}</span>
              <h3 className="font-display text-4xl leading-none transition-colors group-hover:text-accent md:col-span-5 md:text-5xl">
                {d.name}
              </h3>
              <p className="max-w-md leading-relaxed text-muted md:col-span-6">{d.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
