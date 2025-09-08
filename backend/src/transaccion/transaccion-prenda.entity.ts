import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Transaccion } from '../transaccion/transaccion.entity';
import { Prenda } from '../prenda/prenda.entity';

@Entity('transaccion_prenda')
export class TransaccionPrenda {
  @PrimaryGeneratedColumn({ name: 'id_transaccion_prenda' })
  id: number;

  @ManyToOne(() => Transaccion, transaccion => transaccion.id)
  transaccion: Transaccion;

  @ManyToOne(() => Prenda, prenda => prenda.id)
  prenda: Prenda;

  @Column()
  cantidad: number;
}
