import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthUserGuard } from 'src/shared/guards/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from 'src/entities/users.entity';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(AuthUserGuard)
@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne({ id: id });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateUserDto,
  ): Promise<Users> {
    return await this.userService.update(id, payload);
  }
}
