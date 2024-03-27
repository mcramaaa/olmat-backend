import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthAdminGuard } from 'src/shared/guards/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthAdminGuard)
@Controller({
  path: 'backoffice/dashboardd',
  version: '1',
})
@ApiTags('Dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async get(): Promise<object> {
    return await this.dashboardService.getDashboardData();
  }
}
