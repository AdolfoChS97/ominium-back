import { ApiProperty } from '@nestjs/swagger';

export class ResourcesToPermissionDto {
  @ApiProperty({
    example: '3f5b002c-cf32-425c-a60d-2dad6c9f8b7c',
    description: 'Unique identifier UUID',
    name: 'rtp_id',
  })
  rtp_id: string;
  @ApiProperty({
    name: 'rtp_created_at',
    example: '2022-01-01T00:00:00.000Z',
    description: 'Created at',
  })
  rtp_created_at: string;
  @ApiProperty({
    name: 'rtp_updated_at',
    example: '2022-01-01T00:00:00.000Z',
    description: 'Updated at',
  })
  rtp_updated_at: string;
  @ApiProperty({
    name: 'rtp_deleted_at',
    example: '2022-01-01T00:00:00.000Z',
    description: 'Deleted at',
  })
  rtp_deleted_at: string;
  @ApiProperty({
    example: '3f5b002c-cf32-425c-a60d-2dad6c9f8b7c',
    description: 'Unique identifier resource UUID',
    name: 'resource_id',
  })
  resource_id: string;
  @ApiProperty({
    name: 'resource_name',
    example: 'users',
    description: 'Resource name',
  })
  resource_name: string;
  @ApiProperty({
    name: 'resource_route',
    example: '/users',
    description: 'Resource route',
  })
  resource_route: string;
  @ApiProperty({
    example: '3f5b002c-cf32-425c-a60d-2dad6c9f8b7c',
    description: 'Unique identifier permission UUID',
    name: 'permission_id',
  })
  permission_id: string;
  @ApiProperty({
    name: 'permission_name',
    example: 'users',
    description: 'Permission name',
  })
  permission_name: string;
  @ApiProperty({
    name: 'permission_execute',
    example: 'true',
    description: 'Permission execute',
  })
  permission_execute: string;
  @ApiProperty({
    name: 'permission_read',
    example: 'true',
    description: 'Permission read',
  })
  permission_read: string;
  @ApiProperty({
    name: 'permission_write',
    example: 'true',
    description: 'Permission write',
  })
  permission_write: string;
}
