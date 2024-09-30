import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Rol } from 'src/rol/entities/rol.entity';
import { IsEmail, IsNumber, isNumber, IsString, MinLength } from 'class-validator';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumnOptions,
  SelectQueryBuilder
  
} from 'typeorm';


@Entity({ name: 'Users' })
export class User {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'John', description: 'Name of the user' })
  @IsString()
  @Transform(({ value }) => value.trim())
  @Column('varchar', { length: 25, nullable: false })
  name: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  @IsString()
  @Transform(({ value }) => value.trim())
  @Column('varchar', { length: 20, nullable: false })
  last_name: string;

  @ApiProperty({
    example: '5812345678',
    description: 'Phone number of the user',
  })
  @IsString()
  @Transform(({ value }) => value.trim())
  @Column('varchar', { length: 15, nullable: false })
  phone_number: string;

  @ApiProperty({ example: 'johndoe@gmail.com', description: 'User name' })
  @IsEmail()
  @Column('varchar', { unique: true, nullable: false, length: 50 })
  email: string;

  @ApiProperty({ example: 'username', description: 'Nickname of user' })
  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  @Column('varchar', { unique: true, nullable: false, length: 30 })
  user_name: string;

  @ApiProperty({ example: 'password', description: 'User password' })
  @IsString()
  @MinLength(8)
  @Transform(({ value }) => value.trim())
  @Column({ nullable: false })
  password: string;

  @ApiProperty({ example: '1', description: 'User rol' })
  @IsNumber()
  @JoinColumn({ name: 'rol' })
  @ManyToOne(() => Rol, (rol) => rol.user, {
    eager: true
  })
  rol: Rol | number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn( { nullable: true  , default: null } )
  deleted_at: Date;


}