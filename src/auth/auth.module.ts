import { Module } from '@nestjs/common';
import { AuthAdminModule } from './admin/auth-admin.module';
import { AuthUserModule } from './user/auth-user.module';

@Module({
  imports: [AuthAdminModule, AuthUserModule],
  providers: [],
})
export class AuthModule {}
