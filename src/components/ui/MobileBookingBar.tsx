"use client";

import { useEffect, useState } from "react";

/**
 * Botón fijo "Agendar consulta" abajo de la pantalla, solo en celular.
 * Se oculta en el hero (que ya tiene su botón) y mientras #consulta está a la vista.
 */
export function MobileBookingBar() {
  // Arranca escondido: al cargar, lo primero que se ve es el hero.
  const [bookingVisible, setBookingVisible] = useState(true);

  useEffect(() => {
    const targets = ["inicio", "consulta"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          // El hero cuenta mientras se vea más de un 25 %; la agenda, apenas asoma.
          const min = e.target.id === "inicio" ? 0.25 : 0;
          if (e.isIntersecting && e.intersectionRatio >= min) visible.add(e.target);
          else visible.delete(e.target);
        }
        setBookingVisible(visible.size > 0);
      },
      { threshold: [0, 0.25] },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/90 p-3 backdrop-blur transition-transform duration-300 md:hidden ${
        bookingVisible ? "translate-y-full" : "translate-y-0"
      }`}
      // Cuando está escondido, que el lector de pantalla y el teclado lo ignoren.
      inert={bookingVisible}
    >
      <a
        href="#consulta"
        className="flex min-h-12 w-full items-center justify-center bg-accent text-sm font-medium uppercase tracking-[0.25em] text-ink transition-colors hover:bg-accent-hover"
      >
        Agendar consulta
      </a>
    </div>
  );
}
