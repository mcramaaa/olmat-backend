import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateSchoolDTO } from './dto/create-school.dto';
import { Schools } from 'src/entities/schools.entity';
import { SchoolService } from './school.service';
import { ApiTags } from '@nestjs/swagger';
import { NullableType } from 'src/shared/types/nullable.type';

@ApiTags('School')
// @ApiBearerAuth()
// @UseGuards(AuthAdminGuard)
@Controller({
  path: 'school',
  version: '1',
})
export class SchoolController {
  constructor(private schoolService: SchoolService) {}
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: number): Promise<NullableType<Schools>> {
    return await this.schoolService.findOne({ id });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateSchoolDTO): Promise<Schools> {
    return await this.schoolService.craete(payload);
  }
}
