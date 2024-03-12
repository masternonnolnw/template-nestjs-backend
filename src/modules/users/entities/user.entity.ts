import { ApiProperty } from '@nestjs/swagger'
import { Role, User } from '@prisma/client'

export class UserEntity implements Partial<User> {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the user.',
  })
  id: number

  @ApiProperty({
    example: 'john_doe',
    description: 'The username of the user.',
    uniqueItems: true,
  })
  username: string

  @ApiProperty({
    example: 'USER',
    description: 'The role of the user.',
    type: 'enum',
  })
  role: Role

  constructor(partial: Partial<UserEntity>) {
    const allowedKeys = ['id', 'username', 'role']
    const userEntity = Object.keys(partial)
      .filter((key) => allowedKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = partial[key]
        return obj
      }, {})
    Object.assign(this, userEntity)
  }
}
