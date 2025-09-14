import { Controller, Get, Post, Body, Param ,Put, Delete} from '@nestjs/common';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get('test-db')
  async testDb(): Promise<string> {
    try {
      await this.usuarioService.findAll();
      return 'Conexión exitosa con la base de datos';
    } catch (error) {
      return 'Error de conexión: ' + error.message;
    }
  }

  @Get()
  async getAll() {
    return await this.usuarioService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.usuarioService.findOne(id);
  }

  @Post()
  async create(@Body() usuarioData: any) {
    return await this.usuarioService.create(usuarioData);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() usuarioData: any) {
    return await this.usuarioService.update(id, usuarioData);
  }

  
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.usuarioService.remove(id);
  }
}