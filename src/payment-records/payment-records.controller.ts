import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { PaymentRecordsService } from './payment-records.service';
import { PaymentRecordsDto } from './dto/PaymentRecordsDto';
import { Response } from 'express';
import axios from 'axios';
import { GatewayInfoDto } from './dto/GatewayInfoDto';
import { VerifyPaymentDto } from './dto/VerifyPaymentDto';

@Controller('payment-records')
export class PaymentRecordsController {
  constructor(private readonly paymentRecordsServices: PaymentRecordsService) {}

  @Post('/togateway')
  async makePaymentRequest(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: GatewayInfoDto,
  ) {
    const data = JSON.stringify({
      merchant_id: process.env.MERCHANT_ID,
      amount: dto.amount,
      callback_url: 'http://localhost:3000/shop/purchaseSuccess',
      description: 'Transaction description.',
      metadata: {
        mobile: dto.phoneNumber,
        email: dto.email,
      },
    });

    const body = {
      email: dto.email,
      amount: dto.amount,
      phoneNumber: dto.phoneNumber,
      userId: dto.userId,
      orderId: dto.orderId,
      name: dto.name,
    };
    const config = {
      url: 'https://api.zarinpal.com/pg/v4/payment/request.json',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data: data,
    };

    try {
      let authCode = '';
      const response = await axios(config);
      console.log(response.data);
      // const url = `https://www.zarinpal.com/pg/StartPay/${response.data.data.authority}`;
      res.json(response.data);
      authCode = response.data.data.authority;
      this.updateAuth(authCode, body.orderId);
      this.addrecord(body, authCode);
    } catch (error) {
      console.log(error);
    }
  }

  @Post('/verify')
  async paymentVerify(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: VerifyPaymentDto,
  ) {
    const data = JSON.stringify({
      merchant_id: process.env.MERCHANT_ID,
      amount: dto.amount,
      authority: dto.authority,
    });

    const config = {
      url: 'https://api.zarinpal.com/pg/v4/payment/verify.json',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data: data,
    };

    try {
      const response = await axios(config);
      console.log(response.data);
      // const url = `https://www.zarinpal.com/pg/StartPay/${response.data.data.authority}`;
      res.json(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  @Post('/addrecord')
  addrecord(body, authCode: string) {
    return this.paymentRecordsServices.addRecord(body, authCode);
  }

  @Post('')
  updateAuth(auth: string, orderId: string) {
    return this.paymentRecordsServices.updateAuth(auth, orderId);
  }

  @Post('/updateorder/:auth')
  updateOrder(@Param('auth') auth: string) {
    return this.paymentRecordsServices.updateOrder(auth);
  }

  @Get('/management/getrecords')
  getRecords() {
    return this.paymentRecordsServices.getRecords();
  }
}
