import { Injectable } from '@nestjs/common';
import {
  VideoUploadREquestFiles,
  VideoUploadRequestJosn,
} from './request/video-upload.request';
import { InjectRepository } from "@nestjs/typeorm";
import { Video } from "./dao/video.entity";
import { VideoRepository } from "./dao/video.repository";

@Injectable()
export class VideoService {

  constructor(@InjectRepository(Video) private readonly repository: VideoRepository) {
  }
  async uploadVideo(
    files: VideoUploadREquestFiles,
    request: VideoUploadRequestJosn,
  ) {

    const image = files.image[0]
    const video = files.image[0]

    await this.repository.save({
      video: video.path,
      image: image.path,
      title: request.title,
      description: request.description
    })

  }
}
