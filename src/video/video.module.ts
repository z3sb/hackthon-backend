import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { DataSource } from "typeorm";
import { UserRepositoryImplement } from "../user/dao/user.repository.implement";
import { getDataSourceToken, getRepositoryToken } from "@nestjs/typeorm";
import { Video } from "./dao/video.entity";

@Module({
  imports: [],
  controllers: [VideoController],
  providers: [VideoService, {
    provide: getRepositoryToken(Video),
    inject: [getDataSourceToken()],
    useFactory(datasource: DataSource) {
      return datasource.getRepository(Video).extend(UserRepositoryImplement);
    },
  }],
})
export class VideoModule {}
