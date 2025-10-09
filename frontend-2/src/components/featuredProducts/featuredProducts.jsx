import './FeaturedProducts.css';
import imgBasica from '../../assets/featuredProducts/basica.jpg';
import imgChomba from '../../assets/featuredProducts/chomba.jpg';
import imgJean from '../../assets/featuredProducts/campera.jpg';

const productosDestacados = [
  {
    id: 1,
    nombre: 'Básica',
    descripcion: 'Remera básica color blanca 100% algodón',
    imagen: imgBasica,
  link: '/prendas'
  },
  {
    id: 2,
    nombre: 'Chomba',
    descripcion: 'Chomba básica estilo formal color gris de algodón',
    imagen: imgChomba,
    link: '/prendas' 
  },
  {
    id: 3,
    nombre: 'Campera de jean',
    descripcion: 'Abrigo clásico de jean oversize unisex',
    imagen: imgJean,
    link: '/prendas' 
  },
];

const FeaturedProducts = () => {
  return (
    <section className="destacados">
      <h2>PRODUCTOS DESTACADOS</h2>
      <div className="doble">
        {productosDestacados.map((producto) => (
          <div className="card" key={producto.id}>
            <img
              className="imgCard"
              src={producto.imagen}
              alt={producto.nombre}
            />
            <div className="card-info">
              <h3>{producto.nombre}</h3>
              <p className="text">{producto.descripcion}</p>
              <a href={producto.link}>
                <button className="btn-ver-mas">Ver más</button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;