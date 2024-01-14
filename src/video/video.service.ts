import { Injectable } from '@nestjs/common';
import {
  VideoUploadREquestFiles,
  VideoUploadRequestJosn,
} from './request/video-upload.request';

@Injectable()
export class VideoService {
  async uploadVideo(
    files: VideoUploadREquestFiles,
    request: VideoUploadRequestJosn,
  ) {}
}
