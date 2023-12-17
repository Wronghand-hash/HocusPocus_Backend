import { Injectable } from '@nestjs/common';
import { UserMembership } from './dto/UserMembership';
import { PrismaService } from 'src/prisma/prisma.service';
import { MembershipItemDto } from './dto/MembershipItemDto';

@Injectable()
export class MembershipService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserMembership(dto: UserMembership) {
    const memberships = await this.prismaService.membership.findMany({
      where: {
        user_id: Number(dto.userId),
      },
    });

    return { memberships: memberships };
  }

  async getMembershipItems(dto: MembershipItemDto) {
    if (dto) {
      const membershipItems = await this.prismaService.membershipItem.findMany({
        where: {
          membership_id: Number(dto.membership_id),
        },
      });
      return { membershipItems: membershipItems };
    }
  }
}
