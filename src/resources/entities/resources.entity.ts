import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { IsFlexiblePath } from 'src/shared/decorators/is-flexible-path';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'Resources' })
export class Resources {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  id: number;

  @ApiProperty({ example: 'users', description: 'Resource name' })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim() && value.toLowerCase())
  @Column('varchar', { length: 50, nullable: false, unique: true })
  name: string;

  @ApiProperty({ example: '/users', description: 'Resource path' })
  @IsString()
  @IsNotEmpty()
  @IsFlexiblePath()
  @Transform(({ value }) => value.trim() && value.toLowerCase())
  @Column('varchar', {
    length: 50,
    nullable: false,
    unique: true,
    default: '/',
  })
  path: string;

  @ApiProperty({ example: 'UUID', description: 'Parent resource' })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @Column('varchar', { length: 50, nullable: true, default: null })
  parent: string;

  @ApiProperty({ example: 1, description: 'Resource order' })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  @Column('int', { nullable: true, default: null })
  order: number;

  @CreateDateColumn()
  @IsOptional()
  @IsDateString()
  created_at: Date;

  @UpdateDateColumn()
  @IsOptional()
  @IsDateString()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true, default: null })
  @IsOptional()
  @IsDateString()
  deleted_at: Date;
}
