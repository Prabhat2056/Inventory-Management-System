import { IsBoolean, isNotEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCustomerDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsOptional()
    @IsNumber()
    phone?: number;

    @IsOptional()
    @IsString()
    street_address?: string;

    @IsOptional()
    @IsString()
    city?: string;

    @IsOptional()
    @IsString()
    province?: string;

    @IsOptional()
    @IsNumber()
    zip_code?: number;

    @IsNotEmpty()
    @IsBoolean()
    is_vendor: boolean;

    






}
