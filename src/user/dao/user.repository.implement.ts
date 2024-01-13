import { UserRepository } from "./user.repository";
import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";

export const UserRepositoryImplement: Pick<UserRepository, any> = {
  getUser(this: Repository<UserEntity>, id) {
    return this.findOne({ where: { id } });
  },

  getUsers(this: Repository<UserEntity>) {
    return this.find();
  },

  createUser(this: Repository<UserEntity>, user) {
    return this.save(user);
  },
};