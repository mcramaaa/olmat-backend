import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
  Put,
  Param,
  Body,
  Req,
} from '@nestjs/common';
import { customPagination } from 'src/shared/utils/pagination';
import { PaginationResultType } from 'src/shared/types/pagination-result.type';
import { ApiBearerAuth, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthAdminGuard } from 'src/shared/guards/auth.guard';
import { ParticipantService } from './participant.service';
import { Participants } from 'src/entities/participants.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UpdateParticipantDTO } from './dto/update-participant.dto';

@ApiTags('Participant')
@ApiBearerAuth()
@UseGuards(AuthAdminGuard)
@Controller({
  path: 'backoffice/participant',
  version: '1',
})
export class ParticipantController {
  constructor(private participantService: ParticipantService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'page', required: true, example: 1 })
  @ApiQuery({ name: 'limit', required: true, example: 10 })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<PaginationResultType<Participants>> {
    const [data, count] = await this.participantService.findManyWithPagination({
      page,
      limit,
    });

    return customPagination(data, count, { page, limit });
  }

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'img', maxCount: 1 },
      { name: 'attachment', maxCount: 1 },
    ]),
  )
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateParticipantDTO,
    @Req() req: { imgFileName: string; attachmentFileName: string },
  ) {
    return await this.participantService.update(
      payload,
      id,
      req.imgFileName,
      req.attachmentFileName,
    );
  }
}
