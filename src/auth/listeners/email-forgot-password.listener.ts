import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AUTH_EVENT } from 'src/shared/enums/auth-event.enum';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailForgotPasswordEvent } from '../events';

@Injectable()
export class EmailForgotPasswordListener {
  constructor(private readonly mailerService: MailerService) {}

  @OnEvent(AUTH_EVENT.AUTH_RESET_PASSWORD)
  async handleEmailOtpEvent(event: EmailForgotPasswordEvent) {
    const template = `Berikut adalah link lupa password anda: [link]`;

    this.mailerService
      .sendMail({
        to: event.email,
        from: 'olmatuinsa@olmat-uinsa.com',
        subject: 'Link Lupa Password Olmat UINSA',
        text: template.replace(
          '[link]',
          process.env.FRONTEND_DOMAIN + `/${event.id}`,
        ),
      })
      .then(() => {
        console.log('success sending forgot password link');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
