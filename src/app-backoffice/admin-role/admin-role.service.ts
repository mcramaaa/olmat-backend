import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateAdminRoleDto } from './dto/create-admin-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { AdminRole } from 'src/entities/admin-role.entity';
import { EntityCondition } from 'src/shared/types/entity-condition.type';
import { IPaginationOptions } from 'src/shared/types/pagination-options';

@Injectable()
export class AdminRoleService {
  constructor(
    @InjectRepository(AdminRole)
    private adminRoleRepository: Repository<AdminRole>,
  ) {}

  async findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<[AdminRole[], number]> {
    try {
      return await this.adminRoleRepository.findAndCount({
        skip: (paginationOptions.page - 1) * paginationOptions.limit,
        take: paginationOptions.limit,
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(condition: EntityCondition<AdminRole>) {
    return await this.adminRoleRepository.findOne({ where: condition });
  }

  async create(data: CreateAdminRoleDto): Promise<AdminRole> {
    try {
      return await this.adminRoleRepository.save(
        this.adminRoleRepository.create(data),
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(data: DeepPartial<AdminRole>, id: number): Promise<AdminRole> {
    const role = await this.findOne({
      id,
    });

    if (!role) throw new BadRequestException();

    role.name = data.name ?? role.name;
    role.permissions = data.permissions ?? role.permissions;
    return await role.save();
  }

  async remove(id: number): Promise<void> {
    const role = await this.findOne({
      id,
    });
    if (!role) throw new BadRequestException();
    await role?.remove();
  }
}
