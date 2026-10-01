# Basalto · web demo para estudios de arquitectura

Landing page + agenda online de consultas para un estudio de arquitectura **ficticio**. Sirve
como demo para ofrecerle su propia web a estudios, constructoras o inmobiliarias reales, y se
rebrandea editando un solo archivo.

**Stack:** Next.js 16 · TypeScript · Tailwind CSS 4 · Supabase (gratis) · Vercel (gratis).

## 1. Correrlo en tu compu

Necesitás [Node.js](https://nodejs.org) 20 o más nuevo.

```bash
npm install
cp .env.example .env.local   # después completás los valores (paso 2)
npm run dev                  # abre http://localhost:3000
```

Sin Supabase configurado la landing funciona, pero el formulario avisa que no puede cargar horarios.

## 2. Crear la base en Supabase

1. Entrá a [supabase.com](https://supabase.com), creá una cuenta y un proyecto nuevo (plan Free).
   Región: **São Paulo** (la más cercana a Uruguay).
2. Andá a **SQL Editor → New query**, pegá todo el contenido de `supabase/schema.sql` y tocá **Run**.
3. En **Project Settings → API** copiá:
   - la **Project URL** en `SUPABASE_URL`
   - la **service_role / secret key** en `SUPABASE_SERVICE_ROLE_KEY`
4. Generá un texto al azar para `IP_HASH_SALT` (`openssl rand -hex 32`, o cualquier texto largo).

> ⚠️ La service role key es como la llave maestra de la base: va solo en `.env.local` y en
> Vercel. Nunca en el código, ni en GitHub, ni en un chat.

> 💤 En el plan gratis, Supabase pausa el proyecto después de 7 días sin uso. Entrá al panel
> antes de mostrarle la demo a un cliente.

## 3. Subirlo a Vercel

1. Subí el repo a GitHub.
2. En [vercel.com](https://vercel.com) → **Add New → Project** → elegí el repo.
3. En **Environment Variables** cargá las mismas 3 variables de `.env.local`.
4. **Deploy**. Cuando tengas la URL final, ponela en `siteUrl` dentro de `business.ts`.

## 4. Rebrandear para otro estudio

Todo el contenido está en **`src/config/business.ts`**: nombre, eslogan, color de acento,
teléfono, dirección, horarios, tipos de reunión y honorarios, equipo, obras, proceso, preguntas
frecuentes y datos legales.

- **Fotos:** reemplazá las de `public/proyectos/` por fotos reales de las obras del cliente
  (JPG o WebP, idealmente verticales) y actualizá `heroImage` y `projects` en `business.ts`.
  Escribí un `alt` que describa cada foto: ayuda a la accesibilidad y al SEO.
- **Equipo:** sin fotos se muestran las iniciales. Con un cliente real, mejor retratos.
- **Legales:** `/privacidad` y `/terminos` son textos modelo. Tiene que revisarlos un profesional
  antes de usarlos con un negocio real.
- Si el cliente ya tiene una base de Supabase propia, cada estudio necesita **su propio proyecto**
  (no mezcles reuniones de dos negocios en la misma tabla).

## Cómo está protegida

| Qué | Cómo |
|---|---|
| La clave secreta no llega al navegador | Solo se usa en `src/lib/supabase-admin.ts`, que importa `server-only` (si alguien lo importa en el cliente, el build falla). |
| Nadie puede leer ni escribir la base desde afuera | RLS activado y sin políticas; solo el servidor escribe. |
| Reuniones superpuestas | Restricción `consultations_no_overlap` en la base: rechaza reuniones que se pisan para el mismo arquitecto, aunque lleguen dos pedidos al mismo tiempo. |
| Datos inválidos | Validación con Zod en el servidor (`src/lib/validation.ts`). |
| Spam | Campo trampa (honeypot) + máximo 5 reuniones por hora por IP + rechazo de fechas pasadas o fuera de horario. |
| Privacidad | Las IP se guardan hasheadas; sin cookies de seguimiento. |
| Ataques en el navegador | Headers de seguridad y Content-Security-Policy en `next.config.ts`. |

## Comandos

```bash
npm run dev     # desarrollo
npm run build   # build de producción
npm run lint    # revisar el código
```

