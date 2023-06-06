import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateImageDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  url: string;
}
