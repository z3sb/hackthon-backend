import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as process from 'process';

const host = process.env.POSTGRES_HOST;
const port = Number(process.env.POSTGRES_PORT);
const username = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host,
  port,
  username,
  password,
  database: "hackthon",
  schema: 'public',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};
