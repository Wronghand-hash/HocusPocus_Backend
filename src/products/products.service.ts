import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}
  async getAllProducts() {
    const products = await this.prismaService.products.findMany({
      select: {
        id: true,
        title: true,
        price: true,
        brand: true,
        type: true,
        category: true,
        design: true,
        ProductImages: true,
      },
    });
    return { products: products };
  }

  async getLatestProduct() {
    const product = await this.prismaService.products.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 1,
      select: {
        createdAt: true,
        id: true,
        title: true,
        price: true,
        brand: true,
        type: true,
        design: true,
        category: true,
        description: true,
        ProductImages: true,
      },
    });

    return { product: product };
  }

  async getFourBeforeOne() {
    const products = await this.prismaService.products.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      skip: 1,
      take: 4,
      select: {
        createdAt: true,
        id: true,
        title: true,
        price: true,
        brand: true,
        type: true,
        design: true,
        category: true,
        description: true,
        ProductImages: true,
      },
    });
    return { products: products };
  }

  async getProductById(id: string) {
    const product = await this.prismaService.products.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        title: true,
        price: true,
        brand: true,
        type: true,
        design: true,
        category: true,
        description: true,
        ProductImages: true,
      },
    });

    return { product: product };
  }

  async getImageById(id: string) {
    const image = await this.prismaService.productImages.findUnique({
      where: {
        id: Number(id),
      },
    });

    const imageDataURL = `data:image/jpeg;base64,${image.buffer}`;
    return { image: imageDataURL };
  }
}
