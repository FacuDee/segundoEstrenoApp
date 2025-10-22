# Backend - NestJS

Este directorio contiene el backend de Segundo Estreno, desarrollado con NestJS y TypeORM.

## Estructura principal

```
backend/
  src/
    auth/         # Autenticación y autorización (JWT, roles)
    carrito/      # Lógica y entidades del carrito de compras
    categoria/    # Gestión de categorías de productos
    prenda/       # Gestión de prendas (productos)
    transaccion/  # Lógica de transacciones
    usuario/      # Gestión de usuarios
    app.module.ts # Módulo raíz
    main.ts       # Entry point
  test/           # Pruebas e2e
  .env            # Variables de entorno (no versionar)
  package.json    # Dependencias y scripts
  tsconfig*.json  # Configuración TypeScript
```

## Cómo ejecutar el backend

1. Instalar dependencias:
   ```bash
   cd backend
   npm install
   ```
2. Configurar variables de entorno:
   - Copiar `.env.example` a `.env` y completar los datos de conexión a la base de datos.
3. Ejecutar en modo desarrollo:
   ```bash
   npm run start:dev
   ```

## Tecnologías principales

- NestJS
- TypeORM
- JWT (autenticación)
- MySQL

## Endpoints principales

- `/auth` - Registro, login, JWT
- `/usuario` - Gestión de usuarios
- `/prenda` - Gestión de productos
- `/carrito` - Carrito de compras
- `/categoria` - Categorías
- `/transaccion` - Transacciones

## Pruebas

- Ejecutar pruebas e2e:
  ```bash
  npm run test:e2e
  ```

## Notas

- El backend está preparado para integrarse con el frontend React (`frontend-2`).
- Las variables de entorno permiten cambiar fácilmente la configuración de la base de datos.
- Consultar el README principal para más detalles del proyecto.