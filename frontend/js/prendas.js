const productos = [
  {
    titulo: "Remera oversize vintage",
    precio: 12000,
    categoria: "remera",
    destacado: true,
    imagen: "producto1.jpg",
    talle: "L",
    descripcion:
      "Remera de corte amplio estilo vintage, ideal para un look relajado y moderno.",
  },
  {
    titulo: "Zapatillas urbanas",
    precio: 35000,
    categoria: "calzado",
    destacado: false,
    imagen: "producto2.png",
    talle: "42",
    descripcion:
      "Zapatillas cómodas y versátiles para uso diario con estilo urbano.",
  },
  {
    titulo: "Pantalón cargo beige",
    precio: 22000,
    categoria: "pantalones",
    destacado: true,
    imagen: "producto3.jpg",
    talle: "M",
    descripcion:
      "Pantalón cargo de algodón con múltiples bolsillos y corte moderno.",
  },
  {
    titulo: "Campera denim clásica",
    precio: 38000,
    categoria: "camperas",
    destacado: false,
    imagen: "producto4.jpg",
    talle: "L",
    descripcion:
      "Campera de jean atemporal, perfecta para combinar con cualquier outfit.",
  },
  {
    titulo: "Top lencero negro",
    precio: 11000,
    categoria: "remera",
    destacado: true,
    imagen: "producto5.jpg",
    talle: "S",
    descripcion:
      "Top elegante de encaje negro con tirantes finos, ideal para la noche.",
  },
  {
    titulo: "Vestido floreado midi",
    precio: 24000,
    categoria: "vestidos",
    destacado: true,
    imagen: "producto16.jpeg",
    talle: "M",
    descripcion:
      "Vestido midi con estampado floral, fresco y femenino para el verano.",
  },
  {
    titulo: "Borcegos cuero negro",
    precio: 40000,
    categoria: "calzado",
    destacado: false,
    imagen: "producto6.jpg",
    talle: "40",
    descripcion:
      "Borcegos de cuero negro con diseño clásico, perfectos para el invierno.",
  },
  {
    titulo: "Pantalón recto sastrero",
    precio: 23000,
    categoria: "pantalones",
    destacado: true,
    imagen: "producto7.jpg",
    talle: "S",
    descripcion:
      "Pantalón sastrero de corte recto, ideal para un look elegante y formal.",
  },
  {
    titulo: "Campera inflable Kappa",
    precio: 42000,
    categoria: "camperas",
    destacado: true,
    imagen: "producto8.jpg",
    talle: "XL",
    descripcion:
      "Campera inflable con abrigo térmico y estilo deportivo de la marca Kappa.",
  },
  {
    titulo: "Remera gráfica 90s",
    precio: 15500,
    categoria: "remera",
    destacado: false,
    imagen: "producto9.jpg",
    talle: "M",
    descripcion:
      "Remera con diseño gráfico estilo noventoso, un guiño a la nostalgia.",
  },
  {
    titulo: "Zapatillas deportivas",
    precio: 37000,
    categoria: "calzado",
    destacado: true,
    imagen: "producto10.jpg",
    talle: "42",
    descripcion:
      "Zapatillas con tecnología de amortiguación, ideales para entrenar o caminar.",
  },
  {
    titulo: "Pantalón jean roturas",
    precio: 21000,
    categoria: "pantalones",
    destacado: false,
    imagen: "producto11.png",
    talle: "L",
    descripcion:
      "Jean con roturas modernas, estilo casual para todos los días.",
  },
  {
    titulo: "Campera cuero sintético",
    precio: 39500,
    categoria: "camperas",
    destacado: false,
    imagen: "producto12.jpg",
    talle: "M",
    descripcion:
      "Campera de cuero sintético con estilo urbano, resistente y con actitud.",
  },
  {
    titulo: "Remera básica negra",
    precio: 11500,
    categoria: "remera",
    destacado: false,
    imagen: "producto13.jpg",
    talle: "S",
    descripcion: "Remera lisa de algodón negra, para cualquier ocasión.",
  },
  {
    titulo: "Botines gamuza marrón",
    precio: 56000,
    categoria: "calzado",
    destacado: true,
    imagen: "producto14.jpg",
    talle: "40",
    descripcion:
      "Botines de gamuza marrón con diseño elegante y suela resistente.",
  },
  {
    titulo: "Campera vintage deportiva River Plate",
    precio: 51000,
    categoria: "camperas",
    destacado: true,
    imagen: "producto15.png",
    talle: "L",
    descripcion:
      "Campera retro de River Plate, para hinchas con estilo deportivo y nostálgico.",
  },
];

