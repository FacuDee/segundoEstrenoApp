document.addEventListener("DOMContentLoaded", () => {
  initHamburgerMenu();
  initModals();
  actualizarEstadoSesion();
});

const loginModal = document.getElementById("loginModal");
const registerModal = document.getElementById("registerModal");
const overlay = document.getElementById("overlay");

// Funciones globales para abrir/cerrar modales
function openModal(modal) {
  overlay?.classList.remove("hidden");
  modal?.classList.remove("hidden");
}

function closeModal() {
  overlay?.classList.add("hidden");
  loginModal?.classList.add("hidden");
  registerModal?.classList.add("hidden");
}

// ==========================
// MENÚ HAMBURGUESA
// ==========================
function initHamburgerMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const menuIcon = menuToggle?.querySelector("i");

  const closeMenu = () => {
    if (navLinks?.classList.contains("active")) {
      navLinks.classList.remove("active");
      menuIcon?.classList.replace("fa-times", "fa-bars");
    }
  };

  if (menuToggle && navLinks && menuIcon) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      navLinks.classList.toggle("active");

      const isActive = navLinks.classList.contains("active");
      menuIcon.classList.toggle("fa-bars", !isActive);
      menuIcon.classList.toggle("fa-times", isActive);
    });

    document.addEventListener("click", (e) => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        closeMenu();
      }
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) closeMenu();
    });
  }
}

// ==========================
// MODALES DE LOGIN / REGISTER
// ==========================
function initModals() {
  const closeButtons = document.querySelectorAll(".close");

  document.getElementById("btnLogin")?.addEventListener("click", (e) => {
    e.preventDefault();
    openModal(loginModal);
  });

  document.getElementById("btnRegister")?.addEventListener("click", (e) => {
    e.preventDefault();
    openModal(registerModal);
  });

  overlay?.addEventListener("click", closeModal);
  closeButtons.forEach((btn) => btn.addEventListener("click", closeModal));

  document.getElementById("linkToRegister")?.addEventListener("click", (e) => {
    e.preventDefault();
    loginModal?.classList.add("hidden");
    registerModal?.classList.remove("hidden");
    overlay?.classList.remove("hidden");
  });

  document.getElementById("linkToLogin")?.addEventListener("click", (e) => {
    e.preventDefault();
    registerModal?.classList.add("hidden");
    loginModal?.classList.remove("hidden");
    overlay?.classList.remove("hidden");
  });
}

// Simulación de registro
const registerForm = document.querySelector("#registerModal form");
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = registerForm.querySelector('input[type="text"]').value;
    const password = registerForm.querySelector('input[type="password"]').value;
    // Guarda usuario y contraseña (solo para simulación)
    localStorage.setItem(
      "usuarioRegistrado",
      JSON.stringify({ username, password })
    );
    closeModal();
    Swal.fire({
      icon: "success",
      title: "¡Cuenta creada!",
      text: "Ahora podés iniciar sesión.",
      confirmButtonColor: "#885a89",
    }).then(() => {
      openModal(loginModal); // Abre el modal de iniciar sesión inmediatamente después
    });
  });
}

// Simulación de login
const loginForm = document.querySelector("#loginModal form");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = loginForm.querySelector('input[type="text"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;
    const registrado = JSON.parse(localStorage.getItem("usuarioRegistrado"));
    if (!registrado) {
      Swal.fire({
        icon: "warning",
        title: "Primero creá tu cuenta",
        text: "Debes registrarte antes de iniciar sesión.",
        confirmButtonColor: "#885a89",
      });
      closeModal();
      return;
    }
    if (username === registrado.username && password === registrado.password) {
      localStorage.setItem("usuarioLogueado", username);
      closeModal();
      actualizarEstadoSesion();
      // Mensaje de bienvenida antes de redirigir
      Swal.fire({
        icon: "success",
        title: `¡Bienvenido/a, ${username}!`,
        text: "Iniciaste sesión correctamente.",
        confirmButtonColor: "#885a89",
      }).then(() => {
        // redirige a micuenta.html después de cerrar el modal
        window.location.href = "micuenta.html";
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Datos incorrectos",
        text: "Usuario o contraseña inválidos.",
        confirmButtonColor: "#885a89",
      });
    }
  });
}

// Mostrar/ocultar menú de usuario
document.body.addEventListener("click", function (e) {
  const userIcon = document.getElementById("user-icon");
  const dropdown = document.getElementById("user-dropdown");
  if (userIcon && dropdown) {
    if (userIcon.contains(e.target)) {
      dropdown.classList.toggle("hidden");
    } else if (!dropdown.contains(e.target)) {
      dropdown.classList.add("hidden");
    }
  }
  // Cerrar sesión con confirmación
  if (e.target.id === "logout-btn") {
    Swal.fire({
      // title: "¿Cerrar sesión?",
      text: "¿Estás seguro/a que querés cerrar tu sesión?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#885a89",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("usuarioLogueado");
        actualizarEstadoSesion();
        window.location.href = "index.html";
      }
    });
  }
});

