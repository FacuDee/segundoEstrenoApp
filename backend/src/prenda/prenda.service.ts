import { Injectable } from '@nestjs/common';
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
}
