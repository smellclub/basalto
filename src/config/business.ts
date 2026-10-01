/**
 * Todo el contenido del estudio vive acá.
 * Para rebrandear la web a otro estudio alcanza con editar este archivo
 * y cambiar las fotos de public/sierra/ y public/zona/.
 *
 * IMPORTANTE: "Basalto" es un estudio FICTICIO para usar como demo.
 * Nombres, equipo, dirección y teléfono son inventados. Las fotos de "El lugar" y
 * "Referencias" son reales (Wikimedia Commons) y llevan el crédito de su autor.
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

/** Crédito de una foto con licencia libre (Creative Commons). Es obligatorio mostrarlo. */
export type PhotoCredit = {
  author: string;
  license: string;
  licenseUrl: string;
  /** Página original de la foto. */
  source: string;
};

export type Photo = { src: string; alt: string; caption?: string; credit: PhotoCredit };

/**
 * Una construcción real de la zona que el estudio toma como referencia.
 * NO son obras del estudio: se muestran con su nombre real y el crédito de la foto.
 */
export type Reference = {
  id: string;
  name: string;
  place: string;
  /** Qué aprende el estudio de esta construcción. */
  lesson: string;
  image: Photo;
};

export const business = {
  name: "Basalto",
  kind: "Estudio de arquitectura",
  slogan: "Casas que pertenecen al lugar.",
  description:
    "Estudio de arquitectura en Montevideo. Diseñamos casas de piedra, hormigón y vidrio pensadas desde el terreno, la luz y el paisaje. Agendá una primera consulta sin costo.",
  /** URL pública donde va a vivir la web (para SEO y Open Graph). */
  siteUrl: "https://basalto-smellclub.vercel.app",

  /**
   * Foto principal: la Sierra de las Ánimas real (Wikimedia Commons, licencia CC BY-SA 2.0).
   * La oscurecemos con CSS para que combine con la paleta; el crédito se muestra en el hero.
   */
  heroImage: {
    src: "/sierra/sierra-aerea.jpg",
    alt: "Vista aérea de la Sierra de las Ánimas: cerros cubiertos de monte nativo bajo un cielo despejado",
    caption: "Sierra de las Ánimas, Maldonado",
    credit: {
      author: "Marcelo Campi",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
      source: "https://commons.wikimedia.org/wiki/File:Sierra_de_las_Animas_(45324359482).jpg",
    },
  } satisfies Photo,

  /**
   * Sección "El lugar": fotos reales de la sierra donde trabaja el estudio.
   * Fotos de Wikimedia Commons con licencia libre: el crédito se muestra debajo de cada una.
   */
  place: {
    title: "La sierra, antes que la casa.",
    intro:
      "Trabajamos sobre todo en la Sierra de las Ánimas y sus alrededores, entre Piriápolis y Pan de Azúcar. Granito, monte nativo, cañadas y el mar a lo lejos: ese es el punto de partida de cada proyecto.",
    photos: [
      {
        src: "/sierra/cumbre-mar.jpg",
        alt: "Piedras apiladas sobre una roca en la cumbre de la sierra, con el campo y la costa de Piriápolis al fondo",
        caption: "Cumbre, con vista a la costa",
        credit: {
          author: "Fabian Bandera",
          license: "CC BY 3.0",
          licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
          source: "https://commons.wikimedia.org/wiki/File:Sierra_de_las_%C3%81nimas_-_panoramio_(1).jpg",
        },
      },
      {
        src: "/sierra/ladera.jpg",
        alt: "Ladera de la sierra con afloramientos de piedra gris entre el monte nativo",
        caption: "Ladera de granito y monte nativo",
        credit: {
          author: "Fabian Bandera",
          license: "CC BY 3.0",
          licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
          source: "https://commons.wikimedia.org/wiki/File:Sierra_de_las_%C3%81nimas_-_panoramio_(2).jpg",
        },
      },
      {
        src: "/sierra/cascada.jpg",
        alt: "Cascada que cae entre rocas cubiertas de musgo en una cañada de la sierra",
        caption: "Cañada con cascada",
        credit: {
          author: "Fabian Bandera",
          license: "CC BY 3.0",
          licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
          source: "https://commons.wikimedia.org/wiki/File:Sierra_de_las_%C3%81nimas_-_panoramio_(4).jpg",
        },
      },
    ] satisfies Photo[],
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

  /**
   * Referencias: construcciones reales cerca de la Sierra de las Ánimas (fotos de Wikimedia
   * Commons con licencia libre). El estudio es ficticio y no tiene obras propias, así que
   * NO las presentamos como obras suyas. Con un cliente real, acá van sus obras terminadas.
   */
  references: [
    {
      id: "parador-san-antonio",
      name: "Parador del Cerro San Antonio",
      place: "Piriápolis, Maldonado",
      lesson:
        "Un volumen de vidrio apoyado en la ladera: la vista manda y la construcción se corre a un costado.",
      image: {
        src: "/zona/parador-san-antonio.jpg",
        alt: "Edificio bajo de vidrio y techo plano sobre la ladera del Cerro San Antonio, rodeado de vegetación",
        credit: {
          author: "Ricardo Freitas",
          license: "CC BY-SA 3.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
          source: "https://commons.wikimedia.org/wiki/File:Parador_Cerro_San_Antonio,_Piri%C3%A1polis_-_panoramio_(33).jpg",
        },
      },
    },
    {
      id: "castillo-piria",
      name: "Castillo de Piria",
      place: "Piriápolis, Maldonado",
      lesson:
        "Piedra y ladrillo de la zona, muros gruesos y almenas: una casa pensada para durar más de un siglo.",
      image: {
        src: "/zona/castillo-piria.jpg",
        alt: "Fachada del Castillo de Piria, de ladrillo rojo con almenas y ventanas en arco",
        credit: {
          author: "Ezarate",
          license: "CC BY-SA 4.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
          source: "https://commons.wikimedia.org/wiki/File:CastillodePiria-ene2023_(full_size).jpg",
        },
      },
    },
    {
      id: "hotel-escorial",
      name: "Hotel Escorial",
      place: "Piriápolis, Maldonado",
      lesson:
        "Curvas, balcones corridos y color: el art déco frente al mar demuestra que la luz también se diseña.",
      image: {
        src: "/zona/hotel-escorial.jpg",
        alt: "Edificio art déco celeste con balcones curvos y una torre vertical con el nombre del hotel",
        credit: {
          author: "Andrés Franchi Ugart…",
          license: "CC BY-SA 3.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
          source: "https://commons.wikimedia.org/wiki/File:Hotel_Escorial_de_Piri%C3%A1polis_-_panoramio.jpg",
        },
      },
    },
    {
      id: "castillo-pittamiglio",
      name: "Castillo Pittamiglio",
      place: "Las Flores, Maldonado",
      lesson:
        "Piedra de la costa, levantada a mano y con humor: cada muro cuenta quién lo hizo.",
      image: {
        src: "/zona/castillo-pittamiglio.jpg",
        alt: "Muros de piedra con una torre de ladrillo y un arco de entrada, bajo un cielo azul",
        credit: {
          author: "Marcelo Campi",
          license: "CC BY-SA 3.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
          source: "https://commons.wikimedia.org/wiki/File:Pittamiglio_Castle_(134479505).jpeg",
        },
      },
    },
  ] satisfies Reference[],

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
