import { Body, Controller, Get, HttpStatus, Post, Req, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserRegisterRequest } from "./request/user.register.request";
import { UserService } from "./user.service";
import { ApiBody, ApiCookieAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserLoginRequest } from "./request/user.login.request";
import { Request, Response } from "express";
import { UserDto } from "./dto/user.dto";


@ApiTags('User Operations')
@ApiCookieAuth()
@Controller('user')
export class UserController {

  constructor(private readonly service: UserService) {
  }

  @Post('register')
  @ApiResponse({status: HttpStatus.CREATED})
  @UsePipes(ValidationPipe)
  @ApiBody({
    description: 'Register New User',
    type: UserRegisterRequest,
  })
  async registerUser(@Body() request: UserRegisterRequest): Promise<void>{
    await this.service.registerUser(request)
  }

  @Post("login")
  @ApiResponse({status: HttpStatus.OK})
  @UsePipes(ValidationPipe)
  @ApiBody({
    description: "User Login",
    type: UserLoginRequest
    }
  )
  async loginUser(
    @Body() request: UserLoginRequest,
    @Res({passthrough: true}) response: Response,
  ): Promise<void>{
    await this.service.loginUser(request, response);
  }


  @Get()
  @ApiResponse({status: HttpStatus.OK})
  async getUserData(@Req() request: Request): Promise<UserDto>{
    return await this.service.getUserData(request)
  }

  @Post("logout")
  @ApiResponse({status: HttpStatus.OK})
  async logout(@Res({passthrough: true}) response: Response ){
    await this.service.logoutUser(response)
  }

}
