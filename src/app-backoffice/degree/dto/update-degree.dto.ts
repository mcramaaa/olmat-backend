import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateDegreeDto } from './create-degree.dto';

export class UpdateDegreeDto extends PartialType(
  OmitType(CreateDegreeDto, ['id']),
) {}
