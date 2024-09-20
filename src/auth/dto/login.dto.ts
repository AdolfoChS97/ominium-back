import { IsString, MinLength } from "class-validator";
import { Transform } from "class-transformer";

export class LoginDto {
    
    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(6)
    user_name: string

    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(6)
    password: string
}