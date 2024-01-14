/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PaymentRecordsService } from './payment-records.service';
import { PaymentRecordsController } from './payment-records.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PaymentRecordsService],
  controllers: [PaymentRecordsController],
})
export class PaymentRecordsModule {}
