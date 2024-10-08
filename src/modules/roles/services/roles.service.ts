import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRolDto } from '../dto/create-role.dto';
import { UpdateRolDto } from '../dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from '../entities/roles.entity';
import { Not, Repository } from 'typeorm';
import { errorHandler } from 'src/shared/utils/error-handler';
import { PermissionsService } from 'src/modules/permissions/services/permissions.service';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
    private readonly permissionService: PermissionsService,
  ) {}

  async create(createRolDto: CreateRolDto) {
    try {
      const rolExists = await this.rolesRepository.findOneBy({
        name: createRolDto.name,
        deleted_at: null,
      });
      if (rolExists) {
        throw new BadRequestException('Rol already exists');
      }

      const rol = await this.rolesRepository.save(createRolDto);
      return rol;
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    try {
      const data = this.rolesRepository.find({
        where: { deleted_at: null },
      });

      return data;
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} rol`;
  }

  async update(id: string, updateRolDto: UpdateRolDto) {
    try {
      const { rol } = updateRolDto;
      const rolExists = await this.rolesRepository.findOneBy({
        id,
        deleted_at: null,
      });
      if (!rolExists) {
        throw new BadRequestException('Rol not found');
      }

      const rolAlreadyExists = await this.rolesRepository.findOneBy({
        name: rol,
        deleted_at: null,
        id: Not(id),
      });

      if (rolAlreadyExists) {
        throw new BadRequestException('Rol already exists');
      }

      const rolUpdate = await this.rolesRepository.save({
        id,
        ...updateRolDto,
      });
      return {
        message: 'Rol updated successfully',
        data: await rolUpdate,
      };
    } catch (error) {
      throw error;
    }
  }

  remove(id: string) {
    try {
      const rol = this.rolesRepository.findOneBy({ id, deleted_at: null });
      if (!rol) {
        throw new BadRequestException('Rol not found');
      }
      this.rolesRepository.save({ ...rol, deleted_at: new Date() });
      return {
        message: 'Rol deleted successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  async getOneBy(param: 'name' | 'id', value: string) {
    try {
      const p = await this.rolesRepository
        .createQueryBuilder('roles')
        .where(`roles.${param} = :${param}`, { [param]: value })
        .getOne();
      return p;
    } catch (e) {
      errorHandler(e);
    }
  }

  async assign(id: string, permissionId: string) {
    try {
      const r = await this.getOneBy('id', id);
      const p = await this.permissionService.getOneBy('id', permissionId);
      if (!r || !p)
        throw new BadRequestException(
          'We couldnt find the role or permission you are trying to assign',
        );

      return await this.permissionService.addRole(p.id, r.id);
    } catch (e) {
      errorHandler(e);
    }
  }

  async assignPermissionToRole(id: string, permissionId: string) {
    try {
      // const [p, r] = await (
      //   await Promise.allSettled([
      //     await this.permissionService.getOneBy('id', permissionId),
      //     await this.getOneBy('id', id),
      //   ])
      // ).map((p: PromiseSettledResult<Awaited<any>>) => {
      //   const { status } = p;
      //   if (status === 'fulfilled') return p?.value;
      //   return null;
      // }, []);
      console.log(id, permissionId);
    } catch (e) {
      errorHandler(e);
    }
  }
}
