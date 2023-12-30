import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { PaginationDto } from './dto/PaginationDto';
import { DiscountDto } from './dto/DiscountDto';

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

  @Get('/filter/:page/:filter')
  getFilter(@Param('page') page: string, @Param('filter') filter: string) {
    return this.productService.getFilter(page, filter);
  }

  @Get('latest')
  getLatest() {
    return this.productService.getLatestProduct();
  }

  @Get('lastfour')
  getLastFour() {
    return this.productService.getFourBeforeOne();
  }

  @Get('discounts')
  getDiscounted() {
    return this.productService.getDiscounted();
  }

  @Get(':id')
  getProductsById(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }

  @Get('image/:id')
  getImageById(@Param('id') id: string) {
    return this.productService.getImageById(id);
  }

  @Post('search')
  searchProducts(@Param('text') text: string) {
    return this.productService.searchProducts(text);
  }

  @Post('/validatecode')
  validateCode(@Body() dto: DiscountDto) {
    console.log(dto);
    return this.productService.validateDiscount(dto);
  }
}
