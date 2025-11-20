// src/data/PostData.js
import imagenFeria from '../assets/flyer/imagen_feria.jpg';
import imagenFeria2 from '../assets/flyer/Feria-centro.png';

export const blogPosts = [
  {
    id: 1,
    type: 'taller',
    title: 'Taller de Costura Circular',
    description: 'Aprendé a transformar prendas usadas en piezas únicas. Taller gratuito con inscripción previa.',
    image: 'https://pqs.pe/wp-content/uploads/2015/08/pqs-taller-confecciones.jpg',
    imageAlt: 'Taller de costura',
    link: 'https://docs.google.com/forms/d/e/1FAIpQLScP6sYGI0Dvpm8cHZyiJ7lK_2Ch_V6_CmB0hDAUOhBLGzN0Hw/viewform?usp=dialog',
    linkText: 'Inscribite al Taller',
    tag: 'Taller'
  },
  {
    id: 2,
    type: 'video',
    title: 'En la Moda',
    description: 'Una segunda vida a tu ropa. Descubrí cómo la moda circular transforma la industria textil. Una nueva chance a lo que ya tenés.',
    videoSrc: 'https://www.youtube.com/embed/mvGgdmUkIsQ?start=21',
    videoTitle: 'Economía Circular en la Moda',
    tag: 'Video'
  },
  {
    id: 3,
    type: 'video',
    title: 'La moda circular en acción',
    description: 'Este video muestra proyectos reales de moda sustentable y cómo impactan positivamente en el planeta.',
    videoSrc: 'https://www.youtube.com/embed/RpkcmtvaEtQ',
    videoTitle: '¿Cómo reciclar los 8 millones de toneladas de residuos textiles que se producen cada año en la UE?',
    tag: 'Video'
  },
  {
    id: 4,
    type: 'video',
    title: 'La moda circular explicada',
    description: 'Un video inspirador que muestra cómo reutilizar ropa puede ser tendencia y salvar el planeta.',
    videoSrc: 'https://www.youtube.com/embed/Vlv4FWZA18w',
    videoTitle: 'Larga vida a la ropa: reciclaje textil',
    tag: 'Video'
  },
{
  id: 5,
  type: 'feria',
  title: 'Feria de Intercambio',
  description: 'Acá te dejamos info de las ferias semanales y mensuales. Traé tus prendas para vender o intercambiar. ¡Moda sin residuos!',
  image: 'https://elresaltador.com.ar/wp-content/uploads/2022/09/feria-de-moda-circular.jpg',
  imageAlt: 'Feria de moda circular',
  tag: 'Feria',
  ferias: [
 {
    nombre: 'Feria Semanal del Parque',
    frecuencia: 'Todos los martes del mes',
    horario: '14:00 - 20:00',
    ubicacion: 'Parque Helios Eseverri',
    descripcion: 'Intercambio y venta de prendas',
    mapaUrl: 'https://www.google.com/maps/search/Parque+Eseverri+Olavarría',
    flyerUrl: imagenFeria // 
  },
    {
      nombre: 'Gran Feria Mensual De Centro',
      frecuencia: 'Primer sábado de cada mes',
      horario: '10:00 - 18:00',
      ubicacion: 'Plaza Central',
      descripcion: 'Feria grande con talleres y actividades',
      mapaUrl: 'https://www.google.com/maps/search/Plaza+Central+Olavarría',
      flyerUrl: imagenFeria2
    }
  ]
},
  {
    id: 6,
    type: 'noticia',
    title: 'En los Medios',
    description: 'Esta nota de Ámbito Financiero explica cómo el reciclaje de prendas y el intercambio responsable están transformando la industria textil.',
    image: 'https://d1whqwkn09gz4t.cloudfront.net/images/prensa/ambito-2024-03.webp',
    imageAlt: 'Moda circular: la tendencia que cambió el paradigma en el consumo de indumentaria.',
    link: 'https://www.ambito.com/negocios/la-moda-circular-cambio-el-paradigma-el-consumo-indumentaria-n5969584',
    linkText: 'Leer artículo completo',
    tag: 'Noticia'
  }
];