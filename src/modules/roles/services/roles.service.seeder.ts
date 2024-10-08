import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles as RolesEntity } from '../entities/roles.entity';
import { Repository } from 'typeorm';
import { roles } from 'src/database/seeders/data/roles';
import { errorHandler } from 'src/shared/utils/error-handler';

@Injectable()
export class RolesSeederService {
  constructor(
    @InjectRepository(RolesEntity)
    private readonly rolesRepository: Repository<RolesEntity>,
  ) {}

  async create() {
    try {
      const r = await roles.map(async (role) => {
        await this.rolesRepository.findOne({
          where: { name: role.name },
        });
      }, []);
      const results = await Promise.allSettled(r);
      const p = results.map(async (result, index) => {
        if (result.status !== 'rejected') {
          return await this.rolesRepository.save({ name: roles[index].name });
        }
        return;
      }, []);
      const qty = await Promise.allSettled(p);
      return qty.filter((result) => result.status == 'fulfilled').length;
    } catch (e) {
      errorHandler(e);
    }
  }
}
