import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/helpers/public';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post(`login`)
  login(@Body() loginDto: LoginDto): Promise<{ token: string}>{
    return this.authService.login(loginDto);
  }
}
