import { Controller,Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common'; 
import { get } from 'http';
import { PrendaService } from './prenda.service';
import { Prenda } from './prenda.entity';


@Controller('prenda')
export class PrendaController {
    constructor(private readonly prendaService: PrendaService) { }
    @Get()
    async findAll(): Promise<Prenda[]> {
        try {
            return await this.prendaService.findAll();
        } catch (error) {
            throw new HttpException(
                'Error retrieving prendas',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    @Get(':id')
    async findOne(id:number): Promise<Prenda | null> {
        try {
            return await this.prendaService.findOne(id);
        }catch(error){
        throw new HttpException(
                'Prenda not found',
                HttpStatus.NOT_FOUND
        );
        }
    }
};
