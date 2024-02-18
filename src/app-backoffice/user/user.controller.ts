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
import { UserService } from './user.service';
import { Users } from 'src/entities/users.entity';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(AuthAdminGuard)
@Controller({
  path: 'backoffice/user',
  version: '1',
})
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'page', required: true, example: 1 })
  @ApiQuery({ name: 'limit', required: true, example: 10 })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<PaginationResultType<Users>> {
    const [data, count] = await this.userService.findManyWithPagination({
      page,
      limit,
    });

    return customPagination(data, count, { page, limit });
  }
}
