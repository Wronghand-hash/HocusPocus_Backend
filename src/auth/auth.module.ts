/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma/prisma.module';
import { AtStrategy, RtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/localAuth.Strategy';
import { SessionSerializer } from './serializer/session.serializer';

@Module({
  imports: [PrismaModule, PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [
    AuthService,
    RtStrategy,
    AtStrategy,
    LocalStrategy,
    SessionSerializer,
  ],
})
export class AuthModule {}
