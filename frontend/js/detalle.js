const producto = JSON.parse(localStorage.getItem("productoSeleccionado"));
const productosRelacionadosDiv = document.getElementById("productosRelacionados");
if (producto) {
  document.getElementById("detalleProducto").innerHTML = `
    <div class="detalle-container">
      <div class="detalle-img">
        <img src="./frontend/images/productos/${producto.imagen}" alt="${producto.titulo}">
      </div>
      <div class="detalle-info">
        <h2>${producto.titulo}</h2>
        <div class="detalle-precio">$${producto.precio}</div>
        <p><strong>Categoría:</strong> ${producto.categoria}</p>
        <p><strong>Talle:</strong> ${producto.talle}</p>
        <div class="detalle-btns">
          <a href="prendas.html" class="detalle-btn">Volver</a>
          <button class="detalle-btn">Agregar al carrito</button>
        </div>
      </div>
    </div>
    <div id="banner-publicidad"></div>
  `;
} else {
  document.getElementById("detalleProducto").innerHTML =
    "<p>No se encontró el producto.</p>";
}

// Insertar el banner publicitario
const bannerDiv = document.getElementById("banner-publicidad");
if (bannerDiv) {
  bannerDiv.innerHTML = `
    <a href="https://yazuka.com.ar/" target="_blank" class="banner-link">
      <img src="./frontend/images/banners/banner-detalle.webp" alt="Publicidad" class="banner-img">
    </a>
  `;
}

// Mostrar productos relacionados
if (producto && typeof productos !== "undefined") {
  // Filtrar por misma categoría, distinto título
  const relacionados = productos
    .filter(p => p.categoria === producto.categoria && p.titulo !== producto.titulo)
    .slice(0, 3);

  if (relacionados.length > 0) {
    productosRelacionadosDiv.innerHTML = `
      <h3 class="relacionados-titulo">Productos relacionados</h3>
      <div class="relacionados-grid">
        ${relacionados.map((p, idx) => `
          <div class="relacionado-card" data-idx="${idx}">
            <div class="relacionado-img">
              <img src="./frontend/images/productos/${p.imagen}" alt="${p.titulo}">
            </div>
            <div class="relacionado-info">
              <h4>${p.titulo}</h4>
              <p class="relacionado-precio">$${p.precio}</p>
              <button class="relacionado-ver-btn">Ver producto</button>
            </div>
          </div>
        `).join("")}
      </div>
    `;

    // Agregar funcionalidad "Ver producto"
    document.querySelectorAll('.relacionado-ver-btn').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        const prod = relacionados[i];
        localStorage.setItem("productoSeleccionado", JSON.stringify(prod));
        window.location.href = "detalle.html"; // recarga para mostrar el nuevo detalle
      });
    });
  } else {
    productosRelacionadosDiv.innerHTML = "";
  }
}


