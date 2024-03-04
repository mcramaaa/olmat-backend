import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Participants } from 'src/entities/participants.entity';
import { EntityCondition } from 'src/shared/types/entity-condition.type';
import { NullableType } from 'src/shared/types/nullable.type';
import { IPaginationOptions } from 'src/shared/types/pagination-options';
import { DataSource, Repository } from 'typeorm';
import { CreateParticipantDTO } from './dto/create-participant.dto';
import { SchoolService } from '../school/school.service';
import { Payments } from 'src/entities/payments.entity';
import { Users } from 'src/entities/users.entity';
import { rtrim0 } from 'src/shared/utils/rtrim.helper';
import { CashbackSettingService } from 'src/core/cashback-setting/cashback-setting.service';
import { Degree } from 'src/entities/degree.entity';
import { unlink } from 'fs';
import { ErrorException } from 'src/shared/exceptions/error.exception';
import { ulid } from 'ulid';

@Injectable()
export class ParticipantService {
  constructor(
    @InjectRepository(Participants)
    private repository: Repository<Participants>,
    private datasource: DataSource,
    private schoolService: SchoolService,
    private cashbackSettingService: CashbackSettingService,
  ) {}

  async findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<[Participants[], number]> {
    try {
      return await this.repository.findAndCount({
        skip: (paginationOptions.page - 1) * paginationOptions.limit,
        take: paginationOptions.limit,
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(
    condition: EntityCondition<Participants>,
  ): Promise<NullableType<Participants>> {
    return await this.repository.findOne({ where: condition });
  }

  private async getPrice(length: number, degree: Degree) {
    const cashbackSetting = await this.cashbackSettingService.find();
    const cashback =
      Math.floor(length / +cashbackSetting.amount) * cashbackSetting.free;
    let price = degree.register_price * length;
    if (length % cashbackSetting.amount >= cashback) {
      price = price - degree.register_price * cashback;
    } else if (length % cashbackSetting.amount < cashback) {
      price = price - degree.register_price * (length % cashbackSetting.amount);
    }
    return price;
  }

  async create(
    payload: CreateParticipantDTO,
    user: Users,
    imgs: string[],
    attachments: string[],
  ) {
    const school = await this.schoolService.findOne({
      id: payload.school_id ? payload.school_id : user.school.id,
    });
    if (!school) throw new BadRequestException();

    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const paymentCount = await queryRunner.manager.count(Payments, {
        lock: { mode: 'pessimistic_write' },
      });
      const participantCount = await queryRunner.manager.count(Payments, {
        lock: { mode: 'pessimistic_write' },
      });
      const payment = await queryRunner.manager.save(
        queryRunner.manager.create(Payments, {
          invoice: ulid() + paymentCount,
          code: payload.payment_code,
          participant_amounts: payload.participants.length,
          action: {
            id: 'qr_51026ab3-7c75-4624-86f6-0a6173ac1b10',
            type: 'DYNAMIC',
            qr_string:
              '00020101021226570011ID.DANA.WWW011893600915043047346302094304734630303UKE51440014ID.CO.QRIS.WWW0215ID20232587129750303UKE5204899953033605405844695802ID5911Magner Care6013Kota Surabaya61056018762720115e8kGDd1pJDVLEo360490011ID.DANA.WWW0425MER202107140077450960864105011630405D7',
            channel_code: 'ID_DANA',
          },
          amount: await this.getPrice(
            typeof payload.participants === 'string'
              ? 1
              : payload.participants.length,
            school.degree,
          ),
          user,
        }),
      );

      const participants = [];

      if (typeof payload.participants === 'string') {
        const objParticipant: Participants = JSON.parse(payload.participants);
        const res = await queryRunner.manager.save(
          queryRunner.manager.create(Participants, {
            id:
              school.city.region.id +
              school.degree.id +
              rtrim0('0000', String(+participantCount + 1)),
            name: objParticipant.name,
            gender: objParticipant.gender,
            phone: objParticipant.phone,
            email: objParticipant.email,
            birth: objParticipant.birth,
            img: imgs[0],
            attachment: attachments[0],
            school,
            payment,
          }),
        );
        const propertiesToDelete = [
          'payment',
          'school',
          'status',
          'id',
          'phone',
        ];

        propertiesToDelete.forEach((property) => {
          if (res.hasOwnProperty(property)) {
            delete res[property];
          }
        });
        participants.push(res);
      } else {
        participants.push(
          ...(await Promise.all(
            payload.participants.map(async (participant, i) => {
              const objParticipant: Participants = JSON.parse(participant);
              const res = await queryRunner.manager.save(
                queryRunner.manager.create(Participants, {
                  id:
                    school.city.region.id +
                    school.degree.id +
                    rtrim0('0000', String(+participantCount + i)),
                  name: objParticipant.name,
                  gender: objParticipant.gender,
                  phone: objParticipant.phone,
                  email: objParticipant.email,
                  birth: objParticipant.birth,
                  img: imgs[i],
                  attachment: attachments[i],
                  school,
                  payment,
                }),
              );
              const propertiesToDelete = [
                'payment',
                'school',
                'status',
                'id',
                'phone',
              ];

              propertiesToDelete.forEach((property) => {
                if (res.hasOwnProperty(property)) {
                  delete res[property];
                }
              });
              return res;
            }),
          )),
        );
      }

      await queryRunner.commitTransaction();
      delete payment.user;
      return {
        payment,
        participants,
      };
    } catch (error: any) {
      imgs.map(async (img) => {
        await unlink('./storage/imgs/' + img, (err) => {
          if (err) throw err;
        });
      });
      attachments.map(async (attachment) => {
        await unlink('./storage/attachments/' + attachment, (err) => {
          if (err) throw err;
        });
      });
      let extractedString: string | undefined;
      if (error.code === 'ER_DUP_ENTRY') {
        const regex = /'([^']+)'/;
        const match = error.sqlMessage.match(regex);
        if (match && match.length > 1) {
          extractedString = match[1];
        }
        throw new ErrorException(
          {
            message: `Phone ${extractedString} is already to use!`,
          },
          509,
        );
      }
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }
}
