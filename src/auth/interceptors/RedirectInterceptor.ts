/* eslint-disable prettier/prettier */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RedirectInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    console.log(request.body.authority);
    const url = 'https://zarinpal.com/pg/StartPay/' + request.body.authority; // assuming the URL is passed in the request body
    response.redirect(url);
    return next.handle();
  }
}
