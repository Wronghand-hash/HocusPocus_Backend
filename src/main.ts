/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import { default as Redis } from 'ioredis';
import * as connectRedis from 'connect-redis';
import * as bodyParser from 'body-parser';

import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as multer from 'multer';
// import { createClient } from 'redis';

// const redisClient = createClient({
//   legacyMode: true,
// });
// redisClient.connect().catch(console.error);

// const RedisStore = connectRedis(session);
// const redisClient = new Redis();

multer({ dest: 'uploads/' });

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: false,
  });
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.enableCors({
    origin: process.env.ORIGIN,
    methods: 'GET, PUT, POST, DELETE , OPTIONS',
    allowedHeaders: '*',
    preflightContinue: false,
    credentials: true,
  });
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.set('trust proxy', 1);
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,

      cookie: {
        secure: true,
        httpOnly: true,
        maxAge: 60000 * 5 * 2 * 3,
        sameSite: 'none',
        domain: process.env.DOMAIN,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
