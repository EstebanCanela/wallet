import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Balance } from '../balance/entity';

@Entity()
export class Deposit {
  @PrimaryGeneratedColumn()
  id: number;

  //   @ManyToOne(() => Balance, (balance) => balance.deposits)
  //   balance: Balance;

  @Column()
  amount: number;

  @Column()
  publicId: string;
}
