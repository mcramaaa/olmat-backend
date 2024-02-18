import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DegreeService } from './degree.service';
import { CreateDegreeDto } from './dto/create-degree.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthAdminGuard } from 'src/shared/guards/auth.guard';

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
  create(@Body() createDegreeDto: CreateDegreeDto) {
    return this.degreeService.create(createDegreeDto);
  }

  @Get()
  findAll() {
    return this.degreeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.degreeService.findOne({ id: id });
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDegreeDto: UpdateDegreeDto) {
  //   return this.degreeService.update(+id, updateDegreeDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.degreeService.remove(+id);
  }
}
