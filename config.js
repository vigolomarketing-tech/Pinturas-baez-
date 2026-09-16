/*
 * CONFIG central: todo el contenido editable del sitio vive acá.
 * main.js lee este objeto y arma la página. Para actualizar textos,
 * fotos, WhatsApp o servicios, alcanza con editar este archivo.
 */

const CONFIG = {
  // --- Datos generales ---
  nombre: "Pinturas Báez",
  zona: "CABA y GBA Sur",

  // Número de WhatsApp en formato internacional, sin "+" ni espacios.
  whatsapp: "5491145287310",
  whatsappMensaje:
    "Hola, vi su página y quiero pedir un presupuesto para un edificio.",

  // --- Logo ---
  // "normal" se usa en el header y sobre fondos claros.
  // "blanco" se usa sobre fondos oscuros (hero y footer). Si ese archivo
  // no existe todavía, se muestra "normal" dentro de un recuadro blanco.
  logo: {
    normal: "img/logo.png",
    blanco: "img/logo-blanco.png",
  },

  // --- Hero (portada) ---
  hero: {
    titulo: "Pintura y mantenimiento de edificios",
    subtitulo:
      "Trabajos en altura con silleta para fachadas y frentes, y mantenimiento de espacios comunes. Presupuesto sin cargo para tu consorcio.",
    botonTexto: "Pedir presupuesto por WhatsApp",
  },

  // --- Servicios ---
  // icono: "silleta" | "rodillo" | "mantenimiento"
  servicios: [
    {
      icono: "silleta",
      titulo: "Pintura de fachadas en altura",
      descripcion:
        "Pintura de frentes y medianeras con silleta, para edificios de cualquier altura, con los cuidados que requiere el trabajo vertical.",
    },
    {
      icono: "rodillo",
      titulo: "Palieres y espacios comunes",
      descripcion:
        "Pintura de palieres, escaleras, halls de entrada y demás espacios comunes, cuidando los tiempos de uso del edificio.",
    },
    {
      icono: "mantenimiento",
      titulo: "Mantenimiento general",
      descripcion:
        "Arreglos y mantenimiento edilicio en general, para que el edificio se mantenga en buen estado durante todo el año.",
    },
  ],

  // --- Por qué elegirnos ---
  porQueElegirnos: [
    "Experiencia en trabajos verticales con silleta",
    "Trabajo prolijo y cuidado de los espacios comunes",
    "Presupuesto sin cargo, sin compromiso",
    "Atención directa por WhatsApp con el encargado del trabajo",
  ],

  // --- Galería de trabajos ---
  // Poné las fotos reales en la carpeta /img con estos nombres de archivo.
  // Si la imagen todavía no existe, se muestra un placeholder automáticamente.
  galeria: [
    { src: "img/obra-1.jpg", alt: "Fachada de edificio pintada en altura" },
    { src: "img/obra-2.jpg", alt: "Palier pintado" },
    { src: "img/obra-3.jpg", alt: "Trabajo con silleta en frente de edificio" },
    { src: "img/obra-4.jpg", alt: "Escalera de espacio común pintada" },
    { src: "img/obra-5.jpg", alt: "Detalle de frente de edificio" },
    { src: "img/obra-6.jpg", alt: "Mantenimiento de espacio común" },
  ],

  // --- Cómo trabajamos ---
  pasos: [
    {
      titulo: "Nos escribís",
      descripcion:
        "Nos contás qué necesita tu edificio por WhatsApp y coordinamos una visita.",
    },
    {
      titulo: "Visitamos el edificio",
      descripcion:
        "Vamos a ver el edificio para entender bien el trabajo a realizar.",
    },
    {
      titulo: "Te pasamos presupuesto",
      descripcion:
        "Te enviamos el presupuesto detallado, sin cargo y sin compromiso.",
    },
    {
      titulo: "Hacemos el trabajo",
      descripcion:
        "Una vez aprobado, coordinamos día y horario y realizamos el trabajo.",
    },
  ],
};
