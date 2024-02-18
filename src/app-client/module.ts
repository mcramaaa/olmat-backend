import { AuthUserModule } from 'src/auth/user/auth-user.module';
import { UserModule } from './user/user.module';

export const UserCLientModules = [UserModule, AuthUserModule];