// Actualiza la UI según el estado de sesión
function actualizarEstadoSesion() {
  const accountActions = document.querySelector(".account-actions");
  const usuario = localStorage.getItem("usuarioLogueado");
  if (accountActions) {
    if (usuario) {
      accountActions.innerHTML = `
  <div class="user-menu-container">
    <span id="user-icon" title="Mi cuenta">
      <i class="fas fa-user-circle icon"></i>
      <span class="user-name">${usuario}</span>
    </span>
    <div class="user-dropdown hidden" id="user-dropdown">
      <a href="micuenta.html" class="dropdown-item" id="mi-cuenta-btn">Mi Cuenta</a>
      <button id="logout-btn" class="dropdown-item" type="button">Cerrar sesión</button>
    </div>
  </div>
`;
    } else {
      accountActions.innerHTML = `
        <a href="#" class="account-link" id="btnRegister">CREAR CUENTA</a>
        <span class="divider">|</span>
        <a href="#" class="account-link" id="btnLogin">INICIAR SESIÓN</a>
      `;
    }
  }
  // Reasigna eventos a los nuevos botones
  document.getElementById("btnLogin")?.addEventListener("click", (e) => {
    e.preventDefault();
    openModal(loginModal);
  });
  document.getElementById("btnRegister")?.addEventListener("click", (e) => {
    e.preventDefault();
    openModal(registerModal);
  });
}

// ==========================
// Carrusel
// ==========================
document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".carousel-item");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".carousel-control.prev");
  const nextBtn = document.querySelector(".carousel-control.next");

  let currentIndex = 0;

  function showSlide(index) {
    items.forEach((item) => item.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    items[index].classList.add("active");
    dots[index].classList.add("active");
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % items.length;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    showSlide(currentIndex);
  }

  if (nextBtn && prevBtn && items.length && dots.length) {
    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentIndex = index;
        showSlide(currentIndex);
      });
    });

    // Movimiento cada 5 segundos
    setInterval(nextSlide, 5000);
  }
});

const btnScrollTop = document.getElementById("btn-scroll-top");

// ==========================
// Carrusel opiniones Mejorado
// ==========================

const usuarios = [
  {
    name: "Sofía Rivas",
    rating: 4.9,
    image: "https://randomuser.me/api/portraits/women/41.jpg",
    reviews: [
      "Excelente calidad y muy amable, todo llegó en perfecto estado. Amo la página. ¡La ropa es hermosa!",
    ],
  },
  {
    name: "Mauro Schmidt",
    rating: 4.9,
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    reviews: ["Productos de alta calidad. Buen trato y ropa como nueva"],
  },
  {
    name: "Luis Ortega",
    rating: 4.2,
    image: "https://randomuser.me/api/portraits/men/59.jpg",
    reviews: [
      "Siempre llega con responsabilidad. Muy rápido el envío y puntual",
    ],
  },
  {
    name: "Camila Soto",
    rating: 4.4,
    image: "https://randomuser.me/api/portraits/women/52.jpg",
    reviews: ["Gran experiencia comprando"],
  },
];

const carrusel = document.getElementById("carruselOpiniones");
const prevBtn = document.getElementById("opiniones-prev");
const nextBtn = document.getElementById("opiniones-next");
const dotsContainer = document.getElementById("opinionesDots");
let indiceActual = 0;

function obtenerEstrellas(puntaje) {
  const llenas = "★".repeat(Math.floor(puntaje));
  const media = puntaje % 1 >= 0.5 ? "½" : "";
  const vacías = "☆".repeat(5 - Math.ceil(puntaje));
  return `<span class="stars">${llenas}${media}${vacías}</span>`;
}

function crearTarjetas() {
  if (!carrusel) return;
  carrusel.innerHTML = "";
  usuarios.forEach((usuario) => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "user-card";
    tarjeta.innerHTML = `
      <img src="${usuario.image}" alt="Foto de ${usuario.name}">
      <div class="user-name">${usuario.name}</div>
      <div><strong>Calificación:</strong> ${obtenerEstrellas(
        usuario.rating
      )} (${usuario.rating.toFixed(1)})</div>
      <div class="opinion-text">"${usuario.reviews[0]}"</div>
    `;
    carrusel.appendChild(tarjeta);
  });
}

function crearDots() {
  if (!dotsContainer) return;
  dotsContainer.innerHTML = "";
  usuarios.forEach((_, idx) => {
    const dot = document.createElement("button");
    dot.className = "opiniones-dot" + (idx === indiceActual ? " active" : "");
    dot.addEventListener("click", () => {
      indiceActual = idx;
      actualizarCarrusel();
    });
    dotsContainer.appendChild(dot);
  });
}

function ajustarAnchoCarrusel() {
  if (carrusel) {
    carrusel.style.width = `${usuarios.length * 100}%`;
    Array.from(carrusel.children).forEach((card) => {
      card.style.width = `${100 / usuarios.length}%`;
    });
  }
}

function actualizarCarrusel() {
  if (!dotsContainer) return;
  carrusel.style.transform = `translateX(-${indiceActual * 100}%)`;
  Array.from(dotsContainer.children).forEach((dot, idx) => {
    dot.classList.toggle("active", idx === indiceActual);
  });
}

function moverCarrusel(direccion) {
  const total = usuarios.length;
  indiceActual = (indiceActual + direccion + total) % total;
  actualizarCarrusel();
}

function autoCarrusel() {
  setInterval(() => {
    moverCarrusel(1);
  }, 8000);
}

document.addEventListener("DOMContentLoaded", () => {
  crearTarjetas();
  crearDots();
  actualizarCarrusel();
  autoCarrusel();
  if (prevBtn) {
    prevBtn.addEventListener("click", () => moverCarrusel(-1));
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => moverCarrusel(1));
  }
});

// ==========================
// Botón flotante para volver arriba
// ==========================
if (btnScrollTop) {
  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 300) {
        btnScrollTop.style.display = "block";
      } else {
        btnScrollTop.style.display = "none";
      }
    },
    { passive: true }
  );

  btnScrollTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
