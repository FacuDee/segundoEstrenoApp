function getCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

function setCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCartCount();
}

function actualizarCartCount() {
  const carrito = getCarrito();
  const cartCount = document.getElementById("cart-count");
  if (cartCount) cartCount.textContent = carrito.length;
}

// Renderiza el carrito (modal o página)
function renderCarrito() {
  const itemsDiv = document.getElementById("carrito-items");
  const totalDiv = document.getElementById("carrito-total");
  if (!itemsDiv) return;
  const carrito = getCarrito();
  actualizarCartCount();

  if (carrito.length === 0) {
    itemsDiv.innerHTML =
      "<p style='text-align:center;'>El carrito está vacío.</p>";
    if (totalDiv) totalDiv.textContent = "";
    return;
  }

  let total = 0;
  itemsDiv.innerHTML = carrito
    .map((prod, idx) => {
      total += Number(prod.precio);
      return `
      <div class="carrito-item">
    <div class="carrito-item-info">
      <img src="./frontend/images/productos/${prod.imagen}" alt="${prod.titulo}">
      <div>
        <strong>${prod.titulo}</strong><br>
        <span>$${prod.precio}</span> - <span>Talle: ${prod.talle}</span>
      </div>
    </div>
    <button class="quitar-item" data-idx="${idx}" title="Quitar">&times;</button>
  </div>
    `;
    })
    .join("");
  if (totalDiv) totalDiv.textContent = "Total: $" + total;

  // Quitar producto
  itemsDiv.querySelectorAll(".quitar-item").forEach((btn) => {
    btn.addEventListener("click", function () {
      const idx = this.dataset.idx;
      const carrito = getCarrito();
      carrito.splice(idx, 1);
      setCarrito(carrito);
      renderCarrito();
    });
  });
}

// Modal: abrir/cerrar y procesar compra
function setupModalCarrito() {
  const modal = document.getElementById("modal-carrito");
  const cerrarBtn = document.getElementById("cerrar-carrito");
  const irACarritoBtn = document.getElementById("ir-a-carrito");

  if (cerrarBtn) {
    cerrarBtn.addEventListener("click", function () {
      modal.classList.remove("abierto");
    });
  }
  if (irACarritoBtn) {
    irACarritoBtn.addEventListener("click", function () {
      window.location.href = "carrito.html";
    });
  }
}

// Inicialización automática según la página
document.addEventListener("DOMContentLoaded", function () {
  actualizarCartCount();

  // Si existe el modal, inicializa su lógica
  if (document.getElementById("modal-carrito")) {
    setupModalCarrito();
  }

  // Renderiza el carrito en cualquier página donde esté el contenedor
  if (document.getElementById("carrito-items")) {
    renderCarrito();
  }

  // Finalizar compra solo en la página carrito.html
  const finalizarBtn = document.getElementById("finalizar-compra");
  if (finalizarBtn) {
    finalizarBtn.addEventListener("click", function () {
      const metodo = localStorage.getItem("metodoPagoSeleccionado");
      const carrito = getCarrito();
      if (!carrito.length) {
        Swal.fire({
          icon: "warning",
          title: "El carrito está vacío",
          text: "Debe haber al menos un producto seleccionado.",
          confirmButtonColor: "#885a89",
          confirmButtonText: "Aceptar",
        });
        return;
      }
      if (!metodo) {
        Swal.fire({
          icon: "warning",
          title: "Elegí un método de pago",
          text: "Debes seleccionar uno para finalizar la compra.",
          confirmButtonColor: "#885a89",
          confirmButtonText: "Aceptar",
        });
        return;
      }
      Swal.fire({
        icon: "success",
        title: "¡Tu pedido fue procesado!",
        text: "(Aquí seguiría el proceso real de pago)",
        confirmButtonColor: "#885a89",
        confirmButtonText: "Aceptar",
      });
      setCarrito([]);
      renderCarrito();
      // Limpiar selección de método de pago
      const logos = document.querySelectorAll(".metodos-pago-logos img");
      logos.forEach((i) => i.classList.remove("seleccionado"));
      localStorage.removeItem("metodoPagoSeleccionado");
    });
  }
});

// Selección visual de método de pago
document.addEventListener("DOMContentLoaded", function () {
  const logos = document.querySelectorAll(".metodos-pago-logos img");
  logos.forEach((img) => {
    img.addEventListener("click", function () {
      logos.forEach((i) => i.classList.remove("seleccionado"));
      this.classList.add("seleccionado");
      // Si quieres guardar la selección:
      localStorage.setItem("metodoPagoSeleccionado", this.dataset.metodo);
    });
  });
  // Si quieres que recuerde la selección al recargar:
  const seleccionado = localStorage.getItem("metodoPagoSeleccionado");
  if (seleccionado) {
    const imgSel = document.querySelector(
      `.metodos-pago-logos img[data-metodo="${seleccionado}"]`
    );
    if (imgSel) imgSel.classList.add("seleccionado");
  }
});
