import { ApiProperty } from '@nestjs/swagger'
import { UserEntity } from 'src/modules/users/entities/user.entity'

export class AuthEntity {
  @ApiProperty({ type: UserEntity })
  user: UserEntity

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    description: 'The token of the user',
  })
  token: string

  constructor(partial: Partial<AuthEntity>) {
    Object.assign(this, partial)
  }
}
