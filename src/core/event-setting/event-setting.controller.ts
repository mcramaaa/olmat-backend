import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EventSettingService } from './event-setting.service';
import { CreateEventSettingDTO } from './dto/create-event-setting.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthAdminGuard } from 'src/shared/guards/auth.guard';

@ApiTags('Event Setting')
@ApiBearerAuth()
@UseGuards(AuthAdminGuard)
@Controller({
  path: 'backoffice/event-setting',
  version: '1',
})
export class EventSettingController {
  constructor(private eventSettingService: EventSettingService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateEventSettingDTO): Promise<void> {
    return await this.eventSettingService.create(payload);
  }
}
