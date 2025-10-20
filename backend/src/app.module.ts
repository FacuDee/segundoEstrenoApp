import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { PrendaModule } from './prenda/prenda.module';
import { CategoriaModule } from './categoria/categoria.module';
import { CarritoModule } from './carrito/carrito.module';
import { TransaccionModule } from './transaccion/transaccion.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import 'dotenv/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME ,
      password: process.env.DB_PASSWORD ,
      database: process.env.DB_DATABASE ,
      autoLoadEntities: true,
      synchronize: false,
      charset: 'utf8mb4_unicode_ci',
      logging: true,
    }),
    UsuarioModule,
    PrendaModule,
    CategoriaModule,
    CarritoModule,
    TransaccionModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
