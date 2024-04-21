import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity()
export class Transfer {
  @ObjectIdColumn()
  id: string;

  @Column()
  transferDate: Date;

  @Column()
  amount: number;

  @Column({
    length: 3,
  })
  currency: string;

  @Column({
    length: 20,
  })
  description: string;

  @Column()
  sourceCbu: string;

  @Column()
  destinationCbu: string;

  @Column()
  sourceBalanceId: string;

  @Column()
  destinationBalanceId: string;

  @Column()
  sourceClientId: string;

  @Column()
  destinationClientId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
