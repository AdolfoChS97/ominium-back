import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRolDto } from '../dto/create-role.dto';
import { UpdateRolDto } from '../dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from '../entities/roles.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
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

      const rolUpdate = await this.rolesRepository.save({ id, ...updateRolDto });
      return {
        message: 'Rol updated successfully',
        data : await rolUpdate
      }
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
}
