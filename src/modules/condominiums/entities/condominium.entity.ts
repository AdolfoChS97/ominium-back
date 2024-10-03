import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'Condominiums' })
export class Condominium {
  @ApiProperty({
    example: '9d632208-993a-403b-a947-a88393b70187',
    description: 'Unique identifier',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Condominium Name', description: 'Condominium name' })
  @IsString()
  @Transform(({ value }) => value.trim())
  @Column('varchar', { length: 50, nullable: false })
  name: string;

  @ApiProperty({
    example: 'Condominium Description',
    description: 'Condominium description',
  })
  @IsString()
  @Transform(({ value }) => value.trim())
  @Column('varchar', { length: 50, nullable: false })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true, default: null })
  deleted_at: Date;
}
