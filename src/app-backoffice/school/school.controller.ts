import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PaginationResultType } from 'src/shared/types/pagination-result.type';
import { customPagination } from 'src/shared/utils/pagination';
import { AuthAdminGuard } from 'src/shared/guards/auth.guard';
import { SchoolService } from './school.service';
import { Schools } from 'src/entities/schools.entity';

@ApiTags('School')
@ApiBearerAuth()
@UseGuards(AuthAdminGuard)
@Controller({
  path: 'backoffice/school',
  version: '1',
})
export class SchoolController {
  constructor(private schoolService: SchoolService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'page', required: true, example: 1 })
  @ApiQuery({ name: 'limit', required: true, example: 10 })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<PaginationResultType<Schools>> {
    const [data, count] = await this.schoolService.findManyWithPagination({
      page,
      limit,
    });

    return customPagination(data, count, { page, limit });
  }

  @Get('/request-lists')
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'page', required: true, example: 1 })
  @ApiQuery({ name: 'limit', required: true, example: 10 })
  async requestLists(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<PaginationResultType<Schools>> {
    const [data, count] = await this.schoolService.schoolRequesList({
      page,
      limit,
    });

    return customPagination(data, count, { page, limit });
  }

  @Patch('/accept/:school_id')
  @HttpCode(HttpStatus.OK)
  async acceptSchool(@Param('school_id') school_id: number) {
    return await this.schoolService.acceptSchool(school_id);
  }
}
