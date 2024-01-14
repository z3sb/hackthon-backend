import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class VideoUploadRequestJosn {
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @ApiProperty()
  description: string;

  image: File;
}

export class VideoUploadREquestFiles {
  @IsNotEmpty()
  @ApiProperty()
  image: Express.Multer.File;

  @IsNotEmpty()
  @ApiProperty()
  video: Express.Multer.File;
}
