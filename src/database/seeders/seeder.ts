import { Injectable } from '@nestjs/common';
import { RolesSeederService } from 'src/roles/services/roles.service.seeder';
import { errorHandler } from 'src/shared/utils/error-handler';
import { Logger } from '@nestjs/common';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly rolesSeederService: RolesSeederService,
  ) {}
  async seed() {
    try {
      this.logger.debug('Executing seeders...');
      await this.roles();
      this.logger.debug('Executed seeders...');
    } catch (e) {
      errorHandler(e);
    }
  }

  async roles() {
    const [createdRoles] = await Promise.allSettled([
      this.rolesSeederService.create(),
    ]);

    if (createdRoles.status === 'fulfilled') {
      this.logger.debug('No. of roles created : ' + createdRoles?.value);
    } else {
      this.logger.debug('Failed to create roles');
    }
  }
}
