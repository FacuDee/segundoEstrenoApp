import { Module } from '@nestjs/common';
import { TransaccionService } from './transaccion.service';
import { TransaccionController } from './transaccion.controller';

@Module({
  providers: [TransaccionService],
  controllers: [TransaccionController]
})
export class TransaccionModule {}
