import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCustomerDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    email?: string;

    @IsNotEmpty()
    @IsNumber()
    phone?: number;

    @IsNotEmpty()
    @IsString()
    street_address?: string;

    @IsNotEmpty()
    @IsString()
    city?: string;

    @IsNotEmpty()
    @IsString()
    province?: string;

    @IsNotEmpty()
    @IsNumber()
    zip_code?: number;

    @IsNotEmpty()
    @IsBoolean()
    is_vendor?: boolean;

    






}
