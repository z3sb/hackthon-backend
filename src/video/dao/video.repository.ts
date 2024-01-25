import { Repository } from 'typeorm';
import { Video } from './video.entity';

export interface VideoRepository extends Repository<Video> {
  this: Repository<Video>;
  getVideos(): Promise<Video[]>;
  getVideoById(id: number): Promise<Video>;
  addVideo(video: Video);
}
