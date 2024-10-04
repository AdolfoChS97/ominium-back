import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserPasswordDto } from './dto/update-userPassword';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import { PaginationQueryParamsDto } from 'src/shared/dtos/pagination.dto';
import { Roles } from 'src/modules/roles/entities/roles.entity';
import { UserMapper } from './mappers';

@Injectable()
export class UsersService {
  public USER: string = 'user';
  public fields = {
    id: true,
    user_name: true,
    name: true,
    last_name: true,
    phone_number: true,
    email: true,
    created_at: true,
    updated_at: true,
    deleted_at: true,
    rol: {
      id: true,
      name: true,
    },
  };

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>,
  ) {}

  async userNameOrEmailExists(
    user_name: string,
    email: string,
    id: string = '',
    itself: boolean = false,
  ) {
    try {
      let query = this.usersRepository
        .createQueryBuilder('user')
        .select(['user.user_name', 'user.email'])
        .where('user.user_name = :user_name', { user_name })
        .andWhere('user.email = :email', { email });

      if (itself) {
        query = query.andWhere('user.id != :id', { id });
      }

      const previousRecord = await query.getOne();
      return previousRecord;
    } catch (error) {
      throw error;
    }
  }

  async create(createUserDto: CreateUserDto) {
    const { user_name, email, role } = createUserDto;

    if ((await this.userNameOrEmailExists(user_name, email)) !== null) {
      throw new BadRequestException('user name or email already exists');
    }

    const rolExists = await this.rolesRepository.findOneBy({
      id: role,
      deleted_at: null,
    });


    if (!rolExists) {
      throw new BadRequestException('Rol not found');
    }

    createUserDto.password = await bcryptjs.hash(createUserDto.password, 10);

    return {
      message: 'user created successfully',
      data: UserMapper(
        await this.usersRepository.save({
          ...createUserDto,
          role: rolExists.id,
        }),
      ),
    };
    
  }

  async findAll({ pageNumber, pageSize, sort }: PaginationQueryParamsDto) {
    try {
      const query = this.usersRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.role', 'roles')
        .select([
          'user.id',
          'user.name',
          'user.last_name',
          'user.user_name',
          'user.email',
          'user.created_at',
          'user.updated_at',
          'roles.id',
          'roles.name',
        ])
        .where('user.deleted_at IS NULL')
        .orderBy('user.created_at', sort || 'DESC')
        .skip((pageNumber - 1) * pageSize)
        .take(pageSize);

      const [data, total] = await query.getManyAndCount();

      return {
        data: data,
        total: total,
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const userQuery = this.usersRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.role', 'roles')
        .select([
          'user.id',
          'user.name',
          'user.last_name',
          'user.user_name',
          'user.email',
          'user.created_at',
          'user.updated_at',
          'roles.id',
          'roles.name',
        ])
        .where('user.id = :id', { id })
        .andWhere('user.deleted_at IS NULL');

      const user = await userQuery.getOne();

      if (!user) {
        throw new BadRequestException('user not found');
      }
      return UserMapper(user);
    } catch (error) {
      throw error;
    }
  }
  async findOneByUserName(user_name: string, withPassword = false) {
    return await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role') // Usamos leftJoinAndSelect para obtener automáticamente los datos relacionados
      .select([
        'user.id', // Lista explícita de columnas
        'user.name',
        'user.last_name',
        'user.user_name',
        'user.email',
        'user.created_at',
        'user.updated_at',
        'role.id', // Selección de las columnas de la tabla roles
        'role.name',
        withPassword ? 'user.password' : '',
      ])
      .where('user.user_name = :user_name', { user_name })
      .andWhere('user.deleted_at IS NULL')
      .getOne();
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOneBy({ email: email });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const { user_name, email, rol_id } = updateUserDto;

      const user = await this.usersRepository.findOneBy({
        id,
        deleted_at: null,
      });

      if (!user) {
        throw new BadRequestException('user not found');
      }

      if (
        (await this.userNameOrEmailExists(user_name, email, id, true)) !== null
      ) {
        throw new BadRequestException('user name or email already exists');
      }

      const rolExists = await this.rolesRepository.findOneBy({
        id: updateUserDto.rol_id,
        deleted_at: null,
      });

      // if (!rolExists) {
      //   throw new BadRequestException('Rol not found');
      // }

      const updatedUser = await this.usersRepository.save({
        ...user,
        ...updateUserDto,
        rol: rol_id,
      });

      return {
        message: 'user updated successfully',
        data: await UserMapper(updatedUser),
      };
    } catch (error) {
      throw error;
    }
  }

  async updatePassword(
    id: string,
    UpdateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    try {
      const user = await this.usersRepository.findOneBy({
        id,
        deleted_at: null,
      });
      if (!user) {
        throw new BadRequestException('user not found');
      }

      const { password } = UpdateUserPasswordDto;

      user.password = await bcryptjs.hash(password, 10);

      await this.usersRepository.save(user);

      return {
        message: 'user updated successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOneBy({ id, deleted_at: null });
    if (!user) {
      throw new BadRequestException('user not found');
    }

  
    await this.usersRepository.save({ ...user, deleted_at: new Date() });

    return {
      message: 'user deleted successfully',
    };
  }
}
