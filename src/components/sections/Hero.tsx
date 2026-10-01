import Image from "next/image";
import { business } from "@/config/business";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PhotoCredit } from "@/components/ui/PhotoCredit";

export function Hero() {
  const { heroImage } = business;
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      {/*
        Foto real de la sierra, de día. La oscurecemos y le bajamos el color con
        filtros CSS para que combine con la paleta nocturna de la marca.
        priority porque es lo primero que se ve (mejora el LCP).
      */}
      <Image
        src={heroImage.src}
        alt={heroImage.alt}
        fill
        priority
        sizes="100vw"
        className="hero-photo -z-20 object-cover object-[55%_50%] brightness-[0.5] saturate-[0.45] contrast-[1.1]"
      />
      {/* Tinte violeta arriba, como el cielo al anochecer. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(80_44_78/0.55),transparent_55%)] mix-blend-multiply"
      />
      {/* Degradés: aseguran contraste AA del texto y funden la foto con el fondo. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,var(--color-ink)_4%,rgb(13_11_15/0.55)_38%,rgb(13_11_15/0.15)_65%,rgb(13_11_15/0.55))]"
      />

      <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-14 pt-28 md:px-10 md:pb-20">
        <p className="mb-8 text-[0.7rem] font-medium uppercase tracking-[0.4em] text-paper/80">
          {business.kind} · {business.address.city}
        </p>
        <h1
          id="hero-title"
          className="max-w-5xl font-display text-[clamp(3.4rem,10vw,9rem)] leading-[0.9] tracking-tight"
        >
          Casas que <em className="text-accent">pertenecen</em> al lugar.
        </h1>
        <div className="mt-12 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#consulta">Agendar primera consulta</ButtonLink>
            <ButtonLink href="#lugar" variant="outline">
              Conocer la zona
            </ButtonLink>
          </div>
          <p className="flex flex-col gap-1 text-xs uppercase tracking-[0.25em] text-paper/60 md:items-end">
            <span className="hidden items-center gap-4 md:flex">
              <span aria-hidden className="h-px w-10 bg-paper/40" />
              {heroImage.caption}
            </span>
            <PhotoCredit credit={heroImage.credit} edited />
          </p>
        </div>
      </div>
    </section>
  );
}
