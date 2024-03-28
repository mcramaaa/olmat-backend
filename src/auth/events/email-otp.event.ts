export class EmailOTPEvent {
  email: string;
  passcode: string;

  constructor(email: string, passcode: string) {
    this.email = email;
    this.passcode = passcode;
  }
}
