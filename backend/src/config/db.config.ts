import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { Profile } from 'src/profiles/profile.entity';
import { User } from 'src/users/user.entity';

const ENV = process.env.NODE_ENV;
const path = ENV === 'production' ? '/var/data/db.sqlite' : join(process.cwd(), 'src', 'data', 'db.sqlite');

export const dbConfig: TypeOrmModuleOptions = {
  type: 'better-sqlite3',
  database: path,
  entities: [User, Profile],
  synchronize: ENV === 'development',
  extra: { pragma: { foreign_keys: 'ON' } },
};
