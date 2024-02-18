import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AdminRoleService } from './admin-role.service';
import { CreateAdminRoleDto } from './dto/create-admin-role.dto';
import { UpdateAdminRoleDto } from './dto/update-admin-role.dto';
import { AdminRole } from 'src/entities/admin-role.entity';
import { PERMISSIONS } from 'src/shared/enums/permissions.enum';
import { OkResponse, okTransform } from 'src/shared/utils/ok-response';
import { customPagination } from 'src/shared/utils/pagination';
import { PaginationResultType } from 'src/shared/types/pagination-result.type';
import { NullableType } from 'src/shared/types/nullable.type';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthAdminGuard } from 'src/shared/guards/auth.guard';

@ApiTags('Admin Role')
@ApiBearerAuth()
@UseGuards(AuthAdminGuard)
@Controller({
  path: 'backoffice/admin-role',
  version: '1',
})
export class AdminRoleController {
  constructor(private adminRoleService: AdminRoleService) {}

  @Get('/permissions')
  @HttpCode(HttpStatus.OK)
  getPermissions(): OkResponse<PERMISSIONS[]> {
    return okTransform(Object.values(PERMISSIONS));
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'page', required: true, example: 1 })
  @ApiQuery({ name: 'limit', required: true, example: 10 })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<PaginationResultType<AdminRole>> {
    const [data, count] = await this.adminRoleService.findManyWithPagination({
      page,
      limit,
    });

    return customPagination(data, count, { page, limit });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: number): Promise<NullableType<AdminRole>> {
    return await this.adminRoleService.findOne({ id: id });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createRoledto: CreateAdminRoleDto): Promise<AdminRole> {
    return await await this.adminRoleService.create(createRoledto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: number,
    @Body() updateRoleDto: UpdateAdminRoleDto,
  ): Promise<AdminRole> {
    return await this.adminRoleService.update(updateRoleDto, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number): Promise<void> {
    return await this.adminRoleService.remove(id);
  }
}
