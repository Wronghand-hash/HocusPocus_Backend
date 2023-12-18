import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  Session,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { LocalAuthGuard } from 'src/auth/common/guards/local.guard';
import { UserInfoDto } from './dto';
import { AuthenticatedGuard } from 'src/auth/authGuards/authenticated.guards';
import { UserOPDTO } from './dto/userOPDto';

@Controller('user')
export class UserController {
  constructor(private userServices: UserService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe() {
    return 'info';
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/username')
  getUsername(@Body() dto: UserOPDTO) {
    return this.userServices.getUsername(dto);
  }

  @Get('/orders')
  getOrders() {
    return this.userServices.getOrders();
  }

  @UseGuards(AuthenticatedGuard)
  @Post('submitinfo')
  submitInfo(
    @Body() dto: UserInfoDto,
    @Session() session: Record<string, any>,
  ) {
    return this.userServices.submitInfo(dto, session.passport.user.username);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/profileinfo')
  getProfile(@Session() session: Record<string, any>) {
    return this.userServices.getProfile(session.passport.user.username);
  }
}
