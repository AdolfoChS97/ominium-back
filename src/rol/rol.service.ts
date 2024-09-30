import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './entities/rol.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ){}


  async create(createRolDto: CreateRolDto) {
    try {

      const rolExists = await this.rolRepository.findOneBy({
        rol: createRolDto.rol,
        deleted_at: null,
      });
      if (rolExists) {
        throw new BadRequestException('Rol already exists');
      }

      const rol = await this.rolRepository.save(createRolDto);
      return rol;

    } catch (error) {
      throw error;
    }
  }

  findAll() {
    try {
      const data = this.rolRepository.find({
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

 async update(id: number, updateRolDto: UpdateRolDto) {
    try {
      const { rol } = updateRolDto;
      const rolExists = await this.rolRepository.findOneBy({
        id,
        deleted_at: null,
      });
      if (!rolExists) {
        throw new BadRequestException('Rol not found');
      }

      const rolAlreadyExists = await this.rolRepository.findOneBy({
        rol,
        deleted_at: null,
        id: Not(id),
      });

      if (rolAlreadyExists) {
        throw new BadRequestException('Rol already exists');
      }

      return this.rolRepository.save({id , ...updateRolDto });

    } catch (error) { 
      throw error;
    }
  }

  remove(id: number) {
    try {
      const rol = this.rolRepository.findOneBy({ id, deleted_at: null });
      if (!rol) {
        throw new BadRequestException('Rol not found');
      }
      this.rolRepository.save({ ...rol, deleted_at: new Date() });
      return { 
        message: 'Rol deleted successfully',
       };
    } catch (error) {
      throw error;
    }
  }
}
