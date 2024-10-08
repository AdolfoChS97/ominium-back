import { ResourcesToPermissionDto } from '../dtos/resources-to-permission.dto';
import { InternalServerErrorException } from '@nestjs/common';

export const ResourcesToPermissionMapper = async (
  data: ResourcesToPermissionDto[] | null | undefined,
) => {
  try {
    if (!data) return;
    const map = data?.reduce((acc, d) => {
      if (!acc[d.permission_id]) {
        acc[d.permission_id] = [];
        acc[d.permission_id].push(d);
      } else {
        acc[d.permission_id].push(d);
      }
      return acc;
    }, []);
    return map;
  } catch (e) {
    throw new InternalServerErrorException('Error mapping resource', {
      cause: e,
    });
  }
};
