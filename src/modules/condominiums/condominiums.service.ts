import { Injectable } from '@nestjs/common';
import { CreateCondominiumDto } from './dto/create-condominium.dto';
import { UpdateCondominiumDto } from './dto/update-condominium.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Condominium } from './entities/condominium.entity';
import { Repository } from 'typeorm';
import { PaginationQueryParamsDto } from 'src/shared/dtos/pagination.dto';

@Injectable()
export class CondominiumsService {
  constructor(
    @InjectRepository(Condominium)
    private readonly condominiumsRepository: Repository<Condominium>,
  ) {}

  async create(createCondominiumDto: CreateCondominiumDto) {
    try {
      const condominium =
        this.condominiumsRepository.create(createCondominiumDto);
      await this.condominiumsRepository.save(condominium);
      return condominium;
    } catch (error) {
      throw error;
    }
  }

  async findAll({ pageNumber, pageSize, sort }: PaginationQueryParamsDto) {
    try {
      // const data = await this.condominiumsRepository.find({
      //   skip: (pageNumber - 1) * pageSize,
      //   take: pageSize,
      //   order: { created_at: sort || 'DESC' },
      // })
      const data = await this.condominiumsRepository.find({
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        order: { created_at: sort || 'DESC' },
        where: { deleted_at: null },
      });

      return {
        data: data,
        total: data.length,
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const condominiumId = await this.condominiumsRepository.findOneBy({
        id: id,
        deleted_at: null,
      });

      if (!condominiumId) {
        throw new Error('condominium not found');
      }

      return condominiumId;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateCondominiumDto: UpdateCondominiumDto) {
    try {
      const condominium = await this.condominiumsRepository.findOneBy({
        id,
        deleted_at: null,
      });

      if (!condominium) {
        throw new Error('condominium not found');
      }

      return {
        message: 'Condominium updated successfully',
        data: await this.condominiumsRepository.save({
          ...condominium,
          ...updateCondominiumDto,
        }),
      };
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const condominium = await this.condominiumsRepository.findOneBy({
        id,
        deleted_at: null,
      });

      if (!condominium) {
        throw new Error('condominium not found');
      }

      await this.condominiumsRepository.save({
        ...condominium,
        deleted_at: new Date(),
      });

      return {
        message: 'Condominium deleted successfully',
      };
    } catch (error) {
      throw error;
    }
  }
}
