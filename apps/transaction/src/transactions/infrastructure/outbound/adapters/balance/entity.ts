import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Deposit } from '../deposit/entity';

@Entity()
export class Balance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cbu: string;

  @Column()
  currency: string;

  @Column()
  publicId: string;

  //   @OneToMany(() => Deposit, (deposit) => deposit.balance)
  //   deposits: Deposit[];
}
