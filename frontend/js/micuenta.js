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

    const inputs = formCargarPrenda.querySelectorAll("input");
    const [nombre, descripcionInput, talleInput, precioInput, imagenInput] =
      inputs;

    const categoriaSelect = document.getElementById("categoria");
    const categoria = categoriaSelect.value;

    const titulo = nombre.value;
    const descripcion = descripcionInput.value;
    const talle = talleInput.value;
    const precio = parseFloat(precioInput.value);
    const imagen = imagenInput.files[0];

    const prendasGuardadas =
      JSON.parse(localStorage.getItem("misPrendas")) || [];
    const idxEditar = formCargarPrenda.dataset.editando;

    // Función auxiliar para guardar
    function guardarPrenda(imgBase64) {
      const prenda = {
        titulo,
        descripcion,
        categoria,
        talle,
        precio,
        imagenBase64: imgBase64,
      };

      if (idxEditar !== undefined) {
        // Editar
        prendasGuardadas[idxEditar] = prenda;
        delete formCargarPrenda.dataset.editando;
      } else {
        // Nueva
        prendasGuardadas.push(prenda);
      }

      localStorage.setItem("misPrendas", JSON.stringify(prendasGuardadas));
      mostrarPrendasCargadas();

      Swal.fire({
        icon: "success",
        title:
          idxEditar !== undefined ? "¡Prenda editada!" : "¡Prenda cargada!",
        text: "La operación se completó correctamente.",
        confirmButtonColor: "#885a89",
      });

      formCargarPrenda.reset();
      document.getElementById("preview-imagen-actual").innerHTML = "";
    }

    if (imagen) {
      const reader = new FileReader();
      reader.onload = function (evt) {
        guardarPrenda(evt.target.result);
      };
      reader.readAsDataURL(imagen);
    } else {
      // Si no hay imagen nueva y estamos editando, conservar la anterior
      if (idxEditar !== undefined) {
        const prendaAnterior = prendasGuardadas[idxEditar];
        guardarPrenda(prendaAnterior.imagenBase64);
      }
    }
  });
}

// Agregar prenda al DOM
// Esta función se usa para mostrar las prendas cargadas en la sección de "Mis prendas"
function agregarPrendaAlDOM(prenda, idx) {
  const grid = document.getElementById("grid-prendas-cargadas");
  if (!grid) return;

  const card = document.createElement("div");
  card.className = "relacionado-card";
  card.dataset.idx = idx; // identificador único

  card.innerHTML = `
    <div class="relacionado-img">
      <img src="${prenda.imagenBase64}" alt="${prenda.titulo}">
    </div>
    <div class="relacionado-info">
      <h4>${prenda.titulo}</h4>
      <p class="relacionado-precio">$${prenda.precio}</p>
      <div class="relacionado-botones">
        <button class="relacionado-ver-btn">Ver</button>
        <button class="editar-prenda-btn">Editar</button>
        <button class="eliminar-prenda-btn">Eliminar</button>
      </div>
    </div>
  `;

  // Ver producto
  card.querySelector(".relacionado-ver-btn").addEventListener("click", () => {
    localStorage.setItem("productoSeleccionado", JSON.stringify(prenda));
    window.location.href = "detalle.html";
  });

  // Eliminar
  card.querySelector(".eliminar-prenda-btn").addEventListener("click", () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará la prenda definitivamente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#885a89",
      cancelButtonColor: "#888",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarPrenda(idx);
        Swal.fire({
          icon: "success",
          title: "Prenda eliminada",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  });

  // Editar
  card.querySelector(".editar-prenda-btn").addEventListener("click", () => {
    editarPrenda(idx);
  });

  grid.appendChild(card);
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
  inputFotoPerfil.addEventListener("change", function (e) {
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

// Cargar prendas desde localStorage al iniciar la página
function cargarPrendasDesdeLocalStorage() {
  const prendasGuardadas = JSON.parse(localStorage.getItem("misPrendas")) || [];
  prendasGuardadas.forEach((prenda) => agregarPrendaAlDOM(prenda));
}

function mostrarPrendasCargadas() {
  const grid = document.getElementById("grid-prendas-cargadas");
  if (!grid) return;
  grid.innerHTML = "";

  const prendas = JSON.parse(localStorage.getItem("misPrendas")) || [];
  prendas.forEach((prenda, idx) => {
    agregarPrendaAlDOM(prenda, idx);
  });
}

function eliminarPrenda(idx) {
  const prendas = JSON.parse(localStorage.getItem("misPrendas")) || [];
  prendas.splice(idx, 1);
  localStorage.setItem("misPrendas", JSON.stringify(prendas));
  mostrarPrendasCargadas();
}

function editarPrenda(idx) {
  const prendas = JSON.parse(localStorage.getItem("misPrendas")) || [];
  const prenda = prendas[idx];
  if (!prenda) return;

  const inputs = formCargarPrenda.querySelectorAll("input");
  const [nombre, descripcion, talle, precio, imagenInput] = inputs;
  const categoriaSelect = document.getElementById("categoria");

  nombre.value = prenda.titulo;
  descripcion.value = prenda.descripcion;
  categoriaSelect.value = prenda.categoria;
  talle.value = prenda.talle;
  precio.value = prenda.precio;
  imagenInput.value = ""; // se limpia porque no se puede setear directamente

  // Guardamos el índice en el dataset del form
  formCargarPrenda.dataset.editando = idx;

  // Mostrar imagen actual como vista previa
  const preview = document.getElementById("preview-imagen-actual");
  if (preview) {
    preview.innerHTML = `
      <p style="margin: 0.3em 0;"><strong>Imagen actual:</strong></p>
      <img src="${prenda.imagenBase64}" alt="Imagen actual" style="max-width: 150px; border: 1px solid #ccc; padding: 4px; border-radius: 8px;" />
    `;
  }

  // Resaltar inputs
  inputs.forEach((input) => input.classList.add("editando"));

  // Quitar resaltado luego de 3 segundos
  setTimeout(() => {
    inputs.forEach((input) => input.classList.remove("editando"));
  }, 3000);

  const offsetTop =
    formCargarPrenda.getBoundingClientRect().top + window.scrollY - 300;
  window.scrollTo({ top: offsetTop, behavior: "smooth" });

  formCargarPrenda.querySelector("input")?.focus();
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarFavoritos();
  cargarFotoPerfil();
  cargarPrendasDesdeLocalStorage();
  mostrarPrendasCargadas();
});
