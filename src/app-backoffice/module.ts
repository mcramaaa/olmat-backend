import { AuthAdminModule } from 'src/auth/admin/auth-admin.module';
import { AdminModule } from './admin/admin.module';
import { AdminRoleModule } from './admin-role/admin-role.module';

export const BackofficeModules = [
  AuthAdminModule,
  AdminModule,
  AdminRoleModule,
];
