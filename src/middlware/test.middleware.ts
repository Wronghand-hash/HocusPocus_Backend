/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class testLogger implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('we have this', req, res);
    next();
  }
}
