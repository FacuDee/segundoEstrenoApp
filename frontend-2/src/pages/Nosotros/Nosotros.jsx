import React from 'react';
import './Nosotros.css';
import { FaCheck , FaBullhorn} from 'react-icons/fa';
import nosotrosImg from '../../assets/nosotros/nosotros-img.jpg';

const Nosotros = () => {
  return (
    <main>
      <div className="container-padre">
        <div className="nosotros-item">
          <h1>Nosotros</h1>
        </div>

        <div className="nosotros-img">
          <img
            src={nosotrosImg}
            className="imgNosotros"
            alt="Nosotros"
          />
        </div>

        <div className="subtitulo-nosotros">
          <h2>Sobre Nosotros: Moda con Propósito</h2>
        </div>

        <div className="nosotros-grid">
          <div className="nosotros-info">
            <p>
              En <span>Segundo Estreno</span> creemos que la moda puede ser
              hermosa sin dejar una huella de carbono fea. Nacimos de la pasión
              por el estilo y el compromiso inquebrantable con el planeta.
              Sabemos que querés lucir increíble y sentirte bien con tus
              elecciones, por eso creamos un espacio donde el diseño de
              vanguardia se une a la sustentabilidad.
            </p>

            <h2>Nuestro compromiso</h2>

            <p>
              Cada prenda que encontrás en <span>Segundo Estreno</span> es cuidadosamente
              seleccionada o creada bajo principios de moda ética y sostenible.
              Esto significa que:
            </p>

            <p>
              <FaCheck className="check-icon" />
              Priorizamos materiales eco-amigables: Usamos algodón orgánico,
              lino, tencel, lyocell, y materiales reciclados o upcycled,
              minimizando el impacto ambiental.
            </p>

            <p>
              <FaCheck className="check-icon" />
              Apoyamos la producción justa: Trabajamos con proveedores que
              garantizan condiciones laborales dignas y salarios justos para sus
              empleados. Creemos en el valor del trabajo y en el respeto a cada
              persona involucrada en la cadena de producción.
            </p>

            <p>
              <FaCheck className="check-icon" />
              Promovemos la durabilidad: Diseñamos prendas atemporales y de alta
              calidad, pensadas para durar, resistiendo el paso del tiempo y las
              tendencias pasajeras. Decimos no a la moda descartable.
            </p>

            <p>
              <FaCheck className="check-icon" />
              Reducimos nuestra huella: Desde el empaque hasta la logística,
              buscamos constantemente formas de minimizar nuestro impacto
              ambiental, eligiendo opciones biodegradables, reciclables o
              compostables.
            </p>
          </div>
        </div>
      </div>
      <div className="slider">
        <div className="slider-track">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfybTvsTrbQmw8D4dqch2M9WnWAWmrgp7VvIBuC4MTE1yQDXw/viewform?usp=sharing&ouid=115459216340217954203"
            className="slide"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaBullhorn className="fa-bullhorn" aria-hidden="true" />
            <p>
              SI QUERÉS PUBLICITAR TU MARCA HACÉ CLICK AQUÍ Y COMPLETÁ EL
              FORMULARIO
            </p>
          </a>
        </div>
      </div>
    </main>
  );
};

export default Nosotros;