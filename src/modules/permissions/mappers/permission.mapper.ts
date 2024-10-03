import { Permissions } from '../entities/permissions.entity';
import { InternalServerErrorException } from '@nestjs/common';

export const PermissionMapper = (data: Permissions, message?: string) => {
  try {
    const permission = {
      id: data.id,
      name: data.name,
      description: data.description,
      execute: data.execute,
      read: data.read,
      write: data.write,
    };
    return {
      data: permission,
      message: message ?? 'Permission mapped successfully',
    };
  } catch (e) {
    console.log(e);
    throw new InternalServerErrorException('Error mapping permission', {
      cause: e,
    });
  }
};
