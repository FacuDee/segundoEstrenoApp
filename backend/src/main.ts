import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Servir archivos estáticos del frontend build (ajustar la ruta si es necesario)
  app.useStaticAssets(join(__dirname, '..', '..', 'frontend-2', 'public'));

  // Fallback: para cualquier ruta que no sea API, servir index.html
    app.use((req, res, next) => {
      if (
        req.url.startsWith('/api') ||
        req.url.startsWith('/auth') ||
        req.url === '/prendas' ||
        req.url.startsWith('/prendas/') ||
        req.url === '/carrito' ||
        req.url.startsWith('/carrito/')
      ) {
        return next();
      }
      res.sendFile(join(__dirname, '..', '..', 'frontend-2', 'public', 'index.html'));
    });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
