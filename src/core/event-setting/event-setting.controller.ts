import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EventSettingService } from './event-setting.service';
import { CreateEventSettingDTO } from './dto/create-event-setting.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthAdminGuard } from 'src/shared/guards/auth.guard';
import { PaginationResultType } from 'src/shared/types/pagination-result.type';
import { EventSettings } from 'src/entities/event-settings.entity';
import { customPagination } from 'src/shared/utils/pagination';

@ApiTags('Event Setting')
@ApiBearerAuth()
@UseGuards(AuthAdminGuard)
@Controller({
  path: 'backoffice/event-setting',
  version: '1',
})
export class EventSettingController {
  constructor(private eventSettingService: EventSettingService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'page', required: true, example: 1 })
  @ApiQuery({ name: 'limit', required: true, example: 10 })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<PaginationResultType<EventSettings>> {
    const [data, count] = await this.eventSettingService.findManyWithPagination(
      {
        page,
        limit,
      },
    );

    return customPagination(data, count, { page, limit });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateEventSettingDTO): Promise<void> {
    return await this.eventSettingService.create(payload);
  }
}
