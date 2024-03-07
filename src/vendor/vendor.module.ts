import { Module } from '@nestjs/common';
import { XenditModule } from './xendit/xendit.module';

@Module({
  imports: [XenditModule],
})
export class VendorModule {}
