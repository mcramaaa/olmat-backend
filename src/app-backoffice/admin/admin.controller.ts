import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthAdminGuard } from 'src/shared/guards/auth.guard';
import { Admins } from 'src/entities/admins.entity';
import { PaginationResultType } from 'src/shared/types/pagination-result.type';
import { customPagination } from 'src/shared/utils/pagination';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { NullableType } from 'src/shared/types/nullable.type';

@ApiTags('Admin')
@ApiBearerAuth()
@UseGuards(AuthAdminGuard)
@Controller({
  path: 'backoffice/admin',
  version: '1',
})
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'page', required: true, example: 1 })
  @ApiQuery({ name: 'limit', required: true, example: 10 })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<PaginationResultType<Admins>> {
    const [data, count] = await this.adminService.findManyWithPagination({
      page,
      limit,
    });

    return customPagination(data, count, { page, limit });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: number) {
    return await this.adminService.findOne({ id: id });
  }

  @HttpCode(HttpStatus.OK)
  @Get('/search/:name')
  async fillterByName(
    @Param('name') name: string,
  ): Promise<NullableType<Admins[]>> {
    return await this.adminService.fillterAdminByName(name);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: number, @Body() payload: UpdateAdminDto) {
    return await this.adminService.update(id, payload);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAdmin(@Param('id') id: number) {
    return await this.adminService.delete(id);
  }
}
