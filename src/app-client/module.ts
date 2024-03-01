import { AuthUserModule } from 'src/auth/user/auth-user.module';
import { UserModule } from './user/user.module';
import { SchoolModule } from './school/school.module';
import { LocationApiModule } from './location-api/location-api.module';
import { ParticipantModule } from './participant/participant.module';

export const UserCLientModules = [
  UserModule,
  AuthUserModule,
  LocationApiModule,
  SchoolModule,
  ParticipantModule,
];
