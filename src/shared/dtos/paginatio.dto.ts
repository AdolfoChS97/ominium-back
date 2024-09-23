
import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, IsEnum, IsString } from "class-validator";

export enum Order {
    ASC = "ASC",
    DESC = "DESC",
}



export class PaginationQueryParamsDto {
    @Transform(({ value }) => Number(value))
    @IsNumber()
    @IsPositive()
    pageNumber: number;

    @Transform(({ value }) => Number(value))
    @IsNumber()
    @IsPositive()
    pageSize: number;
    
    @IsOptional()
    @IsEnum(Order)
    sortOrder?: Order;

}

