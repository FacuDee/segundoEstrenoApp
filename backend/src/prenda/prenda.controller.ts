import { Controller, Get, Post, Body, Put, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { PrendaService } from './prenda.service';
import { Prenda } from './prenda.entity';
import { CreatePrendaDto } from './dto/create-prenda.dto';

@Controller('prenda')
export class PrendaController {
  constructor(private readonly prendaService: PrendaService) {}
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
  
//crear una prenda
  @Post()
  async create(@Body() createPrendaDto: CreatePrendaDto) {
    return this.prendaService.create(createPrendaDto);
  }
  
// actulizar una prenda
  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePrendaDto: CreatePrendaDto) {
    return this.prendaService.update(id, updatePrendaDto);
  }
  
// borrar una prenda
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.prendaService.remove(id);
  }
}