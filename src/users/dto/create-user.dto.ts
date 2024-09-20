import { IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string

    @IsString()
    last_name: string

    @IsString()
    phone_number: string

    @IsString()
    email: string

    @IsString()
    user_name: string

    @IsString()
    password: string

}
