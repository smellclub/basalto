import { business } from "@/config/business";

const links = [
  { href: "#obras", label: "Obras" },
  { href: "#estudio", label: "Estudio" },
  { href: "#proceso", label: "Proceso" },
  { href: "#contacto", label: "Contacto" },
];

export function Header() {
  return (
    // absolute: el header flota sobre la foto del hero en vez de empujarla hacia abajo.
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-10">
        <a href="#inicio" className="text-sm font-medium uppercase tracking-[0.45em]">
          {business.name}
        </a>
        <nav aria-label="Principal" className="flex items-center gap-10">
          <ul className="hidden items-center gap-9 text-xs uppercase tracking-[0.25em] text-paper/70 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-paper">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#consulta"
            className="border border-paper/30 px-4 py-2.5 text-[0.7rem] uppercase tracking-[0.25em] backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
          >
            Agendar consulta
          </a>
        </nav>
      </div>
    </header>
  );
}
