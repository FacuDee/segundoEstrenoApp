document.addEventListener("DOMContentLoaded", () => {
  // Menú hamburguesa
  const toggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      toggle.classList.toggle("fa-bars");
      toggle.classList.toggle("fa-times");
    });
  }

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      toggle.classList.add("fa-bars");
      toggle.classList.remove("fa-times");
    });
  });
});
