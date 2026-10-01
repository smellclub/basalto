import { business, type Weekday } from "@/config/business";
import { SectionTitle } from "@/components/ui/SectionTitle";

const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
// Mostramos la semana empezando el lunes, como se lee en Uruguay.
const weekOrder: Weekday[] = [1, 2, 3, 4, 5, 6, 0];

export function Location() {
  const { address, contact } = business;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(address.mapsQuery)}&output=embed`;

  return (
    <section aria-labelledby="contacto-title" id="contacto" className="border-b border-line bg-ink-soft">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-28 md:grid-cols-2 md:px-10 md:py-40">
        <div>
          <SectionTitle id="contacto-title" index="06" eyebrow="Contacto" title="El estudio, en Ciudad Vieja." />
          <dl className="divide-y divide-line border-y border-line" data-reveal>
            {weekOrder.map((d) => {
              const h = business.openingHours[d];
              return (
                <div key={d} className="flex justify-between py-3 text-sm">
                  <dt className="text-muted">{dayNames[d]}</dt>
                  <dd className={h ? "" : "text-muted"}>{h ? `${h.open} a ${h.close}` : "Cerrado"}</dd>
                </div>
              );
            })}
          </dl>
          <address className="mt-8 not-italic leading-relaxed" data-reveal>
            {address.street}
            <br />
            {address.city}
            <br />
            <a href={`mailto:${contact.email}`} className="text-accent hover:text-accent-hover">
              {contact.email}
            </a>
            <br />
            <a href={`tel:+${contact.phoneE164}`} className="text-accent hover:text-accent-hover">
              {contact.phoneDisplay}
            </a>
          </address>
        </div>
        <div className="min-h-80 overflow-hidden border border-line" data-reveal>
          <iframe
            title={`Mapa: ${address.mapsQuery}`}
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full min-h-80 w-full grayscale invert-[0.92] contrast-[0.85] sepia-[0.15]"
          />
        </div>
      </div>
    </section>
  );
}
