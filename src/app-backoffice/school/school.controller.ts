import {
  Controller,
  DefaultValuePipe,
  Delete,
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
import { NullableType } from 'src/shared/types/nullable.type';

@ApiTags('School')
@ApiBearerAuth()
@UseGuards(AuthAdminGuard)
@Controller({
  path: 'backoffice/school',
  version: '1',
})
export class SchoolController {
  constructor(private schoolService: SchoolService) {}
  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'page', required: true, example: 1 })
  @ApiQuery({ name: 'limit', required: true, example: 10 })
  @ApiQuery({ name: 'name', required: false, example: 'MA AMANATUL' })
  @ApiQuery({ name: 'region_id', required: false, example: 'BDG' })
  @ApiQuery({ name: 'province_id', required: false, example: '32' })
  @ApiQuery({ name: 'city_id', required: false, example: '3273' })
  @ApiQuery({ name: 'subdistrict_id', required: false, example: '2537' })
  @ApiQuery({ name: 'degree_id', required: false, example: '02' })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('name') name: string,
    @Query('region_id') region_id: string,
    @Query('province_id') province_id: string,
    @Query('city_id') city_id: string,
    @Query('subdistrict_id') subdistrict_id: string,
    @Query('degree_id') degree_id: string,
  ): Promise<PaginationResultType<Schools>> {
    const [data, count] = await this.schoolService.findManyWithPagination(
      {
        page,
        limit,
      },
      {
        name,
        region_id,
        province_id,
        city_id,
        subdistrict_id,
        degree_id,
      },
    );

    return customPagination(data, count, { page, limit });
  }

  @Get('request-lists')
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'page', required: true, example: 1 })
  @ApiQuery({ name: 'limit', required: true, example: 10 })
  @ApiQuery({ name: 'name', required: false, example: 'MA AMANATUL' })
  @ApiQuery({ name: 'region_id', required: false, example: 'BDG' })
  @ApiQuery({ name: 'province_id', required: false, example: '32' })
  @ApiQuery({ name: 'city_id', required: false, example: '3273' })
  @ApiQuery({ name: 'subdistric_id', required: false, example: '2537' })
  @ApiQuery({ name: 'degree_id', required: false, example: '02' })
  async requestLists(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('name') name: string,
    @Query('region_id') region_id: string,
    @Query('province_id') province_id: string,
    @Query('city_id') city_id: string,
    @Query('subdistrict_id') subdistrict_id: string,
    @Query('degree_id') degree_id: string,
  ): Promise<PaginationResultType<Schools>> {
    const [data, count] = await this.schoolService.schoolRequesList(
      {
        page,
        limit,
      },
      {
        name,
        region_id,
        province_id,
        city_id,
        subdistrict_id,
        degree_id,
      },
    );

    return customPagination(data, count, { page, limit });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: number): Promise<NullableType<Schools>> {
    return await this.schoolService.findOne({ id });
  }

  @Patch('/accept/:school_id')
  @HttpCode(HttpStatus.OK)
  async acceptSchool(@Param('school_id') school_id: number) {
    return await this.schoolService.acceptSchool(school_id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteSchool(@Param('id') id: number): Promise<void> {
    return await this.schoolService.deleteSchool(id);
  }
}
