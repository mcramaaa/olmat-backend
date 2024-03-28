import { Module } from '@nestjs/common';
import { AuthAdminModule } from './admin/auth-admin.module';
import { AuthUserModule } from './user/auth-user.module';
import { AuthListener } from './listeners';

@Module({
  imports: [AuthAdminModule, AuthUserModule],
  providers: [...AuthListener],
})
export class AuthModule {}
