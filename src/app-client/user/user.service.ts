import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityCondition } from 'src/shared/types/entity-condition.type';
import { Users } from 'src/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { ErrorException } from 'src/shared/exceptions/error.exception';
import { compare } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async findOne(condition: EntityCondition<Users>) {
    return await this.userRepository.findOne({
      where: condition,
      relations: { school: { degree: true } },
    });
  }

  async update(id: string, payload: UpdateUserDto): Promise<Users> {
    const user = await this.findOne({ id });
    if (!user) {
      throw new BadRequestException();
    }

    if (payload.phone) {
      const isUserExist = await this.userRepository.exists({
        where: { phone: payload.phone },
      });
      if (isUserExist)
        throw new BadRequestException('phone number already exist');
      user.phone = payload.phone;
    }

    if (payload.email) {
      const isUserExist = await this.userRepository.exists({
        where: { email: payload.email },
      });
      if (isUserExist) throw new BadRequestException('email already exist');
      user.email = payload.email;
    }

    if (payload.name) {
      user.name = payload.name;
    }

    if (payload.password) {
      if (payload.currentPassword) {
        const isValidCurrentPassword = compare(
          payload.currentPassword,
          user.password,
        );

        if (!isValidCurrentPassword) {
          throw new ErrorException(
            {
              currentPassword: 'incorrectCurrentPassword',
            },
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
        if (payload.password == payload.currentPassword) {
          throw new ErrorException(
            {
              password: 'password not changed',
            },
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
        // const strongPasswordPattern =
        //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}[\]|\\;:'",.<>/?]).{8,}$/;
        // if (!strongPasswordPattern.test(payload.password)) {
        //   throw new ErrorException(
        //     {
        //       password:
        //         'Minimal 6 character, 1 Upercase, 1 lowercase, 1 special character',
        //     },
        //     HttpStatus.UNPROCESSABLE_ENTITY,
        //   );
        // }

        if (payload.password.length < 8) {
          throw new ErrorException(
            {
              password: 'Minimal 8 character',
            },
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
      } else {
        throw new ErrorException(
          {
            currentPassword: 'missingCurrentPassword',
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      user.password = payload.password;
    }

    try {
      return await user.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
