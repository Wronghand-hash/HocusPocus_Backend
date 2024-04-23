import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from './dto/PaginationDto';
import { DiscountDto } from './dto/DiscountDto';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}
  async getAllProducts() {
    const products = await this.prismaService.products.findMany({
      where: {
        mode: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 8,
      select: {
        id: true,
        title: true,
        price: true,
        category: true,
        discount: true,
        cover: true,
        quantity: true,
        ProductImages: {
          take: 2,
        },
      },
    });
    return { products: products };
  }

  async getPagination(page: string) {
    const products = await this.prismaService.products.findMany({
      orderBy: {
        id: 'desc',
      },
      take: 8,
      skip: Number(page) * 8,
      select: {
        createdAt: true,
        id: true,
        title: true,
        cover: true,
        price: true,
        brand: true,
        type: true,
        design: true,
        discount: true,
        quantity: true,
        category: true,
        description: true,
        ProductImages: { take: 2 },
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
        cover: true,
        design: true,
        discount: true,
        quantity: true,
        category: true,
        description: true,
        ProductImages: { take: 1 },
      },
    });

    return { product: product };
  }

  async getSpecialOffers() {
    const products = await this.prismaService.products.findMany({
      where: {
        special_offer: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 4,
      select: {
        createdAt: true,
        id: true,
        title: true,
        price: true,
        brand: true,
        type: true,
        cover: true,
        design: true,
        discount: true,
        quantity: true,
        category: true,
        description: true,
        ProductImages: { take: 1 },
      },
    });

    return { products: products };
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
        cover: true,
        design: true,
        category: true,
        description: true,
        ProductImages: { take: 2 },
      },
    });
    return { products: products };
  }

  async getDiscounted() {
    const products = await this.prismaService.products.findMany({
      where: { discount: { not: null } },
      select: {
        createdAt: true,
        id: true,
        title: true,
        price: true,
        discount: true,
        brand: true,
        type: true,
        design: true,
        cover: true,
        category: true,
        description: true,
        ProductImages: { take: 2 },
      },
    });
    return { products: products };
  }

  async getFilter(page: string, filter: string) {
    // const products = await this.prismaService.products.findMany({
    //   where: { discount: { not: null } },
    //   select: {
    //     createdAt: true,
    //     id: true,
    //     title: true,
    //     price: true,
    //     discount: true,
    //     brand: true,
    //     type: true,
    //     design: true,
    //     category: true,
    //     description: true,
    //   },
    // });
    // return { products: products };
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
        cover: true,
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

  async searchProducts(body: any) {
    console.log('the one you are looking for ', body.text + '*');
    const searchResults = await this.prismaService.products.findMany({
      where: {
        OR: [
          { title: { contains: body.text } },
          { description: { contains: body.text } },
          { title: { contains: body.text + '*' } }, // Wildcard at the end
          { description: { contains: body.text + '*' } }, // Wildcard at the end
          { title: { contains: '*' + body.text } }, // Wildcard at the beginning
          { description: { contains: '*' + body.text } }, // Wildcard at the beginning
          { title: { contains: '*' + body.text + '*' } }, // Wildcard at both ends
          { description: { contains: '*' + body.text + '*' } }, // Wildcard at both ends
        ],
      },
      select: {
        createdAt: true,
        id: true,
        title: true,
        price: true,
        discount: true,
        brand: true,
        type: true,
        design: true,
        category: true,
        description: true,
        ProductImages: { take: 2 },
      },
    });

    return searchResults;
  }

  async validateDiscount(dto: DiscountDto) {
    let check = false;
    const discount = await this.prismaService.discounts.findUnique({
      where: {
        code: dto.code,
      },
      select: {
        valid: true,
        perc: true,
      },
    });
    if (discount) {
      check = true;
    }
    const update = await this.prismaService.discounts.update({
      where: {
        code: dto.code,
      },
      data: {
        valid: false,
      },
    });
    return { check: check, perc: discount.perc, valid: discount.valid };
  }
}
