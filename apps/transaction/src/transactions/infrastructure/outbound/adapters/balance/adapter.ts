import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Balance } from './entity';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(Balance)
    private balanceRepository: Repository<Balance>,
  ) {}

  findAll(): Promise<Balance[]> {
    return this.balanceRepository.find();
  }

  findOne(id: number): Promise<Balance | null> {
    return this.balanceRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.balanceRepository.delete(id);
  }
}
