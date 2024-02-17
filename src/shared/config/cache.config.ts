import { registerAs } from '@nestjs/config';
import validateConfig from 'src/shared/utils/validate-config';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { CacheConfig } from '../types/config.type';

class EnvironmentVariablesValidator {
  @IsInt()
  @Min(0)
  @IsOptional()
  CACHE_TTL: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  CACHE_MAX: number;

  @IsString()
  @IsOptional()
  CACHE_HOST: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  CACHE_PORT: number;

  @IsString()
  @IsOptional()
  CACHE_PASSWORD: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  CACHE_DB: number;
}

export default registerAs<CacheConfig>('cache', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    ttl: process.env.CACHE_TTL ? parseInt(process.env.CACHE_TTL, 5) : 10,
    max: process.env.CACHE_MAX ? parseInt(process.env.CACHE_MAX, 10) : 5,
    host: process.env.CACHE_HOST || 'localhost',
    port: process.env.CACHE_PORT ? parseInt(process.env.CACHE_PORT) : 6379,
    auth_pass: process.env.CACHE_PASSWORD || 'P@ssw0rd',
    db: process.env.CACHE_DB ? Number(process.env.CACHE_DB) : 0,
  };
});
