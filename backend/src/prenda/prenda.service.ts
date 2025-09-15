// src/prenda/prenda.service.ts
import { Injectable } from '@nestjs/common';
import { CreatePrendaDto } from './dto/create-prenda.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prenda } from './prenda.entity';

@Injectable()
export class PrendaService {
  constructor(
        @InjectRepository(Prenda)
        private readonly prendaRepository: Repository<Prenda>,
    ) {}

    async findAll(): Promise<Prenda[]> {
        return this.prendaRepository.find();
    }
    async findOne(id: number): Promise<Prenda | null> {
        return this.prendaRepository.findOneBy({ id });
    }
  async create(createPrendaDto: CreatePrendaDto) {
    console.log('Datos recibidos y listos para guardar en la base de datos:', createPrendaDto);
    return { mensaje: 'Prenda subida con éxito!' };
  }

  // Método para actualizar una prenda
  async update(id: string, updatePrendaDto: CreatePrendaDto) {
    console.log(`Actualizando la prenda con ID: ${id}`);
    console.log('Datos a actualizar:', updatePrendaDto);
    return { mensaje: `Prenda con ID ${id} actualizada.` };
  }

  // Método para eliminar una prenda
  async remove(id: string) {
    console.log(`Eliminando la prenda con ID: ${id}`);
    return { mensaje: `Prenda con ID ${id} eliminada.` };
  }
}
