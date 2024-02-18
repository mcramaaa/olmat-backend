import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
// @ApiBearerAuth()
// @UseGuards(AuthAdminGuard)
@Controller({
  path: '/user',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne({ id: id });
  }
}
