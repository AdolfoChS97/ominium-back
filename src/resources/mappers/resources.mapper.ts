import { InternalServerErrorException } from '@nestjs/common';
import { Resources } from '../entities/resources.entity';

export const ResourceMapper = (data: Resources, message?: string) => {
  try {
    const resource = {
      id: data.id,
      name: data.name,
      created_at: data.created_at,
      updated_at: data.updated_at,
      deleted_at: data.deleted_at,
    };
    return {
      resource: resource,
      message: message ?? 'Resource mapped successfully',
    };
  } catch (e) {
    throw new InternalServerErrorException('Error mapping resource', {
      cause: e,
    });
  }
};
