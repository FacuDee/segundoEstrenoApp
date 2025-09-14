import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Categoria } from '../categoria/categoria.entity';

@Entity('prendas')
export class Prenda {
  @PrimaryGeneratedColumn({ name: 'id_prenda' })
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column({ nullable: true })
  imagen: string;

  @ManyToOne(() => Categoria, categoria => categoria.id)
  categoria: Categoria;
}
