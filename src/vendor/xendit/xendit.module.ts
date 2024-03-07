import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { XenditService } from './xendit.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [XenditService],
  exports: [XenditService],
})
export class XenditModule {}
