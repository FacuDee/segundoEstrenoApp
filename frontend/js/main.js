document.addEventListener("DOMContentLoaded", () => {
  initHamburgerMenu();
  initModals();
});

/* ───── MENÚ HAMBURGUESA ───── */
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
  }

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

/* ───── MODALES DE LOGIN / REGISTER ───── */
function initModals() {
  const loginModal = document.getElementById("loginModal");
  const registerModal = document.getElementById("registerModal");
  const overlay = document.getElementById("overlay");
  const closeButtons = document.querySelectorAll(".close");

  const openModal = (modal) => {
    overlay?.classList.remove("hidden");
    modal?.classList.remove("hidden");
  };

  const closeModal = () => {
    overlay?.classList.add("hidden");
    loginModal?.classList.add("hidden");
    registerModal?.classList.add("hidden");
  };

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
}
