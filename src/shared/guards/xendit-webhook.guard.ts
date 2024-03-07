import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-headerapikey';
import { XenditService } from 'src/vendor/xendit/xendit.service';

@Injectable()
export class XenditWebhookStrategy extends PassportStrategy(
  Strategy,
  'xendit-webhook',
) {
  constructor(private readonly xenditService: XenditService) {
    super(
      { header: 'x-callback-token', prefix: '' },
      true,
      async (token: string, done: any) => {
        const isValid = await this.xenditService.validateCallback(token);
        isValid
          ? done(null, true)
          : done(new UnauthorizedException('Invalid Token'), null);
      },
    );
  }
}

export const XenditWebhookGuard = AuthGuard('xendit-webhook');
