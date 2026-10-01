/**
 * Todo el contenido del estudio vive acá.
 * Para rebrandear la web a otro estudio alcanza con editar este archivo
 * y cambiar las fotos de public/proyectos/.
 *
 * IMPORTANTE: "Basalto" es un estudio FICTICIO para usar como demo.
 * Nombres, obras, dirección y teléfono son inventados.
 */

export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = domingo

/** Un tipo de reunión que se puede agendar online. */
export type Service = {
  id: string;
  name: string;
  description: string;
  /** Dónde se hace la reunión, en pocas palabras. */
  where: string;
  durationMinutes: number;
  /** En la moneda de `business.currency`. 0 = sin costo. */
  price: number;
};

export type Architect = {
  id: string;
  name: string;
  role: string;
  bio: string;
  /** Tipos de reunión que toma esta persona (ids de `services`). */
  serviceIds: string[];
};

export type Project = {
  id: string;
  name: string;
  place: string;
  year: number;
  /** Superficie construida, en m². */
  area: number;
  summary: string;
  image: { src: string; alt: string };
};

export const business = {
  name: "Basalto",
  kind: "Estudio de arquitectura",
  slogan: "Casas que pertenecen al lugar.",
  description:
    "Estudio de arquitectura en Montevideo. Diseñamos casas de piedra, hormigón y vidrio pensadas desde el terreno, la luz y el paisaje. Agendá una primera consulta sin costo.",
  /** URL pública donde va a vivir la web (para SEO y Open Graph). */
  siteUrl: "https://basalto-smellclub.vercel.app",

  /** Foto principal. Las fotos viven en public/proyectos/. */
  heroImage: {
    src: "/proyectos/mirador-exterior.webp",
    alt: "Casa baja de piedra oscura sobre el borde de un acantilado, al atardecer, con cipreses y sierras al fondo",
    caption: "Casa Mirador · Sierra de las Ánimas",
  },

  /** Colores de marca. El resto de la paleta (piedra oscura y crema) es fija. */
  colors: {
    accent: "#D9A86C", // la luz cálida de las ventanas al anochecer
    accentHover: "#E7BF8B",
  },

  /** Moneda de los honorarios publicados. En arquitectura en Uruguay es común cobrar en dólares. */
  currency: "USD",

  contact: {
    phoneDisplay: "099 456 789",
    /** Solo números, con código de país, para links tel: y wa.me */
    phoneE164: "59899456789",
    email: "estudio@basalto.example",
  },

  address: {
    street: "Rincón 540, piso 3",
    city: "Montevideo",
    region: "Montevideo",
    postalCode: "11000",
    country: "UY",
    /** Texto que se usa para el mapa embebido de Google Maps. */
    mapsQuery: "Rincón 540, Montevideo, Uruguay",
    geo: { lat: -34.9076, lng: -56.2071 },
  },

  social: {
    instagram: "https://instagram.com/basalto.demo",
    pinterest: "https://pinterest.com/basalto.demo",
  },

  /**
   * Zona horaria del estudio. Uruguay no tiene horario de verano desde 2015,
   * así que el offset es fijo. Si el cliente está en otro país, cambiá ambos.
   */
  timezone: "America/Montevideo",
  utcOffset: "-03:00",

  /** Horario de atención por día. `null` = cerrado. Formato 24 h "HH:MM". */
  openingHours: {
    0: null,
    1: { open: "09:00", close: "18:00" },
    2: { open: "09:00", close: "18:00" },
    3: { open: "09:00", close: "18:00" },
    4: { open: "09:00", close: "18:00" },
    5: { open: "09:00", close: "16:00" },
    6: null,
  } satisfies Record<Weekday, { open: string; close: string } | null>,

  booking: {
    /** Cada cuántos minutos puede empezar una reunión. */
    slotStepMinutes: 30,
    /** Hasta cuántos días para adelante se puede agendar. */
    maxDaysAhead: 45,
    /** Anticipación mínima: un día, para preparar la reunión. */
    minNoticeMinutes: 24 * 60,
  },

  /** Tipos de reunión que se agendan online (paso 1 del formulario). */
  services: [
    {
      id: "consulta-inicial",
      name: "Primera consulta",
      description: "Nos contás la idea, el terreno y el presupuesto. Te decimos cómo seguiría y qué cuesta.",
      where: "En el estudio o por videollamada",
      durationMinutes: 60,
      price: 0,
    },
    {
      id: "visita-terreno",
      name: "Visita al terreno",
      description: "Recorremos el terreno con vos: orientación, vistas, pendiente, accesos y normativa.",
      where: "Montevideo, Canelones, Maldonado y Lavalleja",
      durationMinutes: 180,
      price: 150,
    },
    {
      id: "revision-proyecto",
      name: "Revisión de proyecto",
      description: "Una segunda mirada a un proyecto que ya tenés o a una casa que pensás comprar.",
      where: "En el estudio",
      durationMinutes: 90,
      price: 90,
    },
  ] satisfies Service[],

  architects: [
    {
      id: "lucia",
      name: "Lucía Ferrés",
      role: "Arquitecta · Socia fundadora",
      bio: "Proyecta cada casa desde el terreno. Quince años entre sierras, costa y campo.",
      serviceIds: ["consulta-inicial", "visita-terreno", "revision-proyecto"],
    },
    {
      id: "tomas",
      name: "Tomás Olivera",
      role: "Arquitecto · Dirección de obra",
      bio: "Piedra, hormigón y detalles constructivos. Está en la obra hasta la última junta.",
      serviceIds: ["consulta-inicial", "visita-terreno"],
    },
    {
      id: "ines",
      name: "Inés Barreiro",
      role: "Interiorismo y luz",
      bio: "Diseña los interiores y la iluminación para que la casa cambie con el día.",
      serviceIds: ["consulta-inicial", "revision-proyecto"],
    },
  ] satisfies Architect[],

  /** Obras. Las fotos son verticales (9:16). */
  projects: [
    {
      id: "mirador",
      name: "Casa Mirador",
      place: "Sierra de las Ánimas, Maldonado",
      year: 2025,
      area: 320,
      summary:
        "Una sola planta apoyada en el borde del acantilado. El living es una ventana de dieciocho metros hacia el valle.",
      image: {
        src: "/proyectos/mirador-living.webp",
        alt: "Living oscuro con sillones bajos y un ventanal de piso a techo que enmarca un cañón con cipreses al atardecer",
      },
    },
    {
      id: "ladera",
      name: "Casa Ladera",
      place: "Villa Serrana, Lavalleja",
      year: 2024,
      area: 260,
      summary:
        "Enterrada en la pendiente, con techo verde. Desde arriba casi no se ve: la sierra sigue siendo la protagonista.",
      image: {
        src: "/proyectos/ladera.webp",
        alt: "Casa alargada con techo de pasto encastrada en la ladera de una sierra, con cipreses y un valle al fondo",
      },
    },
    {
      id: "patio",
      name: "Casa Patio",
      place: "Pueblo Garzón, Maldonado",
      year: 2024,
      area: 410,
      summary:
        "Muros de piedra que se cierran hacia afuera y se abren a un patio con espejo de agua. Silencio y sombra en verano.",
      image: {
        src: "/proyectos/patio.webp",
        alt: "Patio entre muros de piedra con un espejo de agua largo, cipreses al fondo y un cielo violeta con tormenta",
      },
    },
    {
      id: "umbral",
      name: "Casa Umbral",
      place: "Sierra de Minas, Lavalleja",
      year: 2023,
      area: 190,
      summary:
        "La cocina es el centro: una isla de piedra, una ventana horizontal a la altura de la mesada y la piscina a un paso.",
      image: {
        src: "/proyectos/umbral-cocina.webp",
        alt: "Cocina con isla de piedra vista a través de un ventanal, con una ventana horizontal hacia las sierras y una piscina en primer plano",
      },
    },
  ] satisfies Project[],

  /** Qué hace el estudio (sección "Qué hacemos"). */
  disciplines: [
    {
      name: "Vivienda",
      text: "Casas de campo, de sierra y de costa. Del primer croquis a los planos para el permiso.",
    },
    {
      name: "Interiorismo",
      text: "Materiales, equipamiento a medida e iluminación, pensados junto con la arquitectura.",
    },
    {
      name: "Dirección de obra",
      text: "Estamos en la obra cada semana y controlamos calidad, plazos y certificados.",
    },
    {
      name: "Reformas",
      text: "Casas existentes que necesitan otra luz, otra planta o simplemente abrirse al jardín.",
    },
  ],

  /** Cómo se trabaja con el estudio (sección "Proceso"). */
  process: [
    { name: "Consulta", text: "Una charla sin costo para entender qué buscás y si somos el estudio indicado." },
    { name: "Terreno", text: "Lo recorremos y estudiamos sol, vientos, vistas, suelo y normativa." },
    { name: "Proyecto", text: "Anteproyecto, maquetas y renders. Ajustamos hasta que la casa sea tuya." },
    { name: "Obra", text: "Permisos, presupuestos de empresas y dirección de obra hasta la entrega." },
  ],

  faq: [
    {
      q: "¿La primera consulta tiene costo?",
      a: "No. Es una reunión de una hora para conocernos y ver si tiene sentido trabajar juntos.",
    },
    {
      q: "¿Cómo se cobran los honorarios?",
      a: "Por etapas (anteproyecto, proyecto ejecutivo y dirección de obra), como un porcentaje del costo de obra o un monto fijo acordado de antemano.",
    },
    {
      q: "¿Trabajan fuera de Montevideo?",
      a: "Sí. La mayoría de nuestras obras están en Maldonado, Lavalleja y Rocha. Las visitas fuera de esos departamentos se coordinan aparte.",
    },
    {
      q: "Todavía no tengo terreno, ¿puedo consultar igual?",
      a: "Sí, y es un buen momento: te ayudamos a evaluar terrenos antes de comprar.",
    },
    {
      q: "¿Cómo cambio o cancelo una reunión?",
      a: "Escribinos por WhatsApp con al menos 24 horas de anticipación y la movemos.",
    },
  ],

  legal: {
    /** Quién es responsable de los datos personales (Ley 18.331). */
    dataControllerName: "Basalto (estudio ficticio de demostración)",
    dataControllerEmail: "privacidad@basalto.example",
    /** Días que se guardan las consultas agendadas antes de borrarlas. */
    bookingRetentionDays: 365,
    lastUpdated: "30 de setiembre de 2026",
  },
};

export type BusinessConfig = typeof business;
