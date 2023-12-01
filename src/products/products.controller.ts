import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { PaginationDto } from './dto/PaginationDto';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('/')
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get('/products/:page')
  getPagination(@Param('page') page: string) {
    return this.productService.getPagination(page);
  }

  @Get('latest')
  getLatest() {
    return this.productService.getLatestProduct();
  }

  @Get('lastfour')
  getLastFour() {
    return this.productService.getFourBeforeOne();
  }

  @Get(':id')
  getProductsById(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }

  @Get('image/:id')
  getImageById(@Param('id') id: string) {
    return this.productService.getImageById(id);
  }
}
