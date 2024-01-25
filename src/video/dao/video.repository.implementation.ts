import { Repository } from 'typeorm';
import { VideoRepository } from './video.repository';
import { Video } from './video.entity';
export const VideoRepositoryImplementation: Pick<VideoRepository, any> = {
  getUser(this: Repository<Video>, id) {
    return this.findOne({ where: { id } });
  },

  getUsers(this: Repository<Video>) {
    return this.find();
  },

  createUser(this: Repository<Video>, user) {
    return this.save(user);
  },
};
