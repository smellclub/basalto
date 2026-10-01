"use client";

import Link from "next/link";
import { useActionState, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { business } from "@/config/business";
import { createBooking, getAvailableSlots, type BookingState } from "@/app/actions";
import { formatDuration, formatPrice } from "@/lib/format";
import { formatDateParts, openDatesFrom, todayInBusinessTz } from "@/lib/slots";
import { Confirmation } from "./Confirmation";

const initialState: BookingState = { status: "idle" };

// "Hoy" se calcula en el navegador (la página es estática y se genera en el build).
// useSyncExternalStore evita diferencias entre el HTML del servidor y el del navegador.
const noopSubscribe = () => () => {};
function useToday(): string | null {
  return useSyncExternalStore(noopSubscribe, () => todayInBusinessTz(), () => null);
}

type SlotsState = { key: string; slots: string[] | null };

export function BookingForm() {
  const [state, formAction, pending] = useActionState(createBooking, initialState);

  const [serviceId, setServiceId] = useState("");
  const [architectId, setArchitectId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [privacy, setPrivacy] = useState(false);

  const today = useToday();
  const dates = useMemo(() => (today ? openDatesFrom(today) : []), [today]);

  const service = business.services.find((s) => s.id === serviceId);
  const architects = business.architects.filter((b) => !serviceId || b.serviceIds.includes(serviceId));

  // Horarios libres: se piden al servidor cada vez que cambia tipo de reunión, arquitecto o fecha,
  // y también después de cada intento (por si alguien ganó el horario).
  const slotsKey = serviceId && architectId && date ? `${serviceId}|${architectId}|${date}` : "";
  const [slotsState, setSlotsState] = useState<SlotsState>({ key: "", slots: null });
  useEffect(() => {
    if (!slotsKey) return;
    let cancelled = false;
    getAvailableSlots({ serviceId, architectId, date })
      .then((res) => {
        if (!cancelled) setSlotsState({ key: slotsKey, slots: res.ok ? res.slots : null });
      })
      .catch(() => {
        if (!cancelled) setSlotsState({ key: slotsKey, slots: null });
      });
    return () => {
      cancelled = true;
    };
  }, [slotsKey, serviceId, architectId, date, state]);

  const slotsLoading = slotsKey !== "" && slotsState.key !== slotsKey;
  const slots = slotsState.key === slotsKey ? slotsState.slots : null;

  if (state.status === "success") return <Confirmation booking={state.booking} />;

  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {};

  function chooseService(id: string) {
    setServiceId(id);
    setTime("");
    const architect = business.architects.find((b) => b.id === architectId);
    if (architect && !architect.serviceIds.includes(id)) setArchitectId("");
  }

  return (
    <form action={formAction} className="space-y-12" noValidate={false}>
      {/* Honeypot: invisible para personas, tentador para bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Tu sitio web
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <fieldset>
        <legend className={legendClass}>1 · Tipo de reunión</legend>
        <div className="grid gap-2">
          {business.services.map((s) => (
            <label key={s.id} className={optionClass}>
              <input
                type="radio"
                name="serviceId"
                value={s.id}
                checked={serviceId === s.id}
                onChange={() => chooseService(s.id)}
                required
                className="sr-only"
              />
              <span className="flex w-full items-baseline justify-between gap-4">
                <span className="font-display text-2xl">{s.name}</span>
                <span className="shrink-0 text-sm text-accent">{formatPrice(s.price)}</span>
              </span>
              <span className="mt-2 block text-sm leading-relaxed text-muted">{s.description}</span>
              <span className="mt-3 block text-xs uppercase tracking-[0.2em] text-muted/80">
                {formatDuration(s.durationMinutes)} · {s.where}
              </span>
            </label>
          ))}
        </div>
        <FieldError id="serviceId" errors={errors} />
      </fieldset>

      <fieldset disabled={!serviceId}>
        <legend className={legendClass}>2 · Con quién</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {architects.map((b) => (
            <label key={b.id} className={optionClass}>
              <input
                type="radio"
                name="architectId"
                value={b.id}
                checked={architectId === b.id}
                onChange={() => {
                  setArchitectId(b.id);
                  setTime("");
                }}
                required
                className="sr-only"
              />
              <span className="font-display text-xl">{b.name}</span>
              <span className="mt-1 block text-xs text-muted">{b.role}</span>
            </label>
          ))}
        </div>
        <FieldError id="architectId" errors={errors} />
      </fieldset>

      <fieldset disabled={!architectId}>
        <legend className={legendClass}>3 · Día</legend>
        {dates.length === 0 ? (
          <p className="text-sm text-muted">Cargando fechas…</p>
        ) : (
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-3 md:mx-0 md:px-0">
            {dates.map((d) => {
              const p = formatDateParts(d);
              return (
                <label key={d} className={`${optionClass} w-20 shrink-0 text-center`}>
                  <input
                    type="radio"
                    name="date"
                    value={d}
                    checked={date === d}
                    onChange={() => {
                      setDate(d);
                      setTime("");
                    }}
                    required
                    className="sr-only"
                  />
                  <span className="block text-xs uppercase text-muted">{p.weekday}</span>
                  <span className="block font-display text-2xl">{p.day}</span>
                  <span className="block text-xs uppercase text-muted">{p.month}</span>
                </label>
              );
            })}
          </div>
        )}
        <FieldError id="date" errors={errors} />
      </fieldset>

      <fieldset disabled={!date}>
        <legend className={legendClass}>4 · Horario</legend>
        <div aria-live="polite">
          {!date ? (
            <p className="text-sm text-muted">Elegí tipo de reunión, arquitecto y día para ver los horarios libres.</p>
          ) : slotsLoading ? (
            <p className="text-sm text-muted">Buscando horarios libres…</p>
          ) : slots === null ? (
            <p className="text-sm text-muted">
              No pudimos cargar los horarios. Probá de nuevo o escribinos por WhatsApp.
            </p>
          ) : slots.length === 0 ? (
            <p className="text-sm text-muted">No quedan horarios libres ese día. Probá con otro.</p>
          ) : (
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
              {slots.map((t) => (
                <label key={t} className={`${optionClass} py-3 text-center`}>
                  <input
                    type="radio"
                    name="time"
                    value={t}
                    checked={time === t}
                    onChange={() => setTime(t)}
                    required
                    className="sr-only"
                  />
                  <span className="font-medium tabular-nums">{t}</span>
                </label>
              ))}
            </div>
          )}
        </div>
        <FieldError id="time" errors={errors} />
      </fieldset>

      <fieldset disabled={!time} className="space-y-5">
        <legend className={legendClass}>5 · Tus datos</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            id="name"
            label="Nombre"
            value={name}
            onChange={setName}
            autoComplete="name"
            required
            maxLength={80}
            errors={errors}
          />
          <TextField
            id="phone"
            label="Celular"
            type="tel"
            value={phone}
            onChange={setPhone}
            autoComplete="tel"
            inputMode="tel"
            placeholder="099 123 456"
            required
            maxLength={20}
            errors={errors}
          />
        </div>
        <TextField
          id="email"
          label="Email (opcional)"
          type="email"
          value={email}
          onChange={setEmail}
          autoComplete="email"
          maxLength={254}
          errors={errors}
        />
        <div>
          <label htmlFor="notes" className="mb-2 block text-sm text-muted">
            Contanos de tu proyecto (opcional)
          </label>
          <textarea
            id="notes"
            name="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            maxLength={600}
            placeholder="Terreno en la sierra, unos 200 m², queremos empezar la obra el año que viene…"
            aria-invalid={errors.notes ? true : undefined}
            aria-describedby={errors.notes ? "notes-error" : "notes-count"}
            className="w-full resize-y border border-line bg-ink-soft px-4 py-3 leading-relaxed text-paper placeholder:text-muted/60 focus:border-accent focus:outline-none"
          />
          <p id="notes-count" className="mt-1 text-right text-xs tabular-nums text-muted">
            {notes.length}/600
          </p>
          <FieldError id="notes" errors={errors} />
        </div>
        <div>
          <label className="flex items-start gap-3 text-sm leading-relaxed">
            <input
              type="checkbox"
              name="privacy"
              checked={privacy}
              onChange={(e) => setPrivacy(e.target.checked)}
              required
              aria-describedby={errors.privacy ? "privacy-error" : undefined}
              className="mt-1 size-4 shrink-0 accent-[var(--brand-accent)]"
            />
            <span>
              Acepto la{" "}
              <Link href="/privacidad" target="_blank" className="text-accent underline underline-offset-4">
                política de privacidad
              </Link>{" "}
              y que usen mis datos para coordinar esta reunión.
            </span>
          </label>
          <FieldError id="privacy" errors={errors} />
        </div>
      </fieldset>

      {state.status === "error" && (
        <p role="alert" className="border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200">
          {state.message}
        </p>
      )}

      <div className="flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          {service && time ? (
            <>
              {service.name} · {date.split("-").reverse().slice(0, 2).join("/")} · {time} ·{" "}
              <span className="text-paper">{formatPrice(service.price)}</span>
            </>
          ) : (
            "Completá los pasos para agendar."
          )}
        </p>
        <button
          type="submit"
          disabled={pending || !time || !privacy}
          className="min-h-12 bg-accent px-8 text-sm font-medium uppercase tracking-[0.25em] text-ink transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
        >
          {pending ? "Agendando…" : "Confirmar reunión"}
        </button>
      </div>
    </form>
  );
}

const legendClass = "mb-5 text-[0.7rem] font-medium uppercase tracking-[0.35em] text-accent";

// has-[:checked] marca la opción elegida; has-[:focus-visible] muestra el foco del teclado.
const optionClass =
  "relative block cursor-pointer border border-line px-4 py-4 transition-colors hover:border-paper/40 has-[:checked]:border-accent has-[:checked]:bg-accent/10 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent in-disabled:cursor-not-allowed in-disabled:opacity-40";

function FieldError({ id, errors }: { id: string; errors: Record<string, string> }) {
  if (!errors[id]) return null;
  return (
    <p id={`${id}-error`} className="mt-2 text-sm text-red-300">
      {errors[id]}
    </p>
  );
}

type TextFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  errors: Record<string, string>;
} & Omit<React.ComponentProps<"input">, "id" | "value" | "onChange" | "name">;

function TextField({ id, label, value, onChange, errors, ...rest }: TextFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm text-muted">
        {label}
      </label>
      <input
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={errors[id] ? true : undefined}
        aria-describedby={errors[id] ? `${id}-error` : undefined}
        className="h-12 w-full border border-line bg-ink-soft px-4 text-paper placeholder:text-muted/60 focus:border-accent focus:outline-none"
        {...rest}
      />
      <FieldError id={id} errors={errors} />
    </div>
  );
}
