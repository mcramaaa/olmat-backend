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
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PaymentGatewayService } from './payment-gateway.service';
import { ApiBearerAuth, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthAdminGuard } from 'src/shared/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePaymentGatewayDto } from './dto/create-payment-gateway.dto';
import { UpdatePaymentGatewayDto } from './dto/update-payment-gateway.dto';
import { PaymentGateways } from 'src/entities/payment-gateways.entity';
import { PaginationResultType } from 'src/shared/types/pagination-result.type';
import { customPagination } from 'src/shared/utils/pagination';
import { NullableType } from 'src/shared/types/nullable.type';

@ApiTags('Payment Gateway')
@ApiBearerAuth()
@UseGuards(AuthAdminGuard)
@Controller({
  path: 'backoffice/payment-gateway',
  version: '1',
})
export class PaymentGatewayController {
  constructor(private paymentGatewayService: PaymentGatewayService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('img'))
  async create(
    @Body() payload: CreatePaymentGatewayDto,
    @Req() req: { logoFileNames: string | undefined },
  ): Promise<void> {
    return await this.paymentGatewayService.create(payload, req.logoFileNames);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'page', required: true, example: 1 })
  @ApiQuery({ name: 'limit', required: true, example: 10 })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<PaginationResultType<PaymentGateways>> {
    const [data, count] =
      await this.paymentGatewayService.findManyWithPagination({
        page,
        limit,
      });

    return customPagination(data, count, { page, limit });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id') id: number,
  ): Promise<NullableType<PaymentGateways>> {
    return await this.paymentGatewayService.findOne({ id });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('img'))
  async update(
    @Param('id') id: number,
    @Body() payload: UpdatePaymentGatewayDto,
    @Req() req: { logoFileNames: string | undefined },
  ): Promise<void> {
    return await this.paymentGatewayService.update(
      id,
      payload,
      req.logoFileNames,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.paymentGatewayService.delete(id);
  }
}
