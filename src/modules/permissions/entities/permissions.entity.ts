import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Resources } from 'src/modules/resources/entities/resources.entity';
import { Roles } from 'src/modules/roles/entities/roles.entity';
import { IPermission } from '../interfaces/permission.interface';

@Entity({ name: 'permissions' })
export class Permissions implements IPermission {
  @ApiProperty({ example: 'UUID', description: 'Unique identifier' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Permission Name', description: 'Permission name' })
  @IsString()
  @Transform(({ value }) => value.trim())
  @Column('varchar', { length: 50, nullable: false })
  name: string;

  @ApiProperty({
    example: 'Permission description',
    description: 'Permission description',
  })
  @IsString()
  @Transform(({ value }) => value.trim())
  @Column('varchar', { length: 50, nullable: true, default: 'N/A' })
  description: string;

  @ApiProperty({ example: 'true', description: 'Permission execute' })
  @IsBoolean()
  @IsOptional()
  @Column('boolean', { default: false })
  execute?: boolean;

  @ApiProperty({ example: 'true', description: 'Permission read' })
  @IsBoolean()
  @IsOptional()
  @Column('boolean', { default: false })
  read?: boolean;

  @ApiProperty({ example: 'true', description: 'Permission write' })
  @IsBoolean()
  @IsOptional()
  @Column('boolean', { default: false })
  write?: boolean;

  @OneToMany(() => Resources, (resource) => resource.permission)
  resources: Resources[];

  @ManyToOne(() => Roles, (role) => role.permissions)
  role: Roles;
}
