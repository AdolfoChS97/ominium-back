import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import { Not } from 'typeorm';
import { PaginationQueryParamsDto } from 'src/shared/dtos/paginatio.dto';
import { Rol } from 'src/rol/entities/rol.entity';


@Injectable()
export class UsersService {
  fields = {
    id: true,
    user_name: true,
    name: true,
    last_name: true,
    phone_number: true,
    email: true,
    created_at: true,
    updated_at: true,
    deleted_at: true,
    rol: true,
  };

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Rol)
    private rolRepository: Repository<Rol>,
    
  ) { }

  async create(createUserDto: CreateUserDto) {
    const { user_name, email ,rol} = createUserDto;

    const userNameExists = await this.usersRepository.findOneBy({
      user_name,
      deleted_at: null,
    });

    const emailExists = await this.usersRepository.findOneBy({
      email,
      deleted_at: null,
    });
 

    const rolExists = await this.rolRepository.findOneBy({
      id: rol,
      deleted_at: null,
    });

    if (!rolExists) {
      throw new BadRequestException('Rol not found');
    }

    if (userNameExists) {
      throw new BadRequestException('user name already exists');
    }

    if (emailExists) {
      throw new BadRequestException('email already exists');
    }

    createUserDto.password = await bcryptjs.hash(createUserDto.password, 10);

    return {
      message: 'user created successfully',
      data : await this.usersRepository.save(createUserDto)
    };
  }

  async findAll({ pageNumber, pageSize, sort }: PaginationQueryParamsDto) {
    try {
      const data = await this.usersRepository.findAndCount({
        where: { deleted_at: null },
        select: this.fields,
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        order: {
          created_at: sort || 'DESC',
        },
      });
      return {
        data: data[0],
        total: data[1],
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {

      const user = await this.usersRepository.find({
        where: {
          id: id,
          deleted_at: null
        },
        select: this.fields
      });
      if (!user) {
        throw new BadRequestException('user not found');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  findOneByUserName(username: string) {
    return this.usersRepository.findOneBy({
      user_name: username,
      deleted_at: null,
    });
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOneBy({ email: email });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const { user_name, email } = updateUserDto;

      const user = await this.usersRepository.findOneBy({ id, deleted_at: null });

      const userNameExists = await this.usersRepository.findOneBy({
        user_name,
        deleted_at: null,
        id: Not(id),
      });

      const emailExists = await this.usersRepository.findOneBy({
        email,
        deleted_at: null,
        id: Not(id),
      });


      const rolExists = await this.rolRepository.findOneBy({
        id: updateUserDto.rol,
        deleted_at: null,
      });

      if (!rolExists) {
        throw new BadRequestException('Rol not found');
      }

      if (userNameExists) {
        throw new BadRequestException('user name already exists');
      }

      if (emailExists) {
        throw new BadRequestException('email already exists');
      }

      if (!user) {
        throw new BadRequestException('user not found');
      } else {
        updateUserDto.password = await bcryptjs.hash(updateUserDto.password, 10);

        const updatedUser = this.usersRepository.save({ ...user, ...updateUserDto } );
        console.log(await updatedUser);

        return {
          message: 'user updated successfully',
          data: {
            name: (await updatedUser).name,
            last_name: (await updatedUser).last_name,
            phone_number: (await updatedUser).phone_number,
            email: (await updatedUser).email,
            user_name: (await updatedUser).user_name,
            rol : (await updatedUser).rol
          }
           
          
        };
      }
    } catch (error) {
      throw error
    }
  }

  remove(id: string) {
    const user = this.usersRepository.findOneBy({ id, deleted_at: null });
    if (!user) {
      throw new BadRequestException('user not found');
    }
    this.usersRepository.save({ ...user, deleted_at: new Date() });

    return {
      message: 'user deleted successfully',
    };
  }
}
