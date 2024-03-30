import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EventSettingService } from './event-setting.service';

@ApiTags('Event setting')
// @ApiBearerAuth()
// @UseGuards(AuthUserGuard)
@Controller({
  path: 'event-setting',
  version: '1',
})
export class EventSettingController {
  constructor(private eventSettingService: EventSettingService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async get(): Promise<object> {
    return await this.eventSettingService.findStartEndDate();
  }
}

//   @Get('/findDate')
//   @HttpCode(HttpStatus.OK)
//   async findDate(): Promise<NullableType<EventSettings[]>> {
//     return await this.eventSettingService.findStartEndDate();
//   }
