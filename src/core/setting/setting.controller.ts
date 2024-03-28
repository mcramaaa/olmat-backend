import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OkResponse, okTransform } from 'src/shared/utils/ok-response';
import { SettingService } from './setting.service';
import { SettingXenditDto } from './dto/setting-xendit.dto';
import { AuthAdminGuard } from 'src/shared/guards/auth.guard';
import { SETTING_XENDIT } from 'src/shared/constants/setting';

@ApiTags('Setting')
@ApiBearerAuth()
@UseGuards(AuthAdminGuard)
@Controller({
  path: 'backoffice/settings',
  version: '1',
})
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Get(':key')
  async findByKey(@Param('key') key: string): Promise<OkResponse<void>> {
    switch (key) {
      case 'xendit':
        key = SETTING_XENDIT;
        break;

      default:
        key = key;
        break;
    }

    return okTransform(await this.settingService.findByKey(key));
  }

  @Post('/xendit')
  @HttpCode(HttpStatus.NO_CONTENT)
  async saveXendit(
    @Body() payload: SettingXenditDto,
  ): Promise<OkResponse<void>> {
    return okTransform(
      await this.settingService.save({
        key: SETTING_XENDIT,
        value: JSON.stringify(payload),
      }),
      undefined,
      HttpStatus.NO_CONTENT,
    );
  }
}
