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

  document.getElementById("linkToRegister")?.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("loginModal")?.classList.add("hidden");
    document.getElementById("registerModal")?.classList.remove("hidden");
    document.getElementById("overlay")?.classList.remove("hidden");
  });

  document.getElementById("linkToLogin")?.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("registerModal")?.classList.add("hidden");
    document.getElementById("loginModal")?.classList.remove("hidden");
    document.getElementById("overlay")?.classList.remove("hidden");
  });
}

/*preguntas comprar y vender*/
document.addEventListener("DOMContentLoaded", function () {
    var questions = document.querySelectorAll(".faq-title");

    questions.forEach(function (question) {
        question.addEventListener("click", function () {
            var answer = this.nextElementSibling;
            if (answer.style.display === "none" || answer.style.display === "") {
                answer.style.display = "block";
            } else {
                answer.style.display = "none";
            }
        });
    });
});

// Carrusel
document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".carousel-item");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".carousel-control.prev");
  const nextBtn = document.querySelector(".carousel-control.next");

  let currentIndex = 0;

  function showSlide(index) {
    items.forEach(item => item.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

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
});