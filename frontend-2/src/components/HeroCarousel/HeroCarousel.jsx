import { useState, useEffect } from 'react';
import './HeroCarousel.css';

// Importar las imágenes
import imagen1 from '../../assets/carousel/imagen_3.webp';
import imagen2 from '../../assets/carousel/fondoCelu.jpg';
import imagen3 from '../../assets/carousel/imagen_1.webp';

const HeroCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const slides = [
        {
            image: imagen1,
            title: 'Descubrí la Moda Circular',
            description: 'Prendas únicas con una nueva historia'
        },
        {
            image: imagen2,
            title: 'Vendé lo que ya no usás',
            description: 'Dale una segunda vida a tu ropa'
        },
        {
            image: imagen3,
            title: 'Estilo consciente y sustentable',
            description: 'Moda que cuida el planeta y tu bolsillo'
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <section className="carousel-container">
            <div className="carousel">
                <div
                    className="carousel-inner"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className="carousel-item"
                        >
                            <img src={slide.image} alt={slide.title} />
                            <div className="carousel-caption">
                                <h3>{slide.title}</h3>
                                <p>{slide.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    className="carousel-control prev"
                    onClick={prevSlide}
                    aria-label="Anterior"
                >
                    &#10094;
                </button>
                <button
                    className="carousel-control next"
                    onClick={nextSlide}
                    aria-label="Siguiente"
                >
                    &#10095;
                </button>
                <div className="carousel-dots">
                    {slides.map((_, index) => (
                        <span
                            key={index}
                            className={`dot ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroCarousel;