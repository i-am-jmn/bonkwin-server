import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  public title: string;

  @IsString()
  public description: string;

  @IsNumber()
  public price: number;
}
