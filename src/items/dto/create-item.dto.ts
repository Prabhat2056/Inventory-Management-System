import { IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateItemDto {
    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description? :string;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsNumber()
    @IsNotEmpty()
    discount: number;

}
   

