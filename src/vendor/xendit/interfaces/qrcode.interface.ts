export interface XenditQRCodeEvent<T> {
  /**
   * Identifies the event that triggered a notification to the merchant
   *
   * Available values: qr.payment, qr.refund
   */
  event: 'qr.payment' | 'qr.refund';

  /**
   * The version of the API. 2022-07-31 is for the v2 version of the endpoint
   */
  'api-version': string;

  /**
   * Business ID of the merchant
   */
  business_id: string;

  /**
   * ISO 8601 Timestamp for QR payment creation in UTC+0 timezone
   * Format: YYYY-MM-DDTHH:mm:ssZ
   */
  created: string;

  data: T;
}

type XenditQRCodeBasket = {
  /**
   * Merchant's identifier for a specific product (255 characters).
   */
  reference_id: string;

  /**
   * Name of the product (255 characters).
   */
  name: string;

  /**
   * Merchant category for the item, e.g., "Electronics" (255 characters).
   */
  category: string;

  /**
   * Currency used for the transaction in ISO4217 format.
   * Available values: "IDR".
   */
  currency: string;

  /**
   * Price per unit in basket currency.
   */
  price: number;

  /**
   * Number of units of this item in the basket.
   */
  quantity: number;

  /**
   * Type of product - "PRODUCT" or "SERVICE".
   */
  type: string;

  /**
   * URL to the e-commerce page of the item.
   */
  url?: string;

  /**
   * Description of the product (255 characters).
   */
  description?: string;

  /**
   * Merchant sub-category for the item, e.g., "Mobile Phone" (255 characters).
   */
  sub_category?: string;

  /**
   * Object of additional information the merchant may use.
   * Merchant defines the JSON properties and values.
   * Merchant can specify up to 50 keys, with key names up to 40 characters long and values up to 500 characters long.
   */
  metadata?: Record<string, any>;
};

export interface XenditQRCodePayload {
  /**
   * Reference ID provided by the merchant.
   * Does not need to be unique (255 characters).
   */
  reference_id: string;

  /**
   * Type of QR code: "DYNAMIC" or "STATIC".
   * - Dynamic QR code contains the amount value to be paid upon scanning and can only be paid a single time.
   * - Static QR code requires the end user to input the payment value and can be paid multiple times.
   */
  type: 'DYNAMIC' | 'STATIC';

  /**
   * Currency used for the transaction in ISO4217 format.
   * Available values: "IDR".
   */
  currency: 'IDR';

  /**
   * Amount specified in the request.
   * Conditionally required for static QR codes.
   * Static QR codes require the end user to always input the amount to be paid at the point of scanning.
   * Note: Minimum amount is 1 IDR. Maximum amount is 10,000,000 IDR.
   */
  amount?: number;

  /**
   * Code specifying which QR code partner will be used to process the transaction.
   * Available values: "ID_DANA", "ID_LINKAJA".
   */
  channel_code?: 'ID_DANA' | 'ID_LINKAJA';

  /**
   * ISO 8601 Timestamp for QR code expiry. Timezone UTC+0.
   * Format: YYYY-MM-DDTHH:mm:ssZ.
   * Note: For ID_DANA's dynamic QR code, the default is the QR code expires in 48 hours from the creation time if expires_at is not specified.
   * For ID_DANA's static QR code, the QR code never expires, so the expires_at value will always be null.
   */
  expires_at?: string;

  /**
   * Array of objects describing the item(s) purchased.
   */
  basket?: XenditQRCodeBasket[];

  /**
   * Object of additional information the merchant may use.
   * Merchant defines the JSON properties and values.
   * Merchant can specify up to 50 keys, with key names up to 40 characters long and values up to 500 characters long.
   */
  metadata?: Record<string, any>;
}

export interface XenditQRCode {
  /**
   * Unique identifier for this transaction. Prefix qr_
   */
  id: string;

  /**
   * Reference ID provided by merchant (255 characters)
   */
  reference_id: string;

  /**
   * Business ID of merchant
   */
  business_id: string;

  /**
   * Type of QR code: DYNAMIC or STATIC
   *
   * - DYNAMIC: QR code contains the amount value to be paid upon scanning and can only be paid a single time.
   * - STATIC: QR code requires the end user to input the payment value and can be paid multiple times.
   */
  type: 'DYNAMIC' | 'STATIC';

  /**
   * Currency used for the transaction in ISO4217 format
   *
   * Available values: IDR
   */
  currency: 'IDR';

  /**
   * Amount specified in the request
   */
  amount: number;

  /**
   * Channel code specifying which QR code partner will be used to process the transaction
   *
   * Available values: ID_DANA, ID_LINKAJA
   */
  channel_code: 'ID_DANA' | 'ID_LINKAJA';

  /**
   * Status of the transaction: ACTIVE or INACTIVE
   *
   * - ACTIVE: The QR code is active and can accept payments.
   * - INACTIVE: The QR code is inactive or expired and can no longer accept payments.
   */
  status: 'ACTIVE' | 'INACTIVE';

  /**
   * QR string to be rendered for display to end users.
   * QR string to image rendering is commonly available in software libraries (e.g. Node.js, PHP, Java).
   */
  qr_string: string;

  /**
   * ISO 8601 Timestamp for QR code expiry in UTC+0 timezone.
   * Format: YYYY-MM-DDTHH:mm:ssZ
   *
   * Note:
   * - For ID_DANA's dynamic QR code, the default expiry is 48 hours from the creation time if expires_at is not specified.
   * - For ID_DANA's static QR code, the QR code never expires, so the expires_at value will always be null.
   */
  expires_at?: string;

