import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admins } from 'src/entities/admins.entity';
import { AdminRoleModule } from '../admin-role/admin-role.module';

@Module({
  imports: [TypeOrmModule.forFeature([Admins]), AdminRoleModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
