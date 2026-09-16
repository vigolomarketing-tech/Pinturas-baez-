(function () {
  "use strict";

  // Colores para los placeholders de la galería (se van repitiendo).
  const COLORES_PLACEHOLDER = ["#0f2540", "#14335a", "#f5a623", "#4a5567"];

  function whatsappUrl(mensaje) {
    const texto = encodeURIComponent(mensaje || CONFIG.whatsappMensaje);
    return `https://wa.me/${CONFIG.whatsapp}?text=${texto}`;
  }

  function setWhatsappLink(el, texto) {
    el.href = whatsappUrl();
    el.textContent = texto;
  }

  // Crea el <img> del logo. Sobre fondos oscuros intenta usar la versión
  // blanca; si ese archivo no existe todavía, cae en el logo normal
  // dentro de un recuadro blanco con bordes redondeados.
  function crearLogo(fondoOscuro) {
    const wrap = document.createElement("span");
    wrap.className = "logo-img-wrap";

    const img = document.createElement("img");
    img.className = "logo-img";
    img.alt = CONFIG.nombre;

    if (fondoOscuro) {
      img.src = CONFIG.logo.blanco;
      img.addEventListener(
        "error",
        () => {
          wrap.classList.add("logo-fallback-bg");
          img.src = CONFIG.logo.normal;
        },
        { once: true }
      );
    } else {
      img.src = CONFIG.logo.normal;
    }

    wrap.appendChild(img);
    return wrap;
  }

  function renderHeader() {
    document.getElementById("logo").appendChild(crearLogo(false));
    document.title = `${CONFIG.hero.titulo} | ${CONFIG.nombre}`;
    setWhatsappLink(document.getElementById("header-whatsapp-btn"), "WhatsApp");
  }

  function renderHero() {
    document.getElementById("hero-logo").appendChild(crearLogo(true));
    document.getElementById("hero-titulo").textContent = CONFIG.hero.titulo;
    document.getElementById("hero-subtitulo").textContent = CONFIG.hero.subtitulo;
    setWhatsappLink(document.getElementById("hero-whatsapp-btn"), CONFIG.hero.botonTexto);
  }

  function crearPlaceholder(alt, indice) {
    const div = document.createElement("div");
    div.className = "galeria-placeholder";
    div.style.background = COLORES_PLACEHOLDER[indice % COLORES_PLACEHOLDER.length];
    div.textContent = "Foto de obra";
    div.setAttribute("role", "img");
    div.setAttribute("aria-label", alt);
    return div;
  }

  function renderGaleria() {
    const grid = document.getElementById("galeria-grid");

    CONFIG.galeria.forEach((foto, indice) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "galeria-item reveal";
      btn.setAttribute("aria-label", `Ver foto: ${foto.alt}`);

      const img = document.createElement("img");
      img.src = foto.src;
      img.alt = foto.alt;
      img.loading = "lazy";
      img.addEventListener("error", () => {
        img.replaceWith(crearPlaceholder(foto.alt, indice));
      });

      btn.appendChild(img);
      btn.addEventListener("click", () => abrirLightbox(foto, indice));
      grid.appendChild(btn);
    });
  }

  function abrirLightbox(foto, indice) {
    const lightbox = document.getElementById("lightbox");
    const contenido = document.getElementById("lightbox-content");
    contenido.innerHTML = "";

    const img = document.createElement("img");
    img.src = foto.src;
    img.alt = foto.alt;
    img.addEventListener("error", () => {
      img.replaceWith(crearPlaceholder(foto.alt, indice));
    });

    contenido.appendChild(img);
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function cerrarLightbox() {
    const lightbox = document.getElementById("lightbox");
    lightbox.hidden = true;
    document.body.style.overflow = "";
  }

  function initLightbox() {
    document.getElementById("lightbox-close").addEventListener("click", cerrarLightbox);
    document.getElementById("lightbox").addEventListener("click", (e) => {
      if (e.target.id === "lightbox") cerrarLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") cerrarLightbox();
    });
  }

  function renderContacto() {
    setWhatsappLink(document.getElementById("contacto-whatsapp-btn"), CONFIG.hero.botonTexto);
  }

  function renderFooter() {
    document.getElementById("footer-logo").appendChild(crearLogo(true));
    document.getElementById("footer-anio").textContent = new Date().getFullYear();
  }

  function renderWhatsappFloat() {
    document.getElementById("whatsapp-float").href = whatsappUrl();
  }

  function initReveal() {
    const elementos = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      elementos.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    elementos.forEach((el) => observer.observe(el));
  }

  function init() {
    renderHeader();
    renderHero();
    renderGaleria();
    renderContacto();
    renderFooter();
    renderWhatsappFloat();
    initLightbox();
    initReveal();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
