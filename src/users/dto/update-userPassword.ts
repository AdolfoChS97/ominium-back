import { OmitType } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";
import { User } from "../entities/user.entity";

export class UpdateUserPasswordDto extends OmitType(User ,[
    'id',
    'name',
    'last_name',
    'phone_number',
    'email',
    'created_at',
    'updated_at',
    'deleted_at',
    'rol',
    'user_name',
]){
    @IsString()
    @MinLength(8)
    password: string;
}