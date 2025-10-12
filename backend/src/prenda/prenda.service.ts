// src/prenda/prenda.service.ts
import { Injectable } from '@nestjs/common';
import { CreatePrendaDto } from './dto/create-prenda.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prenda } from './prenda.entity';
import { Usuario } from 'src/usuario/usuario.entity';
import { Categoria } from 'src/categoria/categoria.entity';

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
    // Asume que categoria y vendedor vienen como ID en el DTO
    const prenda = this.prendaRepository.create({
      titulo: createPrendaDto.titulo,
      descripcion: createPrendaDto.descripcion,
      talle: createPrendaDto.talle,
      precio: createPrendaDto.precio,
      imagen_url: createPrendaDto.imagen_url,
      disponible: createPrendaDto.disponible ?? true,
      categoria: { id: createPrendaDto.categoria },
      vendedor: { id: createPrendaDto.vendedor },
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
    prenda.titulo = updatePrendaDto.titulo;
    prenda.descripcion = updatePrendaDto.descripcion;
    prenda.talle = updatePrendaDto.talle;
    prenda.precio = updatePrendaDto.precio;
    prenda.disponible = updatePrendaDto.disponible ?? true;

      if (updatePrendaDto.categoria) {
    prenda.categoria = { id: updatePrendaDto.categoria } as Categoria;
  }
  if (updatePrendaDto.vendedor) {
    prenda.vendedor = { id: updatePrendaDto.vendedor } as Usuario;
  }

  // Guardar usando save() en lugar de update()
  return await this.prendaRepository.save(prenda);
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
