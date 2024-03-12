import { ApiProperty } from '@nestjs/swagger'
import { MinLength } from 'class-validator'

export class AuthDto {
  @MinLength(2)
  @ApiProperty({ example: 'john_doe', description: 'The username of the user' })
  username: string

  @MinLength(4)
  @ApiProperty({
    example: 'password',
    description: 'The password of the user',
  })
  password: string
}
