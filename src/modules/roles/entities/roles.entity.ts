import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Users } from '../../users/entities/users.entity';
import { Permissions } from '../../permissions/entities/permissions.entity';
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
  @ApiProperty({
    example: '3f5b002c-cf32-425c-a60d-2dad6c9f8b7c',
    description: 'Unique identifier',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @OneToMany(() => Users, (user) => user.role, {})
  user: Users[];

  @OneToMany(() => Permissions, (permission) => permission.role)
  permissions: Permissions[];
}
