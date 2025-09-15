import { Controller, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { PrendaService } from './prenda.service';
import { CreatePrendaDto } from './dto/create-prenda.dto';

@Controller('prenda')
export class PrendaController {
  constructor(private readonly prendaService: PrendaService) {}
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

  @Delete(':id')
async remove(@Param('id') id: string) {
  return this.prendaService.remove(id);
}
}