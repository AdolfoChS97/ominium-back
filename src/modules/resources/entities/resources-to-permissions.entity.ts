import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Resources } from './resources.entity';
import { Permissions } from '../../permissions/entities/permissions.entity';

@Entity({ name: 'Resources_to_Permissions' })
export class ResourcesToPermissions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'uuid',
    name: 'resourceId',
    nullable: false,
    unique: false,
  })
  @ManyToOne(() => Resources, (resource) => resource.resourcesToPermissions)
  resourceId: Resources | string;

  @Column({
    type: 'uuid',
    name: 'permissionId',
    nullable: false,
    unique: false,
  })
  @ManyToOne(
    () => Permissions,
    (permission) => permission.resourcesToPermissions,
  )
  permissionId: Permissions | string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  @DeleteDateColumn({ nullable: true, default: null })
  deleted_at: Date;
}
