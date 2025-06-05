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
    itemsDiv.innerHTML = "<p style='text-align:center;'>El carrito está vacío.</p>";
    if (totalDiv) totalDiv.textContent = "";
    return;
  }

  let total = 0;
  itemsDiv.innerHTML = carrito.map((prod, idx) => {
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
  }).join("");
  if (totalDiv) totalDiv.textContent = "Total: $" + total;

  // Quitar producto
  itemsDiv.querySelectorAll(".quitar-item").forEach(btn => {
    btn.addEventListener("click", function() {
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
    cerrarBtn.addEventListener("click", function() {
      modal.classList.remove("abierto");
    });
  }
  if (irACarritoBtn) {
    irACarritoBtn.addEventListener("click", function() {
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
      alert("¡Gracias por tu compra! (Aquí iría el proceso real de pago)");
      setCarrito([]);
      renderCarrito();
    });
  }
});