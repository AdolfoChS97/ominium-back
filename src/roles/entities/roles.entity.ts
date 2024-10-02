import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

import {
  Column,
  CreateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Entity,
  DeleteDateColumn,
} from 'typeorm';
import { IRole } from '../interfaces/role.interface';

@Entity({ name: 'Roles' })
export class Roles implements IRole {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'user', description: 'Role' })
  @IsString()
  @Column('varchar', { length: 50, nullable: false, unique: true })
  name: string;

  @ApiProperty({ example: 'user', description: 'Description of rol' })
  @IsString()
  @IsOptional()
  @Column('varchar', { length: 50, nullable: true, default: 'N/A' })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true, default: null })
  deleted_at: Date;

  @OneToMany(() => User, (user) => user.rol, {})
  user: User[];
}
