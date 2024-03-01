import { Module } from '@nestjs/common';
import { UserSeedService } from './user-seed.service';

@Module({
  providers: [UserSeedService],
})
export class UserSeedModule {}
