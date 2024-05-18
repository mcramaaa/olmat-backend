import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PaginationResultType } from 'src/shared/types/pagination-result.type';
import { Payments } from 'src/entities/payments.entity';
import { customPagination } from 'src/shared/utils/pagination';
import { PaymentStatus } from 'src/shared/enums/payment.enum';
import { AuthAdminGuard } from 'src/shared/guards/auth.guard';

@ApiTags('Payments')
@ApiBearerAuth()
@UseGuards(AuthAdminGuard)
@Controller({
  path: 'backoffice/payment',
  version: '1',
})
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'page', required: true, example: 1 })
  @ApiQuery({ name: 'limit', required: true, example: 10 })
  @ApiQuery({ name: 'user_name', required: false })
  @ApiQuery({ name: 'invoice', required: false })
  @ApiQuery({ name: 'status', required: false })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('user_name') username?: string,
    @Query('invoice') invoice?: string,
    @Query('status') status?: PaymentStatus,
  ): Promise<PaginationResultType<Payments>> {
    const [data, count] = await this.paymentService.findManyWithPagination(
      {
        page,
        limit,
      },
      { username, invoice, status },
    );

    return customPagination(data, count, { page, limit });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Payments> {
    return await this.paymentService.findOne({ id });
  }
}
