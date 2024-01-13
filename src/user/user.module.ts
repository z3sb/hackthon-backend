import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { getDataSourceToken, getRepositoryToken } from "@nestjs/typeorm";
import { UserEntity } from "./dao/user.entity";
import { DataSource } from "typeorm";
import { UserRepositoryImplement } from "./dao/user.repository.implement";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, {
    provide: getRepositoryToken(UserEntity),
    inject: [getDataSourceToken()],
    useFactory(datasource: DataSource) {
      return datasource.getRepository(UserEntity).extend(UserRepositoryImplement);
    },
  },JwtService],
  exports: []
})
export class UserModule {}
