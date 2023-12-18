import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { UserMembership } from './dto/UserMembership';
import { MembershipItemDto } from './dto/MembershipItemDto';
import { Roles } from 'src/auth/common/decorators/Role.decorator';
import { AuthenticatedGuard } from 'src/auth/authGuards/authenticated.guards';

@Controller('membership')
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @Roles('ADMIN') // Only admin role allowed
  @UseGuards(AuthenticatedGuard)
  @Post('/usermembership')
  getUserMembership(@Body() dto: UserMembership) {
    return this.membershipService.getUserMembership(dto);
  }

  @Roles('ADMIN') // Only admin role allowed
  @UseGuards(AuthenticatedGuard)
  @Post('/membershipitems')
  getMembershipItems(@Body() dto: MembershipItemDto) {
    return this.membershipService.getMembershipItems(dto);
  }
}
