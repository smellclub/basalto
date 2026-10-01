import { business } from "@/config/business";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { BookingForm } from "@/components/booking/BookingForm";
import { whatsappUrl } from "@/lib/whatsapp";

export function Booking() {
  return (
    <section aria-labelledby="consulta-title" id="consulta" className="border-b border-line">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-5 py-28 md:grid-cols-12 md:px-10 md:py-40">
        <div className="min-w-0 md:col-span-4">
          <div className="md:sticky md:top-10">
            <SectionTitle
              id="consulta-title"
              index="05"
              eyebrow="Agendá online"
              title="Hablemos de tu casa."
              intro="Elegí el tipo de reunión, con quién y cuándo. La primera consulta no tiene costo."
            />
            <p className="-mt-6 text-sm leading-relaxed text-muted md:-mt-10" data-reveal>
              ¿Preferís escribir?{" "}
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline underline-offset-4 hover:text-accent-hover"
              >
                WhatsApp
              </a>{" "}
              o{" "}
              <a
                href={`mailto:${business.contact.email}`}
                className="text-accent underline underline-offset-4 hover:text-accent-hover"
              >
                {business.contact.email}
              </a>
              .
            </p>
          </div>
        </div>
        <div className="min-w-0 md:col-span-8">
          <BookingForm />
        </div>
      </div>
    </section>
  );
}
