import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { CacheService } from 'src/core/cache/cache.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UserService, CacheService],
  exports: [UserService],
})
export class UserModule {}
