import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Roles } from 'src/modules/roles/entities/roles.entity';
import { IsEmail, IsNumber, IsString, MinLength } from 'class-validator';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'Users' })
export class Users {
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

  @ApiProperty({ example: '3f5b002c-cf32-425c-a60d-2dad6c9f8b7c', description: 'User rol' })
  @IsNumber()
  @JoinColumn({ name: 'role' })
  @ManyToOne(() => Roles, (role) => role.user, {
    eager: true,
  })
  role: Roles | string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true, default: null })
  deleted_at: Date;
}
