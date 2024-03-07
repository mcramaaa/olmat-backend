import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SettingXenditDto {
  @ApiProperty({
    example:
      'xnd_development_HMC2miMnoBUDhtpo9Zsiv3VcV7VpnDMSMEaxpVfAH5t7ywTSJN7gfdtg5wgn902',
  })
  @IsNotEmpty()
  apiKey: string;

  @ApiProperty({
    example: '2PTadtxHhzre3tPpCInI6vUXLMU0dAE5b73tRbfn2H5Sd9LU',
  })
  @IsNotEmpty()
  callbackToken: string;
}
