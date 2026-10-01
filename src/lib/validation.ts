import { z } from "zod";
import { business } from "@/config/business";
import { isDateString, isTimeString } from "@/lib/slots";

const serviceIds = business.services.map((s) => s.id) as [string, ...string[]];
const architectIds = business.architects.map((b) => b.id) as [string, ...string[]];

const date = z.string().refine(isDateString, "Fecha inválida");
const time = z.string().refine(isTimeString, "Horario inválido");

export const slotQuerySchema = z.object({
  serviceId: z.enum(serviceIds),
  architectId: z.enum(architectIds),
  date,
});

export const bookingSchema = z.object({
  serviceId: z.enum(serviceIds, "Elegí un tipo de reunión"),
  architectId: z.enum(architectIds, "Elegí con quién reunirte"),
  date,
  time,
  name: z
    .string()
    .trim()
    .min(2, "Escribí tu nombre")
    .max(80, "El nombre es demasiado largo"),
  phone: z
    .string()
    .trim()
    // Permitimos espacios, guiones y un "+" al inicio; después lo normalizamos.
    .regex(/^\+?[\d\s-]{8,20}$/, "Escribí un teléfono válido, por ejemplo 099 123 456")
    .transform((v) => v.replace(/[\s-]/g, "")),
  email: z
    .union([z.literal(""), z.email("Escribí un email válido").max(254)])
    .transform((v) => (v === "" ? null : v.toLowerCase())),
  notes: z
    .string()
    .trim()
    .max(600, "Contanos en 600 caracteres como máximo")
    .transform((v) => (v === "" ? null : v)),
  privacy: z.literal("on", "Tenés que aceptar la política de privacidad"),
});

export type BookingInput = z.infer<typeof bookingSchema>;
