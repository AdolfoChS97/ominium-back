import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'Users' })
export class User {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'John', description: 'Name of the user' })
  @IsString()
  @Transform(({ value }) => value.trim())
  @Column()
  name: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  @IsString()
  @Transform(({ value }) => value.trim())
  @Column()
  last_name: string;

  @ApiProperty({ example: '123456789', description: 'Phone number of the user' })
  @IsString()
  @Transform(({ value }) => value.trim())
  @Column()
  phone_number: string;

  @ApiProperty({ example: 'johndoe@gmail.com', description: 'User name' })
  @IsEmail()
  @Column()
  email: string;

  @ApiProperty({ example: 'username', description: 'Nickname of user' })
  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  @Column()
  user_name: string;

  @ApiProperty({ example: 'password', description: 'User password' })
  @IsString()
  @MinLength(8)
  @Transform(({ value }) => value.trim())
  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
