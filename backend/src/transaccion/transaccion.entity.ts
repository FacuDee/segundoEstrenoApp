import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';

@Entity('transacciones')
export class Transaccion {
  @PrimaryGeneratedColumn({ name: 'id_transaccion' })
  id: number;

  @ManyToOne(() => Usuario, usuario => usuario.id)
  usuario: Usuario;

  @Column('decimal', { precision: 10, scale: 2 })
  monto: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;
}
