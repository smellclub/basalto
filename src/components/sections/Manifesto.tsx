
export function Manifesto() {
  return (
    <section aria-label="Sobre el estudio" className="border-b border-line">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-28 md:grid-cols-12 md:px-10 md:py-40">
        <p className="text-[0.7rem] uppercase tracking-[0.35em] text-muted md:col-span-3" data-reveal>
          El estudio
        </p>
        <div className="md:col-span-9">
          <p className="font-display text-3xl leading-[1.15] text-balance md:text-5xl" data-reveal>
            Antes de dibujar una línea, caminamos el terreno. Miramos dónde sale el sol, de dónde
            viene el viento y qué se ve desde cada punto.{" "}
            <span className="text-muted">
              La casa aparece después, casi siempre más baja y más quieta de lo que uno imagina.
            </span>
          </p>
          <dl className="mt-16 grid grid-cols-2 gap-8 border-t border-line pt-10 md:grid-cols-4" data-reveal>
            <Stat label="Obras terminadas" value="24" />
            <Stat label="Departamentos" value="5" />
            <Stat label="Materiales" value="Piedra, hormigón, vidrio" small />
            <Stat label="Desde" value="2011" />
          </dl>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <div>
      <dt className="text-[0.7rem] uppercase tracking-[0.25em] text-muted">{label}</dt>
      <dd className={`mt-3 font-display ${small ? "text-2xl leading-tight" : "text-5xl"}`}>{value}</dd>
    </div>
  );
}
