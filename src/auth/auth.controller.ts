/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Request,
  Post,
  UseGuards,
  Res,
  Get,
  Session,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './common/guards/local.guard';
import { Response } from 'express';
import { RolesGuard } from './common/guards/roleBased.guard';
import { Roles } from './common/decorators/Role.decorator';
import { AuthenticatedGuard } from './authGuards/authenticated.guards';
import { RecoveryDto } from './dto/RecoveryDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    console.log(dto);
    return this.authService.signup(dto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  signIn(@Res({ passthrough: true }) res: Response, @Body() dto: AuthDto) {
    return {
      msg: 'User logged in',
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/isauthenticated')
  getProfile(@Session() session: Record<string, any>) {
    return this.authService.isAuthenticated(session.passport.user.username);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/isauth')
  getUser(@Session() session: Record<string, any>) {
    return this.authService.getUser(session.passport.user.username);
  }

  // @UseGuards(AtGuard)
  // @Post('logout')
  // logout(@GetCurrentUser('sub') userId: number) {
  //   return this.authService.logout(userId);
  // }

  @Roles('ADMIN')
  @UseGuards(LocalAuthGuard, RolesGuard)
  @Get('/getme')
  getMe() {
    return { msg: 'you should see this now' };
  }

  @Post('reset')
  reset(@Body() dto: RecoveryDto) {
    console.log(dto);
    return this.authService.resetPass(dto);
  }

  @Get('/logout')
  logout(@Request() req, @Res() res: Response) {
    req.logout(() => {
      res.redirect('/');
    });
  }
}
