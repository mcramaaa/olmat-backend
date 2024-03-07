import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentGateways } from 'src/entities/payment-gateways.entity';
import { EntityCondition } from 'src/shared/types/entity-condition.type';
import { NullableType } from 'src/shared/types/nullable.type';
import { IPaginationOptions } from 'src/shared/types/pagination-options';
import { Not, Repository } from 'typeorm';
import { CreatePaymentGatewayDto } from './dto/create-payment-gateway.dto';
import { UpdatePaymentGatewayDto } from './dto/update-payment-gateway.dto';
import { unlink } from 'fs';

@Injectable()
export class PaymentGatewayService {
  constructor(
    @InjectRepository(PaymentGateways)
    private paymentGatewayRepository: Repository<PaymentGateways>,
  ) {}

  async create(
    payload: CreatePaymentGatewayDto,
    logo: string | undefined,
  ): Promise<void> {
    if (!logo) throw new BadRequestException('Need minimum 1 image');
    const isExist = await this.paymentGatewayRepository.exist({
      where: {
        group: payload.group,
        code: payload.code,
      },
    });

    if (isExist) {
      throw new ConflictException('Already exist for code and group');
    }

    await this.paymentGatewayRepository.save(
      this.paymentGatewayRepository.create({
        ...payload,
        logo,
        is_active: true,
      }),
    );
  }

  async findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<[PaymentGateways[], number]> {
    try {
      return await this.paymentGatewayRepository.findAndCount({
        skip: (paginationOptions.page - 1) * paginationOptions.limit,
        take: paginationOptions.limit,
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(
    condition: EntityCondition<PaymentGateways>,
  ): Promise<NullableType<PaymentGateways>> {
    return await this.paymentGatewayRepository.findOne({ where: condition });
  }

  async update(
    id: number,
    payload: UpdatePaymentGatewayDto,
    img: string | undefined,
  ): Promise<void> {
    const isExist = await this.paymentGatewayRepository.exist({
      where: {
        id: Not(id),
        group: payload.group,
        code: payload.code,
      },
    });
    if (isExist) {
      throw new ConflictException('Already exist for code and group');
    }
    const paymentGateway = await this.findOne({ id });
    const oldLogo = paymentGateway.logo;
    if (!paymentGateway) throw new BadRequestException();

    delete payload.img;

    Object.assign(paymentGateway, {
      ...payload,
      logo: img ? img : oldLogo,
    });
    await paymentGateway.save();
    if (img != undefined)
      await unlink('./storage/payment-logo/' + oldLogo, (err) => {
        if (err) throw err;
      });
  }

  async delete(id: number): Promise<void> {
    const { logo } = await this.findOne({ id: id });
    await this.paymentGatewayRepository.delete({ id });
    if (logo) {
      await unlink('./storage/payment-logo/' + logo, (err) => {
        if (err) throw err;
      });
    }
  }
}
