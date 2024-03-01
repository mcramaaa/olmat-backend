import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthUserGuard } from 'src/shared/guards/auth.guard';

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
}
