import { Module } from '@nestjs/common';
import { VideoCommentsController } from './video-comments.controller';
import { VideoCommentsService } from './video-comments.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [VideoCommentsController],
  providers: [VideoCommentsService],
})
export class VideoCommentsModule {}
