import { ResourcesToPermissionDto } from '../dtos/resources-to-permission.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { IResourcesToPermission } from '../interfaces/permission.interface';

export const ResourcesToPermissionMapper = async (
  data: ResourcesToPermissionDto[] | null | undefined,
): Promise<IResourcesToPermission[] | null | undefined> => {
  try {
    if (!data) return;
    const map = data?.reduce((acc: ResourcesToPermissionDto, d) => {
      if (!acc[d.permission_id]) {
        acc[d.permission_id] = {
          id: d.rtp_id,
          created_at: d.rtp_created_at,
          updated_at: d.rtp_updated_at,
          deleted_at: d.rtp_deleted_at,
          resources: [],
          permission: {
            name: d.permission_name,
            execute: d.permission_execute,
            write: d.permission_write,
            read: d.permission_read,
          },
        };

        if (d.resource_id && d.resource_name && d.resource_route) {
          acc[d.permission_id]?.resources?.push({
            id: d.resource_id,
            name: d.resource_name,
            route: d.resource_route,
          });
        }
      } else {
        acc[d.permission_id].resources?.push({
          id: d.resource_id,
          name: d.resource_name,
          route: d.resource_route,
        });
      }
      return acc;
    }, {} as any);
    return map;
  } catch (e) {
    throw new InternalServerErrorException('Error mapping resource', {
      cause: e,
    });
  }
};
