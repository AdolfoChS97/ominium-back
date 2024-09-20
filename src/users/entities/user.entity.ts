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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  @Column()
  name: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  @Column()
  last_name: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  @Column()
  phone_number: string;

  @IsEmail()
  @Column()
  email: string;

  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  @Column()
  user_name: string;

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
