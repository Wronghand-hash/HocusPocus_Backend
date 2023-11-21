/* eslint-disable prettier/prettier */
import { Injectable, ForbiddenException } from '@nestjs/common';
import { ManagementDto } from './dto/ManagementDto';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CategoryDto } from './dto/CategoryDto';
import { VideosDto } from './dto/VideoDto';
import { orderItemDto } from './dto/orderItemDto';
import { OrderStatusDto } from './dto/orderStatus';
import { ProductStatusDto } from './dto/productStatus';
import { MembershipItemDto } from './dto/MembershipItemDto';

@Injectable()
export class ManagementService {
  constructor(private readonly prismaService: PrismaService) {}

  // product services

  async addProduct(dto: ManagementDto) {
    console.log('functnio is running');

    const product = await this.prismaService.products.create({
      data: {
        title: dto.title,
        price: Number(dto.price),
        type: dto.type,
        brand: dto.brand,
        design: dto.design,
        quantity: dto.quantity,
        category: dto.category,
        description: dto.description,
      },
    });
    return { product: product };
  }

  async getProducts() {
    const products = await this.prismaService.products.findMany({
      orderBy: { id: 'asc' },
      select: {
        id: true,
        title: true,
        createdAt: true,
        price: true,
        category: true,
        brand: true,
        description: true,
        design: true,
        inStock: true,
        special_offer: true,
        discount: true,
        quantity: true,
        weeksSelection: true,
        Comments: true,
        ProductImages: {
          select: {
            id: true,
            product_id: true,
          },
        },
      },
    });
    return { products: products };
  }

  async updateProduct(dto: ManagementDto) {
    const product = await this.prismaService.products.updateMany({
      where: {
        id: Number(dto.productId),
      },
      data: {
        title: dto.title,
        price: dto.price,
        description: dto.description,
        brand: dto.brand,
        type: dto.type,
        design: dto.design,
      },
    });

    return { updatedProduct: product };
  }

  async storeImage(file: any, body: any) {
    const image = await this.prismaService.productImages.create({
      data: {
        filename: file.originalname,
        buffer: file.buffer.toString('base64'),
        product_id: Number(body.productId),
      },
    });

    return { data: image };
  }

  async updateProductStatus(dto: ProductStatusDto) {
    const product = await this.prismaService.products.update({
      where: {
        id: Number(dto.productId),
      },
      data: {
        special_offer: true,
      },
    });
    return { product: product };
  }

  async deupdateProductStatus(dto: ProductStatusDto) {
    const product = await this.prismaService.products.update({
      where: {
        id: Number(dto.productId),
      },
      data: {
        special_offer: false,
      },
    });
    return { product: product };
  }

  async updateWeekSelection(dto: ProductStatusDto) {
    const product = await this.prismaService.products.update({
      where: {
        id: Number(dto.productId),
      },
      data: {
        weeksSelection: true,
      },
    });
    return { product: product };
  }

  async deupdateWeekSelection(dto: ProductStatusDto) {
    const product = await this.prismaService.products.update({
      where: {
        id: Number(dto.productId),
      },
      data: {
        weeksSelection: false,
      },
    });
    return { product: product };
  }

  async setDiscount(id: string, dto: ProductStatusDto) {
    const product = await this.prismaService.products.update({
      where: {
        id: Number(id),
      },
      data: {
        discount: dto.discount,
      },
    });
    return { product: product };
  }

  async enableMode() {
    const product = await this.prismaService.products.updateMany({
      where: {
        type: 'کارت ها',
      },
      data: {
        mode: true,
      },
    });
    return { product: product };
  }

  async removeProductImage(id: string) {
    const image = await this.prismaService.productImages.delete({
      where: {
        id: Number(id),
      },
    });
    return { msg: 'image remove' };
  }

  async removeProduct(id: string) {
    const product = await this.prismaService.products.delete({
      where: {
        id: Number(id),
      },
    });

    return { msg: 'محصول حذف شد' };
  }

  // order functions

  async getOrders() {
    const orders = await this.prismaService.orders.findMany({});

    return { orders: orders };
  }

  async getOrderItems(dto: orderItemDto) {
    console.log(dto);
    if (dto) {
      const orderItems = await this.prismaService.orderItems.findMany({
        where: {
          order_id: Number(dto.orderId),
        },
      });
      return { orderItems: orderItems };
    }
  }

  async updateOrderStatus(dto: OrderStatusDto) {
    const order = await this.prismaService.orders.updateMany({
      where: {
        id: Number(dto.orderId),
      },
      data: {
        status: dto.status,
      },
    });

    return { order: order };
  }

  // membership functions

  async getMemberships() {
    const memberships = await this.prismaService.membership.findMany({});

    return { memberships: memberships };
  }

  async getMembershipItems(dto: MembershipItemDto) {
    console.log(dto);
    if (dto) {
      const membershipItems = await this.prismaService.membershipItem.findMany({
        where: {
          membership_id: Number(dto.membership_id),
        },
      });
      return { membershipItems: membershipItems };
    }
  }

  // category services

  async getCategories() {
    const categories = await this.prismaService.categories.findMany({});
    return { categories: categories };
  }

  async addCategory(dto: CategoryDto) {
    const category = await this.prismaService.categories.create({
      data: {
        title: dto.title,
      },
    });
    return { msg: 'کاتاگوی با موفقیت اضافه شد' };
  }

  // video services functions

  async getAllCourses() {
    const courses = await this.prismaService.courses.findMany({
      select: {
        id: true,
        created_at: true,
        title: true,
        preview: true,
        price: true,
        description: true,
        trainer: true,
        CoursesImages: true,
      },
    });
    return { courses: courses };
  }

  async addVideo(file: any, body: any) {
    console.log(file);
    const video = await this.prismaService.courses.create({
      data: {
        title: body.title,
        file: file.buffer,
        description: body.description,
        price: body.price,
        trainer: body.trainer,
      },
    });
    return { video };
  }

  async storeCourseImage(file: any, body: any) {
    console.log(file.buffer);
    const image = await this.prismaService.coursesImages.create({
      data: {
        filename: file.originalname,
        buffer: file.buffer.toString('base64'),
        course_id: Number(body.courseId),
      },
    });

    return { data: 'عکس اضافه شد' };
  }

  async removeCourseImage(id: string) {
    const image = await this.prismaService.coursesImages.delete({
      where: {
        id: Number(id),
      },
    });
    return { msg: 'image remove' };
  }

  async removeCourse(id: string) {
    const course = await this.prismaService.courses.delete({
      where: {
        id: Number(id),
      },
    });

    return { msg: 'محصول حذف شد' };
  }

  // Comments management

  async removeComment(id: string) {
    const comment = await this.prismaService.comments.delete({
      where: { id: Number(id) },
    });
  }
}
