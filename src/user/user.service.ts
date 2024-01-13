import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UserRegisterRequest } from "./request/user.register.request";
import { UserEntity } from "./dao/user.entity";
import * as bcrypt from 'bcrypt'
import { UserRepository } from "./dao/user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { UserLoginRequest } from "./request/user.login.request";
import { JwtService } from "@nestjs/jwt";
import { Request, Response } from "express";
import { jwtSecret } from "../../config/jwt.config";
import { UserDto } from "./dto/user.dto";

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: UserRepository,
    private  readonly jwtService: JwtService
  ) {}

  async registerUser(request: UserRegisterRequest): Promise<void>{

    const password = await bcrypt.hash(request.password, 12)


    await this.userRepository.save({
      name: request.name,
      email: request.email,
      password
    })
  }
  


  async loginUser(request: UserLoginRequest, response: Response): Promise<void>{

    const user = await this.userRepository.findOneByOrFail({email: request.email})

    if(!user){
      throw new BadRequestException("Invalid Credentials")
    }

    if(! await bcrypt.compare(request.password, user.password)){
      throw new BadRequestException("Invalid Credentials")
    }

    const jwt = await this.jwtService.signAsync({id: user.id}, {secret: jwtSecret})

    response.cookie("ACCESS_TOKEN", jwt, {httpOnly: false})

  }

  async getUserData(request: Request): Promise<UserDto>{

    const token = request.cookies['ACCESS_TOKEN'];

    const data = await this.jwtService.verifyAsync(token, {secret: jwtSecret});

    if(!data){
      throw new UnauthorizedException();
    }


    const user = await this.userRepository.findOneBy({id: data?.id})

    if(!user){
      throw new NotFoundException("User Not Found")
    }

    return new UserDto(
      user.id ,
      user?.email,
      user?.name,
    );
  }

  async logoutUser(response: Response){
    response.clearCookie("ACCESS_TOKEN")
  }

}
