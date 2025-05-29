const productos = [
  {
    titulo: "Remera oversize vintage",
    precio: 12000,
    categoria: "remera",
    destacado: true,
    imagen: "producto1.jpg",
    talle: "L",
  },
  {
    titulo: "Zapatillas urbanas",
    precio: 35000,
    categoria: "calzado",
    destacado: false,
    imagen: "producto2.png",
    talle: "42",
  },
  {
    titulo: "Pantalón cargo beige",
    precio: 22000,
    categoria: "pantalones",
    destacado: true,
    imagen: "producto3.jpg",
    talle: "M",
  },
  {
    titulo: "Campera denim clásica",
    precio: 38000,
    categoria: "camperas",
    destacado: false,
    imagen: "producto4.jpg",
    talle: "L",
  },
  {
    titulo: "Top lencero negro",
    precio: 11000,
    categoria: "remera",
    destacado: true,
    imagen: "producto5.jpg",
    talle: "S",
  },
  {
    titulo: "Vestido floreado midi",
    precio: 24000,
    categoria: "vestidos",
    destacado: true,
    imagen: "producto16.jpeg",
    talle: "M",
  },
  {
    titulo: "Botas cuero negro",
    precio: 40000,
    categoria: "calzado",
    destacado: false,
    imagen: "producto6.jpg",
    talle: "40",
  },
  {
    titulo: "Pantalón recto sastrero",
    precio: 23000,
    categoria: "pantalones",
    destacado: true,
    imagen: "producto7.jpg",
    talle: "S",
  },
  {
    titulo: "Campera inflable",
    precio: 42000,
    categoria: "camperas",
    destacado: true,
    imagen: "producto8.jpg",
    talle: "XL",
  },
  {
    titulo: "Remera gráfica 90s",
    precio: 15500,
    categoria: "remera",
    destacado: false,
    imagen: "producto9.jpg",
    talle: "M",
  },
  {
    titulo: "Zapatillas deportivas",
    precio: 37000,
    categoria: "calzado",
    destacado: true,
    imagen: "producto10.jpg",
    talle: "42",
  },
  {
    titulo: "Pantalón jean roturas",
    precio: 21000,
    categoria: "pantalones",
    destacado: false,
    imagen: "producto11.png",
    talle: "L",
  },
  {
    titulo: "Campera cuero sintético",
    precio: 39500,
    categoria: "camperas",
    destacado: false,
    imagen: "producto12.jpg",
    talle: "M",
  },
  {
    titulo: "Remera básica negra",
    precio: 11500,
    categoria: "remera",
    destacado: false,
    imagen: "producto13.jpg",
    talle: "S",
  },
  {
    titulo: "Botines gamuza marrón",
    precio: 56000,
    categoria: "calzado",
    destacado: true,
    imagen: "producto14.jpg",
    talle: "40",
  },
  {
    titulo: "Campera vintage deportiva",
    precio: 51000,
    categoria: "camperas",
    destacado: true,
    imagen: "producto15.png",
    talle: "L",
  },
];

// Cargar productos
const contenedor = document.getElementById("productosContainer");

function renderProductos(productos) {
  contenedor.innerHTML = "";

  productos.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("card-producto");

    card.innerHTML = `
      <img src="./frontend/images/${
        producto.imagen || "placeholder.jpg"
      }" alt="${producto.titulo}">
      <div class="contenido">
        <h3>${producto.titulo}</h3>
        <p><strong>Precio:</strong> $${producto.precio}</p>
        <p><strong>Talle:</strong> ${producto.talle}</p>
      </div>
    `;

    contenedor.appendChild(card);
  });
}

// Render inicial
renderProductos(productos);

// Cargar categorías dinámicas
const categoriasUnicas = [...new Set(productos.map((p) => p.categoria))];
const selectCategoria = document.getElementById("filtro-categoria");
categoriasUnicas.forEach((cat) => {
  const opcion = document.createElement("option");
  opcion.value = cat;
  opcion.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
  selectCategoria.appendChild(opcion);
});

// Cargar talles dinámicos
const tallesUnicos = [...new Set(productos.map((p) => p.talle))];
const selectTalle = document.getElementById("filtro-talle");
tallesUnicos.forEach((t) => {
  const opcion = document.createElement("option");
  opcion.value = t;
  opcion.textContent = t;
  selectTalle.appendChild(opcion);
});

// Filtro
document.getElementById("filtro-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const titulo = document.getElementById("filtro-titulo").value.toLowerCase();
  const categoria = document.getElementById("filtro-categoria").value;
  const talle = document.getElementById("filtro-talle").value;
  const ordenPrecio = document.getElementById("filtro-orden-precio").value;

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