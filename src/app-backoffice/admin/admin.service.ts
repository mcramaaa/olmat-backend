import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { EntityCondition } from 'src/shared/types/entity-condition.type';
import { Admins } from 'src/entities/admins.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NullableType } from 'src/shared/types/nullable.type';
import { ErrorException } from 'src/shared/exceptions/error.exception';
import { AdminRoleService } from '../admin-role/admin-role.service';
import { IPaginationOptions } from 'src/shared/types/pagination-options';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admins)
    private adminsRepository: Repository<Admins>,
    private roleService: AdminRoleService,
  ) {}
  async findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<[Admins[], number]> {
    try {
      return await this.adminsRepository.findAndCount({
        skip: (paginationOptions.page - 1) * paginationOptions.limit,
        take: paginationOptions.limit,
        relations: { role: true },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(condition: EntityCondition<Admins>): Promise<Admins> {
    const admin = await this.adminsRepository.findOne({
      relations: {
        role: true,
      },
      where: condition,
    });
    if (!admin) {
      throw new NotFoundException('Cant find admin');
    }
    return admin;
  }

  async fillterAdminByName(context: string): Promise<NullableType<Admins[]>> {
    try {
      const admin = await this.adminsRepository
        .createQueryBuilder('admin')
        .leftJoinAndSelect('admin.role', 'role')
        .where('admin.name like :name', { name: `%${context}%` })
        .getMany();
      if (!admin) throw new NotFoundException();
      return admin;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async create(data: CreateAdminDto): Promise<Admins> {
    const role = await this.roleService.findOne({ id: data.role_id });
    return await this.adminsRepository.save(
      this.adminsRepository.create({
        ...data,
        role,
      }),
    );
  }

  async update(id: number, payload: UpdateAdminDto): Promise<Admins> {
    const currentUser = await this.findOne({
      id: +id,
    });

    if (!currentUser) {
      throw new ErrorException(
        {
          user: 'userNotFound',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    // if (payload.password)
    //   if (payload.curent_password) {
    //     const isValidCurrentPassword = compare(
    //       payload.curent_password,
    //       currentUser.password,
    //     );
    //     if (!isValidCurrentPassword) {
    //       throw new ErrorException(
    //         {
    //           currentPassword: 'incorrectCurrentPassword',
    //         },
    //         HttpStatus.UNPROCESSABLE_ENTITY,
    //       );
    //     }
    //     if (payload.curent_password === payload.password) {
    //       throw new ErrorException(
    //         {
    //           password: 'password not changed',
    //         },
    //         HttpStatus.UNPROCESSABLE_ENTITY,
    //       );
    //     }
    //   } else {
    //     throw new ErrorException(
    //       {
    //         currentPassword: 'missingCurrentPassword',
    //       },
    //       HttpStatus.UNPROCESSABLE_ENTITY,
    //     );
    //   }

    if (payload.role_id) {
      const curentRole = await this.roleService.findOne({
        id: payload.role_id,
      });

      if (!curentRole) {
        throw new ErrorException(
          {
            role: 'role not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
    }

    if (payload.email) {
      if (!payload.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        throw new ErrorException(
          {
            email: 'email format is not valid',
          },
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
    }

    return await this.adminsRepository.save(
      this.adminsRepository.create({ id, ...payload }),
    );
  }

  async delete(id: number): Promise<void> {
    try {
      await this.adminsRepository.delete(id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
