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
  return this.prendaRepository.find({ relations: ['categoria'] });
  }
  async findOne(id: number): Promise<Prenda | null> {
    return this.prendaRepository.findOneBy({ id });
  }
  async create(createPrendaDto: CreatePrendaDto) {
    // Asume que categoria viene como ID en el DTO
    const prenda = this.prendaRepository.create({
      titulo: createPrendaDto.titulo,
      descripcion: createPrendaDto.descripcion,
      precio: createPrendaDto.precio,
      imagen_url: createPrendaDto.imagen_url,
      disponible: true, // o usa createPrendaDto.disponible si lo agregas al DTO
      categoria: { id: createPrendaDto.categoria },
      // vendedor: { id: createPrendaDto.vendedor }, // si tienes relación con vendedor
    });
    return await this.prendaRepository.save(prenda);
  }

  // Método para actualizar una prenda
  async update(id: string, updatePrendaDto: CreatePrendaDto) {
    const prendaId = Number(id);
    const prenda = await this.prendaRepository.findOne({ where: { id: prendaId } });
    if (!prenda) {
      throw new Error(`Prenda con ID ${id} no encontrada.`);
    }
    await this.prendaRepository.update(prendaId, {
      titulo: updatePrendaDto.titulo,
      descripcion: updatePrendaDto.descripcion,
      precio: updatePrendaDto.precio,
      imagen_url: updatePrendaDto.imagen_url,
      disponible: updatePrendaDto.disponible ?? true,
      categoria: { id: updatePrendaDto.categoria },
      // vendedor: { id: updatePrendaDto.vendedor },
    });
    return await this.prendaRepository.findOne({ where: { id: prendaId }, relations: ['categoria'] });
  }

  // Método para eliminar una prenda
  async remove(id: string) {
    const prendaId = Number(id);
    const result = await this.prendaRepository.delete(prendaId);
    if (result.affected && result.affected > 0) {
      return { mensaje: `Prenda con ID ${id} eliminada.` };
    } else {
      return { mensaje: `Prenda con ID ${id} no encontrada o ya eliminada.` };
    }
  }
}
