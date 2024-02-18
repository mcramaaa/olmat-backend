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
import { Provincies } from 'src/entities/provincies.entity';
import { PaginationResultType } from 'src/shared/types/pagination-result.type';
import { ProvinceService } from './province.service';
import { customPagination } from 'src/shared/utils/pagination';
import { AuthAdminGuard } from 'src/shared/guards/auth.guard';

@ApiTags('Province')
@ApiBearerAuth()
@UseGuards(AuthAdminGuard)
@Controller({
  path: 'backoffice/province',
  version: '1',
})
export class ProvinceController {
  constructor(private provinceService: ProvinceService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'page', required: true, example: 1 })
  @ApiQuery({ name: 'limit', required: true, example: 10 })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<PaginationResultType<Provincies>> {
    const [data, count] = await this.provinceService.findManyWithPagination({
      page,
      limit,
    });

    return customPagination(data, count, { page, limit });
  }
}
