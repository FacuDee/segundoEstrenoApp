import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreatePrendaDto {
  @IsString()
  @IsOptional()
  nombre: string;

  @IsNumber()
  @IsOptional()
  precio: number;

  @IsString()
  @IsOptional()
  descripcion: string;

  @IsString()
  @IsOptional()
  color: string;
}