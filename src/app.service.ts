import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getStartMessage(): string {
    return 'Welcome to banana API! to see the API documentation go to <a href="/api">/api</a>'
  }
}
