import { ArgumentsHost, Catch, HttpStatus, Logger } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { Prisma } from '@prisma/client'
import { Response } from 'express'

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    let errorCode = HttpStatus.AMBIGUOUS
    switch (exception.code) {
      case 'P2000':
        errorCode = HttpStatus.BAD_REQUEST
        break
      case 'P2002':
        errorCode = HttpStatus.CONFLICT
        break
      case 'P2025':
        errorCode = HttpStatus.NOT_FOUND
        break
      default:
        errorCode = HttpStatus.AMBIGUOUS
        break
    }
    Logger.error(`PrismaClientExceptionFilter: ${exception.code} ${exception}`)
    return response.status(errorCode).json({
      code: exception.code,
      message: exception.meta?.cause ?? '',
    })
  }
}
