import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deposit } from './entity';
import { DepositPort } from 'src/transactions/application/ports/deposit/deposit.port';
import * as domain from 'src/transactions/domain/models/deposit.model';
import { mapDomainToEntity } from './mapper';
import { Balance } from '../balance/entity';

@Injectable()
export class DepositAdapter implements DepositPort {
  constructor(
    @InjectRepository(Deposit)
    private depositRepository: Repository<Deposit>,
    @InjectRepository(Balance)
    private balanceRepository: Repository<Balance>,
  ) {}

  async create(input: Partial<domain.Deposit>): Promise<void> {
    const balance = await this.balanceRepository.findOne({
      where: {
        id: input.balanceId,
      },
    });
    this.depositRepository.save({
      ...mapDomainToEntity(input as domain.Deposit),
      balance,
    });
  }
}
