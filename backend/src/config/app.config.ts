import { ConfigModuleOptions } from '@nestjs/config';
import envValidation from './env.validation';
import jwtConfig from './jwt.config';

const ENV = process.env.NODE_ENV;

export const appConfig: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: ENV === 'development' ? `.env.development` : '.env',
  load: [jwtConfig],
  validationSchema: envValidation,
};
