import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { AuthDto } from './dto/auth.dto'
import { UserEntity } from '../users/entities/user.entity'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './common/jwt-const'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async register(registerDto: CreateUserDto) {
    return await this.usersService.create(registerDto)
  }

  async login(loginDto: AuthDto) {
    const user = new UserEntity(await this.usersService.validateUser(loginDto))
    const payload: JwtPayload = { user: user }
    return {
      user: user,
      token: await this.jwtService.signAsync(payload),
    }
  }
}
