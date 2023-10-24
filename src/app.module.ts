/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { ManagementModule } from './management/management.module';
import { VideosModule } from './videos/videos.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule,
    UserModule,
    AuthModule,
    PrismaModule,
    ProductsModule,
    OrdersModule,
    ManagementModule,
    VideosModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
