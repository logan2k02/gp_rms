import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';

type ErrorCodesStatusMapping = {
  [key: string]: number;
};

@Catch(
  Prisma.PrismaClientKnownRequestError,
  Prisma.PrismaClientUnknownRequestError,
  Prisma.PrismaClientValidationError,
  Prisma.PrismaClientInitializationError,
)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  private errorCodesStatusMapping: ErrorCodesStatusMapping = {
    P2000: HttpStatus.BAD_REQUEST,
    P2002: HttpStatus.CONFLICT,
    P2025: HttpStatus.NOT_FOUND,
    P2022: HttpStatus.BAD_REQUEST,
  };

  catch(
    exception:
      | Prisma.PrismaClientKnownRequestError
      | Prisma.PrismaClientUnknownRequestError
      | Prisma.PrismaClientValidationError
      | Prisma.PrismaClientInitializationError,
    host: ArgumentsHost,
  ) {
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      const message = this.exceptionShortMessage(exception.message);
      if (!Object.keys(this.errorCodesStatusMapping).includes(exception.code)) {
        return super.catch(exception, host);
      }
      const statusCode = this.errorCodesStatusMapping[exception.code];
      super.catch(new HttpException({ statusCode, message }, statusCode), host);
    } else {
      const message = this.exceptionShortMessage(exception.message);
      super.catch(
        new HttpException(
          { message, statusCode: 500 },
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
        host,
      );
    }
  }
  private exceptionShortMessage(message: string): string {
    const shortMessage = message.substring(message.indexOf('→'));

    return (
      'Database Error: ' +
      shortMessage
        .substring(shortMessage.indexOf('\n'))
        .replace(/\n/g, '')
        .trim()
    );
  }
}
