import { Module } from '@nestjs/common';
import { PrendaService } from './prenda.service';
import { PrendaController } from './prenda.controller';

@Module({
  providers: [PrendaService],
  controllers: [PrendaController]
})
export class PrendaModule {}
