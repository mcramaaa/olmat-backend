import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateSchoolDTO } from './dto/create-school.dto';
import { Schools } from 'src/entities/schools.entity';
import { SchoolService } from './school.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('School')
// @ApiBearerAuth()
// @UseGuards(AuthAdminGuard)
@Controller({
  path: 'school',
  version: '1',
})
export class SchoolController {
  constructor(private schoolService: SchoolService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateSchoolDTO): Promise<Schools> {
    return await this.schoolService.craete(payload);
  }
}
