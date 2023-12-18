import { Body, Controller, Param, Get, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersDto } from './dto/OrdersDto';
import { OrderItemsDto } from './dto/OrderItemsDto';
import { UserOrder } from './dto/UserOrder';
import { AuthenticatedGuard } from 'src/auth/authGuards/authenticated.guards';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @UseGuards(AuthenticatedGuard)
  @Post('/submit')
  submitOrder(@Body() dto: OrdersDto) {
    return this.ordersService.submitOrder(dto);
  }

  @Get(':id')
  getOrderById(@Param('id') id: string) {
    return this.ordersService.getOrderById(id);
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/userorder')
  getUserOrder(@Body() dto: UserOrder) {
    return this.ordersService.getUserOrder(dto);
  }

  @Post('/draft')
  submitDraft() {
    return this.ordersService.submitDraft();
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/submititems')
  submitOrderItems(@Body() dto: OrderItemsDto) {
    return this.ordersService.submitItems(dto);
  }
}
