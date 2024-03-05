import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { DegreeService } from './degree.service';
import { CreateDegreeDto } from './dto/create-degree.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthAdminGuard } from 'src/shared/guards/auth.guard';
import { UpdateDegreeDto } from './dto/update-degree.dto';
import { Degree } from 'src/entities/degree.entity';

@ApiTags('Degree')
@ApiBearerAuth()
@UseGuards(AuthAdminGuard)
@Controller({
  path: 'backoffice/degree',
  version: '1',
})
export class DegreeController {
  constructor(private readonly degreeService: DegreeService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDegreeDto: CreateDegreeDto): Promise<void> {
    return this.degreeService.create(createDegreeDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Degree[]> {
    return this.degreeService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<Degree> {
    return this.degreeService.findOne({ id: id });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() payload: UpdateDegreeDto,
  ): Promise<void> {
    return this.degreeService.update(id, payload);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.degreeService.remove(+id);
  }
}
