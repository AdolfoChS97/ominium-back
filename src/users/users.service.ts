import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import { Not } from 'typeorm';

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

  async findAll() {

    const users = await this.usersRepository.find({
      where: { deleted_at: null },
    })
    if(!users){
      throw new BadRequestException('users no registers');
    }

    return users
  }


  async findOne(id: string) {

    const user = await this.usersRepository.findOneBy({ id, deleted_at: null });
    
    if(!user){
      throw new BadRequestException('user not found');
    }
    return user
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
