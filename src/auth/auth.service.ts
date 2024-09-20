import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { user_name, email } = registerDto;

    const userNameExists = await this.usersService.findOneByUserName(user_name);

    const emailExists = await this.usersService.findOneByEmail(email);

    if (userNameExists) {
      throw new BadRequestException('user name already exists');
    }
    if (emailExists) {
      throw new BadRequestException('email already exists');
    }

    return await this.usersService.create(registerDto);
  }

  async login({ user_name, password }: LoginDto) {
    const user = await this.usersService.findOneByUserName(user_name);

    if (!user) {
      throw new UnauthorizedException('user not found');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('invalid password');
    }

    const payload = {
      user_name: user.user_name,
    };

    const token = await this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET_KEY'),
      expiresIn: this.configService.get('JWT_TIME_EXPI'),
    });

    return { token, user_name };
  }
}
