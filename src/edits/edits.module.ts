import { Module } from '@nestjs/common';
import { EditsController } from './edits.controller';
import { EditsService } from './edits.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EditsController],
  providers: [EditsService],
})
export class EditsModule {}
