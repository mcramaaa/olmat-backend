export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  EXPIRED = 'expired',
  REFUND = 'refund',
}

export enum PaymentProvider {
  XENDIT = 'xendit',
}

export enum PaymentGroup {
  WALLET = 'wallet',
  VIRTUAL_ACCOUNT = 'va',
  BANK_TRANSFER = 'banktransfer',
  CONVENIENCE_STORE = 'cstore',
  E_WALLET = 'ewallet',
  COD = 'cod',
  PAY_LATER = 'paylater',
  QRIS = 'qris',
}
