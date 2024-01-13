import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserRegisterRequest{
  @IsNotEmpty()
  @ApiProperty({default:"Haider Fadel"})
  name: string;

  @IsNotEmpty()
  @ApiProperty({default:"haider@gmail.com"})
  email: string;

  @IsNotEmpty()
  @ApiProperty({default:"haider", type:'password'})
  password: string;

}