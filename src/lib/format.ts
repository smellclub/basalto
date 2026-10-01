import { business } from "@/config/business";

const priceFormatter = new Intl.NumberFormat("es-UY", {
  style: "currency",
  currency: business.currency,
  currencyDisplay: "code",
  maximumFractionDigits: 0,
});

/** 150 → "USD 150" · 0 → "Sin costo" */
export function formatPrice(value: number): string {
  if (value === 0) return "Sin costo";
  return priceFormatter.format(value).replace(/ /g, " ");
}

/** 90 → "1 h 30 min" */
export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (!h) return `${m} min`;
  return m ? `${h} h ${m} min` : `${h} h`;
}
