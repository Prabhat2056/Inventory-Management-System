import { IsArray, IsDate, IsNotEmpty, IsNumber } from "class-validator";

export class CreateSaleDto {
    @IsNotEmpty()
    @IsNumber()
    customer_id: number

    @IsNotEmpty()
    @IsDate()
    order_date: Date;

    @IsNotEmpty()
    @IsArray()
    items: {
        sale_id: number;
        item_id: number;
        quantity: number;
        price: number;
        discount: number;
        tax: number;
        sub_total?: number;
    }[];
}