const contenedor = document.getElementById("productosContainer");
if (contenedor) {
  function renderProductos(productos) {
    contenedor.innerHTML = "";

    productos.forEach((producto, idx) => {
      const card = document.createElement("div");
      card.classList.add("card-producto");
      card.dataset.productoId = idx; // Usamos el índice como ID

      card.innerHTML = `
  <div class="imagen-contenedor">
    <img src="./frontend/images/productos/${
      producto.imagen || "placeholder.jpg"
    }" alt="${producto.titulo}">
    <div class="botones-hover">
      <button class="btn-ver-producto" data-producto-id="${idx}" title="Ver producto"><i class="fas fa-eye"></i></button>
      <button title="Agregar al carrito" class="detalle-btn"><i class="fas fa-shopping-bag"></i></button>
      <button title="Agregar a favorito" class="btn-favorito"><i class="fas fa-heart"></i></button>
    </div>
  </div>
  <div class="contenido">
    <h3>${producto.titulo}</h3>
    <p><strong>Precio:</strong> $${producto.precio}</p>
    <p><strong>Talle:</strong> ${producto.talle}</p>
    <div class="mensaje-fav">Se agregó a tus favoritos</div>
  </div>
`;

      contenedor.appendChild(card);
    });

    // Asocia los eventos a los botones después de renderizar
    setupBotonesProducto(productos);
  }

  // Render inicial
  renderProductos(productos);

  // Cargar categorías dinámicas
  const categoriasUnicas = [...new Set(productos.map((p) => p.categoria))];
  const selectCategoria = document.getElementById("filtro-categoria");
  if (selectCategoria) {
    categoriasUnicas.forEach((cat) => {
      const opcion = document.createElement("option");
      opcion.value = cat;
      opcion.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
      selectCategoria.appendChild(opcion);
    });
  }

  // Cargar talles dinámicos
  const tallesUnicos = [...new Set(productos.map((p) => p.talle))];
  const selectTalle = document.getElementById("filtro-talle");
  if (selectTalle) {
    tallesUnicos.forEach((t) => {
      const opcion = document.createElement("option");
      opcion.value = t;
      opcion.textContent = t;
      selectTalle.appendChild(opcion);
    });
  }

  // Filtro
  const filtroForm = document.getElementById("filtro-form");
  if (filtroForm) {
    filtroForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const titulo =
        document.getElementById("filtro-titulo")?.value.toLowerCase() || "";
      const categoria =
        document.getElementById("filtro-categoria")?.value || "";
      const talle = document.getElementById("filtro-talle")?.value || "";
      const ordenPrecio =
        document.getElementById("filtro-orden-precio")?.value || "";

      // Filtrar productos
      let productosFiltrados = productos.filter((p) => {
        const coincideTitulo = p.titulo.toLowerCase().includes(titulo);
        const coincideCategoria = categoria === "" || p.categoria === categoria;
        const coincideTalle = talle === "" || p.talle === talle;

        return coincideTitulo && coincideCategoria && coincideTalle;
      });

      // Ordenar por precio si se seleccionó un orden
      if (ordenPrecio === "asc") {
        productosFiltrados.sort((a, b) => a.precio - b.precio);
      } else if (ordenPrecio === "desc") {
        productosFiltrados.sort((a, b) => b.precio - a.precio);
      }

      renderProductos(productosFiltrados);
    });
  }
}

// Función unificada para todos los botones de la card
function setupBotonesProducto(productos) {
  document.querySelectorAll(".card-producto").forEach((card) => {
    const idx = card.dataset.productoId;

    // Hacer clic en la card abre el detalle
    card.addEventListener("click", function () {
      localStorage.setItem(
        "productoSeleccionado",
        JSON.stringify(productos[idx])
      );
      window.location.href = "detalle.html";
    });

    // Botón VER PRODUCTO
    const btnVer = card.querySelector('button[title="Ver producto"]');
    if (btnVer) {
      btnVer.addEventListener("click", function (e) {
        e.stopPropagation();
        localStorage.setItem(
          "productoSeleccionado",
          JSON.stringify(productos[idx])
        );
        window.location.href = "detalle.html";
      });
    }

    // Botón AGREGAR AL CARRITO
    const btnCarrito = card.querySelector('button[title="Agregar al carrito"]');
    if (btnCarrito) {
      btnCarrito.addEventListener("click", function (e) {
        e.stopPropagation();
        const producto = productos[idx];
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        // Abrir el modal
        const modal = document.getElementById("modal-carrito");
        if (modal) {
          modal.classList.add("abierto");
          if (typeof renderCarrito === "function") renderCarrito();
        }
        if (typeof actualizarCartCount === "function") actualizarCartCount();
      });
    }

    // Botón AGREGAR A FAVORITO con animación
    const btnFav = card.querySelector('button[title="Agregar a favorito"]');
    if (btnFav) {
      btnFav.addEventListener("click", function (e) {
        e.stopPropagation();
        let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        favoritos.push(productos[idx]);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));

        // Animación del corazón
        const icon = btnFav.querySelector("i");
        if (icon) {
          icon.classList.add("anim-fav");
          setTimeout(() => {
            icon.classList.remove("anim-fav");
          }, 600);
        }

        // Mostrar mensaje sutil
        const mensaje = card.querySelector(".mensaje-fav");
        if (mensaje) {
          mensaje.classList.add("visible");
          setTimeout(() => {
            mensaje.classList.remove("visible");
          }, 2000);
        }
      });
    }
  });
}
