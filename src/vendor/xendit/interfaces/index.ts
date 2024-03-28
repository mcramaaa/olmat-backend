export {
  XenditQRCode,
  XenditQRCodePayload,
  XenditQRCodePayment,
  XenditQRCodeRefund,
} from './qrcode.interface';

export interface XenditSetting {
  apiKey: string;
  callbackToken: string;
}

interface XenditErrorPath {
  path: string;
  message: string;
}

export interface XenditError {
  error_code:
    | 'API_VALIDATION_ERROR'
    | 'INVALID_API_KEY'
    | 'REQUEST_FORBIDDEN_ERROR'
    | 'SERVER_ERROR'
    | string;
  message: string;
  errors: XenditErrorPath[];
}

export interface XenditBalance {
  balance: number;
}
