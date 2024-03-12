import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { UserEntity } from '../users/entities/user.entity'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { AuthDto } from './dto/auth.dto'
import { AuthEntity } from './entity/auth.entity'
import { AuthGuard } from './guard/auth.guard'
import { Roles } from './guard/roles.decorator'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseGuards(AuthGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity })
  async register(@Body() createUserDto: CreateUserDto) {
    return new UserEntity(await this.authService.register(createUserDto))
  }

  @Post('login')
  @ApiCreatedResponse({ type: AuthEntity })
  async login(@Body() loginDto: AuthDto) {
    return new AuthEntity(await this.authService.login(loginDto))
  }

  @Get('me')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async me(@Request() req) {
    return new UserEntity(req.user)
  }
}
