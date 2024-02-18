import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PaginationResultType } from 'src/shared/types/pagination-result.type';
import { customPagination } from 'src/shared/utils/pagination';
import { AuthAdminGuard } from 'src/shared/guards/auth.guard';
import { RegionService } from './region.service';
import { Regions } from 'src/entities/regions.entity';

@ApiTags('Region')
@ApiBearerAuth()
@UseGuards(AuthAdminGuard)
@Controller({
  path: 'backoffice/region',
  version: '1',
})
export class RegionController {
  constructor(private regionService: RegionService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'page', required: true, example: 1 })
  @ApiQuery({ name: 'limit', required: true, example: 10 })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<PaginationResultType<Regions>> {
    const [data, count] = await this.regionService.findManyWithPagination({
      page,
      limit,
    });

    return customPagination(data, count, { page, limit });
  }
}
