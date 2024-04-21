import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
} from 'typeorm';
import { Deposit } from '../deposit/entity';

@Entity()
export class Balance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cbu: string;

  @Column()
  currency: string;

  @Column({
    name: 'user_id',
  })
  userId: string;

  @Column({
    name: 'public_id',
  })
  @Generated('uuid')
  publicId: string;

  @OneToMany(() => Deposit, (deposit) => deposit.balance)
  deposits: Deposit[];

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
