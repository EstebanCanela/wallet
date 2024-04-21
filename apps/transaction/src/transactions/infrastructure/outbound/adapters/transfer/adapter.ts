import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransferPort } from 'src/transactions/application/ports/transfer/transfer.port';
import { Transfer } from './entity';
import * as domain from 'src/transactions/domain/models/transfer.model';
import { mapEntityToDomain } from './mapper';

@Injectable()
export class TransferAdapter implements TransferPort {
  constructor(
    @InjectRepository(Transfer, 'transferConnection')
    private transferRepository: Repository<Transfer>,
  ) {}

  async create(input: domain.Transfer): Promise<domain.Transfer> {
    const transferCreated = await this.transferRepository.save(input);
    return mapEntityToDomain(transferCreated);
  }
}
