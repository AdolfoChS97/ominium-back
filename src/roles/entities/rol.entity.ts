import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { User } from "src/users/entities/user.entity";


import { Column, CreateDateColumn, OneToMany, PrimaryGeneratedColumn, Entity, DeleteDateColumn } from "typeorm";


@Entity({ name: 'Roles' })
export class Rol {
    @ApiProperty({ example: '1', description: 'Unique identifier' })
    @PrimaryGeneratedColumn()
    id: number;


    @ApiProperty({ example: 'user', description: 'Rol' })
    @IsString()
    @Column('varchar', { length: 50, nullable: false, unique: true ,  } )
    rol: string;


    @ApiProperty({ example: 'user', description: 'Description of rol' })
    @IsString()
    @Column('varchar', { length: 50, nullable: false })
    description: string;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

    @DeleteDateColumn( { nullable: true  , default: null } )
    deleted_at: Date;

    @OneToMany(() => User, (user) => user.rol,{})
    user: User[]
}
