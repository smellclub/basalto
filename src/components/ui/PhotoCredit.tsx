import type { PhotoCredit as Credit } from "@/config/business";

/**
 * Crédito obligatorio de una foto Creative Commons: autor, licencia y link a la original.
 * Si se edita la foto (acá la oscurecemos con CSS), la licencia pide aclararlo.
 */
export function PhotoCredit({ credit, edited = false }: { credit: Credit; edited?: boolean }) {
  return (
    <span className="text-[0.65rem] leading-relaxed tracking-normal normal-case text-paper/50">
      Foto:{" "}
      <a href={credit.source} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-paper">
        {credit.author}
      </a>
      ,{" "}
      <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-paper">
        {credit.license}
      </a>
      {edited ? ", color editado" : ""}, vía Wikimedia Commons
    </span>
  );
}
