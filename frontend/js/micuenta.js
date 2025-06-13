// Mostrar favoritos guardados en localStorage
function mostrarFavoritos() {
  const lista = document.getElementById("lista-favoritos");
  if (!lista) return;

  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  lista.innerHTML = favoritos.length
    ? favoritos
        .map((fav, idx) => {
          let imgSrc = fav.imagen;
          if (imgSrc && !imgSrc.includes("/")) {
            imgSrc = "frontend/images/productos/" + imgSrc;
          }
          return `
          <li data-idx="${idx}">
            <img class="fav-img" src="${
              imgSrc || "frontend/images/default.jpg"
            }" alt="${fav.titulo || fav.nombre}">
            <span>${fav.titulo || fav.nombre}</span>
            <button class="quitar-fav" title="Quitar de favoritos">&#10006;</button>
          </li>
        `;
        })
        .join("")
    : "<li>No tenés favoritos guardados.</li>";

  document.querySelectorAll(".quitar-fav").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const idx = this.closest("li").dataset.idx;
      quitarFavorito(idx);
    });
  });
}

function quitarFavorito(idx) {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  favoritos.splice(idx, 1);
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  mostrarFavoritos();
}

// Simulación de carga de prenda
const formCargarPrenda = document.getElementById("form-cargar-prenda");
if (formCargarPrenda) {
  formCargarPrenda.addEventListener("submit", function (e) {
    e.preventDefault();
    // Simulación de carga exitosa con SweetAlert2
    Swal.fire({
      icon: "success",
      title: "¡Prenda cargada!",
      text: "Se simuló la carga de la prenda correctamente.",
      confirmButtonColor: "#885a89",
    });

    this.reset();
    setTimeout(
      () => (document.getElementById("mensaje-carga").textContent = ""),
      3000
    );
  });
}

// Foto de perfil: cargar y mostrar
function cargarFotoPerfil() {
  const img = document.getElementById("foto-perfil");
  if (!img) return;
  const fotoGuardada = localStorage.getItem("fotoPerfil");
  img.src = fotoGuardada || "frontend/images/usuario/user.png";
}

const inputFotoPerfil = document.getElementById("input-foto-perfil");
if (inputFotoPerfil) {
  inputFotoPerfil.addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (evt) {
      const imgBase64 = evt.target.result;
      localStorage.setItem("fotoPerfil", imgBase64);
      document.getElementById("foto-perfil").src = imgBase64;
    };
    reader.readAsDataURL(file);
  });
}

document.addEventListener("DOMContentLoaded", mostrarFavoritos);
document.addEventListener("DOMContentLoaded", cargarFotoPerfil);
