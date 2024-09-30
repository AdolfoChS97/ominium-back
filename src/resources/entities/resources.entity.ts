import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
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
