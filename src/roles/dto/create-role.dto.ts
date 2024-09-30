import { OmitType } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";
import { Rol } from "../entities/roles.entity";

export class CreateRolDto extends OmitType (Rol, [
    'id',
    'created_at',
    'updated_at',
    'deleted_at',
    'user',
]) {}
