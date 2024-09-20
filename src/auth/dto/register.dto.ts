import { IsEmail, IsString, MinLength } from "class-validator";
import { Transform } from "class-transformer";

export class RegisterDto {

    @Transform(({value}) => value.trim())
    @IsString()
    name: string

    @Transform(({value}) => value.trim())
    @IsString()
    last_name: string

    @Transform(({value}) => value.trim())
    @IsString()
    phone_number: string

    @IsEmail()
    email: string

    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(6)
    user_name: string

    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(6)
    password: string
} 