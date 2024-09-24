import { PartialType } from '@nestjs/swagger';
import { CreateRolDto } from './create-rol.dto';
import { IsString, MinLength } from 'class-validator';

export class UpdateRolDto extends PartialType(CreateRolDto) {

    @IsString()
    @MinLength(3)
    rol: string;

    @IsString()
    @MinLength(4)
    description: string;

    
}
