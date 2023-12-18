import { Controller, Get, Param, Body, Post, UseGuards } from '@nestjs/common';
import { VideosService } from './videos.service';
import { SubmitOrderDto } from './dto/SubmitOrderDto';
import { MembershipItem } from './dto/MembershipItem';
import { AuthenticatedGuard } from 'src/auth/authGuards/authenticated.guards';

@Controller('videos')
export class VideosController {
  constructor(private readonly videoServices: VideosService) {}

  @Get('')
  getAll() {
    return this.videoServices.getAllCourses();
  }

  @Get('latest')
  getLatest() {
    return this.videoServices.getLatestCourse();
  }

  @Get('lastfour')
  getLastFour() {
    return this.videoServices.getFourBeforeOne();
  }

  @Get(':id')
  getProductsById(@Param('id') id: string) {
    return this.videoServices.getCourseById(id);
  }

  @Get('image/:id')
  getImageById(@Param('id') id: string) {
    return this.videoServices.getImageById(id);
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/submit')
  submitOrder(@Body() dto: SubmitOrderDto) {
    return this.videoServices.submitOrder(dto);
  }

  @Post('/submititems')
  submitOrderItems(@Body() dto: MembershipItem) {
    return this.videoServices.submitItems(dto);
  }
}
