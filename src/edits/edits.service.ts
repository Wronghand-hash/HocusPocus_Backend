import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditDto } from './dto/EditsDto';

@Injectable()
export class EditsService {
  constructor(private readonly prismaService: PrismaService) {}

  async updateProduct(dto: EditDto) {
    let instock = null;
    if (dto.inStock === 'false') {
      instock = false;
    } else if (dto.inStock === 'true') {
      instock = true;
    }
    const product = await this.prismaService.products.updateMany({
      where: {
        id: Number(dto.id),
      },
      data: {
        title: dto.title,
        price: Number(dto.price),
        description: dto.description,
        brand: dto.brand,
        category: dto.category,
        quantity: dto.quantity,
        inStock: instock,
        type: dto.type,
        design: dto.design,
      },
    });

    return { updatedProduct: product };
  }

  async updateCourse(dto: EditDto) {
    const course = await this.prismaService.courses.updateMany({
      where: {
        id: Number(dto.id),
      },
      data: {
        title: dto.title,
        description: dto.description,
        price: String(dto.price),
        trainer: dto.trainer,
      },
    });

    return { updatedCourse: course };
  }
}
