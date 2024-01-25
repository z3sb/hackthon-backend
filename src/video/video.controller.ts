import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Post, Req,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { VideoService } from './video.service';
import {
  VideoUploadREquestFiles,
  VideoUploadRequestJosn,
} from './request/video-upload.request';
import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';

@Controller('video')
export class VideoController {
  private readonly logger = new Logger(VideoController.name);

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
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const uniqueFilename = `${uuidv4()}-${file.originalname}`;
            cb(null, uniqueFilename);
          },
        }),
      },

    ),
  )
  @UsePipes(ValidationPipe)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: VideoUploadRequestJosn,
  })
  async uploadFile(
    @UploadedFiles() files: VideoUploadREquestFiles,
    @Body() request: VideoUploadRequestJosn,
  ) {
    try {
      await this.service.uploadVideo(files, request);
    } catch (error) {
      this.logger.error(`Error uploading files: ${error.message}`, error.stack);
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
