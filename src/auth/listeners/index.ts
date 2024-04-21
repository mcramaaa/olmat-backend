import { Provider } from '@nestjs/common';
import { EmailOtpListener } from './email-otp.listener';
import { EmailForgotPasswordListener } from './email-forgot-password.listener';

export const AuthListener: Provider[] = [
  EmailOtpListener,
  EmailForgotPasswordListener,
];
