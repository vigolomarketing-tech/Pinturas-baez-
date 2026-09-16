(function () {
  "use strict";

  // Colores para los placeholders de la galería (se van repitiendo).
  const COLORES_PLACEHOLDER = ["#0f2540", "#14335a", "#f5a623", "#4a5567"];

  const ICONOS_SERVICIOS = {
    silleta: `
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="12" y1="6" x2="12" y2="26" stroke="currentColor" stroke-width="3" />
        <line x1="52" y1="6" x2="52" y2="26" stroke="currentColor" stroke-width="3" />
        <rect x="10" y="26" width="44" height="10" rx="2" stroke="currentColor" stroke-width="3" />
        <line x1="16" y1="36" x2="16" y2="44" stroke="currentColor" stroke-width="3" />
        <line x1="48" y1="36" x2="48" y2="44" stroke="currentColor" stroke-width="3" />
        <rect x="20" y="44" width="24" height="4" rx="2" fill="currentColor" />
        <rect x="8" y="52" width="48" height="4" rx="2" fill="currentColor" />
      </svg>`,
    rodillo: `
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="14" y="14" width="36" height="16" rx="3" stroke="currentColor" stroke-width="3" />
        <rect x="29" y="30" width="6" height="18" fill="currentColor" />
        <rect x="23" y="48" width="18" height="6" rx="2" fill="currentColor" />
      </svg>`,
    mantenimiento: `
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 12l-6 6 4 4 6-6a10 10 0 0 1-13 13L12 48l4 4 19-19a10 10 0 0 0 13-13z"
          stroke="currentColor" stroke-width="3" stroke-linejoin="round" />
      </svg>`,
  };

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

  function renderServicios() {
    const grid = document.getElementById("servicios-grid");
    CONFIG.servicios.forEach((servicio) => {
      const card = document.createElement("div");
      card.className = "servicio-card reveal";
      card.innerHTML = `
        <div class="servicio-icono">${ICONOS_SERVICIOS[servicio.icono] || ""}</div>
        <h3>${servicio.titulo}</h3>
        <p>${servicio.descripcion}</p>
      `;
      grid.appendChild(card);
    });
  }

  function renderPorque() {
    const lista = document.getElementById("porque-lista");
    CONFIG.porQueElegirnos.forEach((punto) => {
      const li = document.createElement("li");
      li.className = "reveal";
      li.textContent = punto;
      lista.appendChild(li);
    });
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

  function renderPasos() {
    const lista = document.getElementById("pasos-lista");
    CONFIG.pasos.forEach((paso, indice) => {
      const li = document.createElement("li");
      li.className = "paso-item reveal";
      li.innerHTML = `
        <span class="paso-numero">${indice + 1}</span>
        <div>
          <h3>${paso.titulo}</h3>
          <p>${paso.descripcion}</p>
        </div>
      `;
      lista.appendChild(li);
    });
  }

  function renderContacto() {
    document.getElementById("contacto-zona").textContent = `Trabajamos en ${CONFIG.zona}.`;
    setWhatsappLink(document.getElementById("contacto-whatsapp-btn"), CONFIG.hero.botonTexto);
  }

  function renderFooter() {
    document.getElementById("footer-logo").appendChild(crearLogo(true));
    const anio = new Date().getFullYear();
    document.getElementById("footer-texto").textContent =
      `${CONFIG.nombre} · ${CONFIG.zona} · ${anio}`;
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
    renderServicios();
    renderPorque();
    renderGaleria();
    renderPasos();
    renderContacto();
    renderFooter();
    renderWhatsappFloat();
    initLightbox();
    initReveal();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
