/*
 * CONFIG: datos interactivos que arma main.js (logo, WhatsApp, hero,
 * galería). Los textos de servicios, por qué elegirnos, cómo trabajamos
 * y contacto están escritos directamente en index.html para SEO.
 */

const CONFIG = {
  // --- Datos generales ---
  nombre: "Pinturas Báez",

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
};
