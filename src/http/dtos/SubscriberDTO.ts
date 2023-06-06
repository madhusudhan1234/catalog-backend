import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class SubscriberDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(200)
  email: string;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  message: string;
}
