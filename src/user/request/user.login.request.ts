import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserLoginRequest{
  @IsNotEmpty()
  @ApiProperty({default:"haider@gmail.com"})
  email: string;

  @IsNotEmpty()
  @ApiProperty({default:"haider", type:'password'})
  password: string;

}