import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class ProductDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  price: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  subcategoryId: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  description: string;
}
