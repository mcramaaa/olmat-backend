import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PaginationResultType } from 'src/shared/types/pagination-result.type';
import { customPagination } from 'src/shared/utils/pagination';
import { AuthAdminGuard } from 'src/shared/guards/auth.guard';
import { UserService } from './user.service';
import { Users } from 'src/entities/users.entity';
import { NullableType } from 'src/shared/types/nullable.type';
import { CreateUserDTO } from './dto/create-user.dto';

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
  @ApiQuery({ name: 'name', required: false, example: 'Bejo' })
  @ApiQuery({ name: 'email', required: false, example: 'bejo@gmail.com' })
  @ApiQuery({ name: 'phone', required: false, example: '08168242591' })
  @ApiQuery({ name: 'school', required: false, example: 1 })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('name') name: string,
    @Query('email') email: string,
    @Query('phone') phone: string,
    @Query('school') school_id: string,
  ): Promise<PaginationResultType<Users>> {
    const [data, count] = await this.userService.findManyWithPagination(
      {
        page,
        limit,
      },
      {
        name,
        email,
        phone,
        school_id,
      },
    );

    return customPagination(data, count, { page, limit });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<NullableType<Users>> {
    return await this.userService.findOne({ id });
  }

  @Post('user-register')
  @HttpCode(HttpStatus.CREATED)
  async registerParticipant(@Body() payload: CreateUserDTO): Promise<void> {
    return await this.userService.create(payload);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    return await this.userService.delete(id);
  }
}
