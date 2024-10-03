import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    {
    }
  }

  @ApiBody({
    type: RegisterDto,
    description: 'Register new user',
    required: true,
  })
  @Post('register')
  register(
    @Body()
    user: RegisterDto,
  ) {
    return this.authService.register(user);
  }

  @ApiBody({
    type: LoginDto,
    description: 'Login user',
    required: true,
  })
  @Post('login')
  login(
    @Body()
    credentials: LoginDto,
  ) {
    return this.authService.login(credentials);
  }
}
