import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('/')
  getAllProducts() {
    return this.productService.getAllProducts();
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
