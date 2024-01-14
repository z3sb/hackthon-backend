import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { VideoService } from './video.service';
import {
  VideoUploadREquestFiles,
  VideoUploadRequestJosn,
} from './request/video-upload.request';

@Controller('video')
export class VideoController {
  constructor(private readonly service: VideoService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'video', maxCount: 1 },
        { name: 'image', maxCount: 1 },
      ],
      {
        dest: 'uploads/',
      },
    ),
  )
  @UsePipes(ValidationPipe)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: VideoUploadRequestJosn,
  })
  uploadFile(
    @UploadedFiles()
    files: VideoUploadREquestFiles,
    request: VideoUploadRequestJosn,
  ) {
    this.service.uploadVideo(files, request);
  }
}
