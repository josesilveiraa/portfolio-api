import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl, Length } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(5, 100)
  title: string;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  repository: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  readme: string;
}
