import { Provider } from '@nestjs/common';
import { EmailOtpListener } from './email-otp.listener';

export const AuthListener: Provider[] = [EmailOtpListener];
