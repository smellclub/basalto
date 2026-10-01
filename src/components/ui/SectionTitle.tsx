type Props = {
  id: string;
  /** Número de sección, como en un índice de libro ("01"). */
  index: string;
  eyebrow: string;
  title: string;
  intro?: string;
};

export function SectionTitle({ id, index, eyebrow, title, intro }: Props) {
  return (
    <header className="mb-14 max-w-3xl md:mb-20" data-reveal>
      <p className="mb-5 flex items-center gap-4 text-[0.7rem] font-medium uppercase tracking-[0.35em] text-muted">
        <span className="tabular-nums text-accent">{index}</span>
        <span aria-hidden className="h-px w-10 bg-line" />
        {eyebrow}
      </p>
      <h2 id={id} className="font-display text-5xl leading-[0.95] tracking-tight text-balance md:text-7xl">
        {title}
      </h2>
      {intro && <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">{intro}</p>}
    </header>
  );
}
