import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import { UserRegisterRequest } from "../request/user.register.request";

export interface UserRepository extends Repository<UserEntity> {
  this: Repository<UserEntity>;
  getUsers(): Promise<UserEntity[]>;
  getUser(id: number): Promise<UserEntity>;
  createUser(user: UserRegisterRequest);
}