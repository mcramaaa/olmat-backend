import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { SessionUser } from 'src/shared/decorators/user.decorator';
import { Users } from 'src/entities/users.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthUserGuard } from 'src/shared/guards/auth.guard';

@ApiTags('Dashboard')
@ApiBearerAuth()
@UseGuards(AuthUserGuard)
@Controller({
  path: 'dashboard',
  version: '1',
})
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async get(@SessionUser() user: Users): Promise<object> {
    return await this.dashboardService.getDashboardData(user);
  }
}
