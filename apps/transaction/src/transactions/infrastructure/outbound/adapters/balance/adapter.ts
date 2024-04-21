import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Balance } from './entity';
import { BalancePort } from 'src/transactions/application/ports/balance/balance.port';
import * as domain from 'src/transactions/domain/models/balance.model';
import { mapEntityToDomain } from './mapper';

@Injectable()
export class BalanceAdapter implements BalancePort {
  constructor(
    @InjectRepository(Balance)
    private balanceRepository: Repository<Balance>,
  ) {}

  async create(balance: domain.Balance): Promise<void> {
    this.balanceRepository.save(balance);
  }

  async getBalanceBy(options: domain.BalanceOptions): Promise<domain.Balance> {
    const balance = await this.balanceRepository.findOneBy({ ...options });

    if (!balance) {
      return null;
    }

    return mapEntityToDomain(balance);
  }

  async findBalancesByUserId(userId: string): Promise<domain.Balance[]> {
    const balances = await this.balanceRepository.find({ where: { userId } });

    return balances.map((balance) => mapEntityToDomain(balance));
  }
}
