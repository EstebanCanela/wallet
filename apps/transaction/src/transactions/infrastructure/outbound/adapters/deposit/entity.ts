import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
} from 'typeorm';
import { Balance } from '../balance/entity';

@Entity()
export class Deposit {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Balance, (balance) => balance.deposits)
  balance: Balance;

  @Column({
    type: 'decimal',
    precision: 19,
    scale: 2,
  })
  amount: number;

  @Column()
  terminal: string | null;

  @Column()
  status: string;

  @Column({
    name: 'public_id',
  })
  @Generated('uuid')
  publicId: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