  /**
   * ISO 8601 Timestamp for the creation of the QR code object in UTC+0 timezone.
   * Format: YYYY-MM-DDTHH:mm:ssZ
   */
  created: string;

  /**
   * ISO 8601 Timestamp for the latest update of the QR code object in UTC+0 timezone.
   * Format: YYYY-MM-DDTHH:mm:ssZ
   */
  updated: string;

  /**
   * Array of objects describing the items purchased
   */
  basket: XenditQRCodeBasket[];

  /**
   * Additional information the merchant may include.
   * Merchant can specify up to 50 keys, with key names up to 40 characters long and values up to 500 characters long.
   */
  metadata?: Record<string, string>;
}

export interface XenditQRCodePayment {
  /**
   * Unique identifier for this transaction. Prefix qrpy_
   */
  id: string;

  /**
   * Business ID of the merchant
   */
  business_id: string;

  /**
   * Currency used for the transaction in ISO4217 format
   *
   * Available values: IDR
   */
  currency: 'IDR';

  /**
   * Amount specified in the request
   *
   * Static QR codes require the end user to always input the amount to be paid at the point of scanning.
   * Min amount is 1 IDR.
   * Max amount is 10,000,000 IDR.
   */
  amount: number;

  /**
   * Status of the QR payment
   *
   * Available values: SUCCEEDED
   */
  status: 'SUCCEEDED';

  /**
   * ISO 8601 Timestamp for QR payment creation in UTC+0 timezone
   * Format: YYYY-MM-DDTHH:mm:ssZ
   */
  created: string;

  /**
   * Unique identifier for the QR code. Prefix qr_
   */
  qr_id: string;

  /**
   * QR string to be rendered for display to end users.
   * QR string to image rendering is commonly available in software libraries (e.g., Node.js, PHP, Java).
   */
  qr_string: string;

  /**
   * Reference ID provided by the merchant (255 characters)
   */
  reference_id: string;

  /**
   * Type of QR code: DYNAMIC or STATIC
   *
   * - DYNAMIC: QR code contains the amount value to be paid upon scanning and can only be paid a single time.
   * - STATIC: QR code requires the end user to input the payment value and can be paid multiple times.
   */
  type: 'DYNAMIC' | 'STATIC';

  /**
   * Code specifying which QR code partner will be used to process the transaction
   *
   * Available values: ID_DANA, ID_LINKAJA
   */
  channel_code: 'ID_DANA' | 'ID_LINKAJA';

  /**
   * ISO 8601 Timestamp for QR code expiry in UTC+0 timezone
   * Format: YYYY-MM-DDTHH:mm:ssZ
   *
   * For ID_DANA's dynamic QR code, the default is the QR code expires in 48 hours from creation time if expires_at is not specified.
   * For ID_DANA's static QR code, the default is the QR code never expires (expires_at will be accepted and ignored).
   */
  expires_at: string;

  /**
   * Array of objects describing the items purchased
   */
  basket: XenditQRCodeBasket[];

  /**
   * Additional information the merchant may include.
   * Merchant can specify up to 50 keys, with key names up to 40 characters long and values up to 500 characters long.
   */
  metadata?: Record<string, string>;

  /**
   * Object contains information about the payment that has been shared across the payment network
   */
  payment_detail: XenditQRCodePaymentDetail;
}

interface XenditQRCodePaymentDetail {
  /**
   * Request reference number (RRN) that is shared across the QR network
   */
  receipt_id: string;

  /**
   * Source where the end user’s balance was deducted to complete the payment (e.g., BCA, OVO, GOPAY)
   */
  source: string;

  /**
   * Name of the account holder/end user. This will be null if unavailable
   */
  name: string | null;

  /**
   * Masked public identifier for the source account. This will be null if unavailable
   *
   * Example: +62*
   */
  account_details: string | null;
}

export interface XenditQRCodeRefund {
  /**
   * Unique identifier for the QR refund transaction. Prefix qrrf_
   */
  id: string;

  /**
   * Unique identifier for the original QR payment transaction
   */
  qrpy_id: string;

  /**
   * Status of the refund request
   *
   * Available values: SUCCEEDED, FAILED, PENDING
   */
  status: 'SUCCEEDED' | 'FAILED' | 'PENDING';

  /**
   * Currency used for the transaction in ISO4217 format
   *
   * Available values: IDR
   */
  currency: 'IDR';

  /**
   * Amount of the original QR payment transaction
   */
  payment_amount: number;

  /**
   * Amount to be refunded
   */
  refund_amount: number;

  /**
   * Channel code indicating the QR code partner
   *
   * Available values: ID_DANA
   */
  channel_code: 'ID_DANA';

  /**
   * Reason for the refund
   */
  reason: string;

  /**
   * Reason for the refund request failing
   */
  failure_code?: string;

  /**
   * Timestamp in ISO 8601 for the refund request in UTC+0 timezone.
   * Format: YYYY-MM-DDTHH:mm:ssZ
   */
  created: string;

  /**
   * Timestamp in ISO 8601 for the latest refund object update in UTC+0 timezone.
   * Format: YYYY-MM-DDTHH:mm:ssZ
   */
  updated: string;

  /**
   * Timestamp in ISO 8601 for the refund completion from the QR code partner in UTC+0 timezone.
   * Format: YYYY-MM-DDTHH:mm:ssZ
   */
  refunded_at?: string;
}
