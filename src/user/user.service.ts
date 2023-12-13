import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserInfoDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { UserOPDTO } from './dto/userOPDto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  getOrders() {
    const orders = [
      {
        item: 'deck',
        totalPrice: 20000,
      },
      {
        item: 'deck',
        totalPrice: 20000,
      },
      {
        item: 'deck',
        totalPrice: 20000,
      },
      {
        item: 'deck',
        totalPrice: 20000,
      },
      {
        item: 'deck',
        totalPrice: 20000,
      },
    ];
    return orders;
  }

  // profile service functions

  async submitInfo(dto: UserInfoDto, username: string) {
    console.log(dto, ' this is dto');
    const user = await this.prismaService.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!user) {
      throw new NotAcceptableException('نام کاربری پیدا نشد');
    }

    const updatedUser = await this.prismaService.user.updateMany({
      where: {
        username: username,
      },
      data: {
        fullname: dto.fullname,
        city: dto.city,
        region: dto.region,
        address: dto.address,
        phonenumber: dto.phonenumber,
        postalCode: dto.postalCode,
        email: dto.email,
      },
    });
    return { msg: 'properties have been updated', user: updatedUser };
  }

  async getUsername(dto: UserOPDTO) {
    const username = await this.prismaService.user.findUnique({
      where: {
        id: Number(dto.userId),
      },
      select: {
        username: true,
        id: true,
      },
    });
    return { username: username };
  }

  async getProfile(username: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!user) {
      throw new NotAcceptableException('نام کاربری پیدا نشد');
    }
    return {
      data: {
        fullname: user.fullname,
        phonenumber: user.phonenumber,
        city: user.city,
        region: user.region,
        address: user.address,
        postalCode: user.postalCode,
        email: user.email,
      },
    };
  }
}
