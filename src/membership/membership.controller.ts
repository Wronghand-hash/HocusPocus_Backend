import { Controller, Post, Body } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { UserMembership } from './dto/UserMembership';
import { MembershipItemDto } from './dto/MembershipItemDto';

@Controller('membership')
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @Post('/usermembership')
  getUserMembership(@Body() dto: UserMembership) {
    return this.membershipService.getUserMembership(dto);
  }

  @Post('/membershipitems')
  getMembershipItems(@Body() dto: MembershipItemDto) {
    return this.membershipService.getMembershipItems(dto);
  }
}
