import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';

import { catchError, lastValueFrom, map } from 'rxjs';
import { AxiosError } from 'axios';
import { SettingService } from 'src/core/setting/setting.service';
import { XenditEndpoint } from './endpoint.enum';
import { SETTING_XENDIT } from 'src/shared/constants/setting';
import {
  XenditError,
  XenditQRCode,
  XenditQRCodePayload,
  XenditQRCodePayment,
  XenditQRCodeRefund,
  XenditSetting,
} from './interfaces';

@Injectable()
export class XenditService {
  private readonly logger = new Logger(XenditService.name);
  private readonly HOSTNAME = 'https://api.xendit.co';
  private readonly KEY = SETTING_XENDIT;

  constructor(
    private readonly httpService: HttpService,
    private readonly settingService: SettingService,
  ) {}

  private async getAuthorization(): Promise<string> {
    try {
      const { apiKey } = await this.settingService.findByKey<XenditSetting>(
        this.KEY,
      );
      return `Basic ${Buffer.from(`${apiKey}:`).toString('base64')}`;
    } catch (error) {
      this.logger.error(error?.message ?? 'Error when getting the API key');
      return Promise.reject('Unable to retrieve the API key');
    }
  }

  async validateCallback(token: string): Promise<boolean> {
    try {
      const { callbackToken } =
        await this.settingService.findByKey<XenditSetting>(this.KEY);
      return callbackToken === token;
    } catch (error) {
      this.logger.error(
        error?.message ?? 'Error when getting the Callback Token',
      );
      return Promise.reject('Unable to retrieve the Callback Token');
    }
  }

  private async makeRequest<T>(
    method: 'GET' | 'POST',
    endpoint: string,
    body?: any,
    header?: object,
  ): Promise<T> {
    return await lastValueFrom(
      await this.getAuthorization().then((token) =>
        this.httpService
          .request<T>({
            method,
            url: this.HOSTNAME + endpoint,
            headers: {
              Authorization: token,
              ...header,
            },
            data: body,
          })
          .pipe(
            map((response) => response.data),
            catchError((error: AxiosError<XenditError>) => {
              this.logger.error(
                error.response?.data.message ?? error.response?.data,
                error.response?.data.errors,
              );
              return Promise.reject('Error when communicating with the vendor');
            }),
          ),
      ),
    );
  }

  async createQRCode(payload: XenditQRCodePayload): Promise<XenditQRCode> {
    return await this.makeRequest<XenditQRCode>(
      'POST',
      `${XenditEndpoint.QRCODE}`,
      payload,
      {
        'API-Version': '2022-07-31',
      },
    );
  }

  static isXenditQRCodePayment(
    data: XenditQRCodePayment | XenditQRCodeRefund,
  ): data is XenditQRCodePayment {
    return (data as XenditQRCodePayment).payment_detail !== undefined;
  }

  static isXenditQRCodeRefund(
    data: XenditQRCodePayment | XenditQRCodeRefund,
  ): data is XenditQRCodeRefund {
    return (data as XenditQRCodeRefund).refunded_at !== undefined;
  }
}
