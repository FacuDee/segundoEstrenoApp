# Frontend-2 - React + TypeScript

Este directorio contiene el frontend principal de Segundo Estreno, desarrollado con React, TypeScript y Vite.

## Estructura principal

```
frontend-2/
  src/
    components/   # Componentes reutilizables (carouseles, banners, encuestas, header, footer, etc)
    pages/         # Páginas principales (Home, Blog, MiCuenta, Nosotros, ProductDetail)
    context/       # Contextos globales (ej: carrito)
    assets/        # Imágenes y recursos estáticos
    App.tsx        # Ruteo principal
    main.tsx       # Entry point
  public/          # Archivos estáticos
  package.json     # Dependencias y scripts
```

## Principales features implementadas

- **HeroCarousel:** Carrusel animado en Home con imágenes y mensajes.
- **Encuesta interactiva:** Encuesta en Blog con resultados visuales y persistencia local.
- **Carrito de compras:** Context global, modal, y página de carrito.
- **Navegación SPA:** React Router para navegación fluida entre páginas.
- **Componentes reutilizables:** Banner, FeaturedProducts, Footer, Header, etc.
- **Diseño responsive:** Adaptado a mobile y desktop.
- **Animaciones y feedback visual:** SweetAlert2, transiciones CSS, iconografía.

## Tecnologías y librerías clave

- React 19 + TypeScript
- Vite
- React Router DOM
- React Icons
- SweetAlert2
- Context API

## Cómo ejecutar el frontend

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Iniciar en modo desarrollo:
   ```bash
   npm run dev
   ```
3. Acceder a `http://localhost:5173` (o el puerto que indique Vite)

Para build de producción:

```bash
npm run build
```

## Notas

- El frontend está preparado para consumir los endpoints del backend NestJS.
- El diseño es completamente responsive y pensado para usabilidad mobile y desktop.
- Consultar el README principal para visión general y estructura del proyecto.
