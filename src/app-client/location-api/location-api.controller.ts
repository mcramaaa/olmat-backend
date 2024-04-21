import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { LocationApiService } from './location-api.service';
import { ApiTags } from '@nestjs/swagger';
import { Cities } from 'src/entities/cities.entity';
import { Subdistricts } from 'src/entities/subdistricts.entity';
import { Schools } from 'src/entities/schools.entity';
import { Degree } from 'src/entities/degree.entity';

@ApiTags('Location API')
// @ApiBearerAuth()
// @UseGuards(AuthAdminGuard)
@Controller({
  path: 'location-api',
  version: '1',
})
export class LocationApiController {
  constructor(private locationService: LocationApiService) {}

  @Get('province')
  @HttpCode(HttpStatus.OK)
  async getProvincies() {
    return await this.locationService.getProvincies();
  }

  @Get('city/:province_id')
  @HttpCode(HttpStatus.OK)
  async getCities(
    @Param('province_id') province_id: string,
  ): Promise<Cities[]> {
    return await this.locationService.getCities(province_id);
  }

  @Get('subdistrict/:city_id')
  @HttpCode(HttpStatus.OK)
  async getSubdistricts(
    @Param('city_id') city_id: string,
  ): Promise<Subdistricts[]> {
    return await this.locationService.getSubdistricts(city_id);
  }

  @Get('school/:subdistrict_id')
  @HttpCode(HttpStatus.OK)
  async getSchools(
    @Param('subdistrict_id') subdistrict_id: string,
  ): Promise<Schools[]> {
    return await this.locationService.getSchools(subdistrict_id);
  }

  @Get('degree')
  @HttpCode(HttpStatus.OK)
  async getDegree(): Promise<Degree[]> {
    return await this.locationService.getDegree();
  }
}
