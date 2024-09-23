import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import { Not } from 'typeorm';
import { FindManyOptions } from 'typeorm';
import { PaginationQueryParamsDto } from 'src/shared/dtos/paginatio.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {

    const { user_name, email } = createUserDto;

    const userNameExists = await this.usersRepository.findOneBy({ user_name, deleted_at: null });

    const emailExists = await this.usersRepository.findOneBy({ email, deleted_at: null });

    if (userNameExists) {
      throw new BadRequestException('user name already exists');
    }

    if (emailExists) {
      throw new BadRequestException('email already exists');
    }

    createUserDto.password = await bcryptjs.hash(createUserDto.password, 10);
    return this.usersRepository.save(createUserDto);

  }

  async findAll({pageNumber, pageSize, sortOrder }: PaginationQueryParamsDto) {
    try {
      const data = await this .usersRepository.findAndCount({
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        order: {
          created_at: sortOrder || 'DESC',
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
    const condition : FindManyOptions<User>[] = [
      { where: { id, deleted_at: null } },
      { select: ['id' , 'user_name', 'name', 'last_name', 'phone_number', 'email'] },
    ];

    const user = await this.usersRepository.find(condition[0]);
    if (!user) {
      throw new BadRequestException('user not found');
    }
    return user;
    
  }

  
  findOneByUserName(username: string) {
    return this.usersRepository.findOneBy({ user_name: username, deleted_at: null });
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOneBy({ email: email });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {

    const { user_name, email } = updateUserDto;

    const user = await this.usersRepository.findOneBy({ id, deleted_at: null });
    
    const userNameExists = await this.usersRepository.findOneBy({ user_name, deleted_at: null , id: Not(id)});

    const emailExists = await this.usersRepository.findOneBy({ email, deleted_at: null , id: Not(id)});

    if (userNameExists) {
      throw new BadRequestException('user name already exists');
    }

    if (emailExists) {
      throw new BadRequestException('email already exists');
    }

    if(!user){
      throw new BadRequestException('user not found');
    }else{


      updateUserDto.password = await bcryptjs.hash(updateUserDto.password, 10);
      return this.usersRepository.save({ ...user, ...updateUserDto });
    }
  }

  remove(id: string) {
    const user = this.usersRepository.findOneBy({ id, deleted_at: null });
    if(!user){
      throw new BadRequestException('user not found');
    }
    return this.usersRepository.save({ ...user, deleted_at: new Date() });
  }
}
