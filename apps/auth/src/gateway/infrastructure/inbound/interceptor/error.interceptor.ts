import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CheckRejectedInterceptor implements NestInterceptor {
  ERROR_MAPPER = {
    balance_not_found: {
      code: 404,
      message: 'Balance not found',
    },
    unauthorized_terminal: {
      code: 401,
      message: 'Unauthorized terminal',
    },
    currency_mismatch: {
      code: 400,
      message: 'Currency mismatch',
    },
  };
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data && data.status === 'error') {
          const error = this.ERROR_MAPPER[data.type];
          throw new HttpException(error.message, error.code);
        }
        return data;
      }),
    );
  }
}
