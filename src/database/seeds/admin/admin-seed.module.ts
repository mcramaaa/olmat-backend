import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminSeedService } from './admin-seed.service';
import { AdminRoleModule } from 'src/app-backoffice/admin-role/admin-role.module';
import { Admins } from 'src/entities/admins.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admins]), AdminRoleModule],
  providers: [AdminSeedService],
  exports: [AdminSeedService],
})
export class AdminSeedModule {}
