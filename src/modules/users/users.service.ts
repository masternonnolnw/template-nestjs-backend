import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import * as bcrypt from 'bcrypt'
import { AuthDto } from '../auth/dto/auth.dto'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async hashPassword(password: string) {
    const saltOrRounds = 10
    const passwordHash = await bcrypt.hash(password, saltOrRounds)
    return passwordHash
  }

  async create(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({
      data: {
        username: createUserDto.username,
        hashedPwd: await this.hashPassword(createUserDto.password),
      },
    })
  }

  async findAll() {
    return await this.prisma.user.findMany()
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    })
    if (!user) throw new NotFoundException(`User #${id} not found`)
    return user
  }

  async validateUser(loginDto: AuthDto) {
    const { username, password } = loginDto
    const user = await this.prisma.user.findUnique({
      where: { username },
    })
    if (!user) throw new NotFoundException('User not found')

    const isMatch = await bcrypt.compare(password, user.hashedPwd)
    if (!isMatch) throw new UnauthorizedException('Invalid credentials')
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    })
  }

  async remove(id: number) {
    return this.prisma.user.delete({ where: { id } })
  }
}
