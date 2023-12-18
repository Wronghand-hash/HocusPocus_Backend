import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { VideoCommentsService } from './video-comments.service';
import { SubmitCommentDto } from 'src/comments/dto/SubmitCommentDto';
import { AuthenticatedGuard } from 'src/auth/authGuards/authenticated.guards';

@Controller('videocomments')
export class VideoCommentsController {
  constructor(private readonly videoCommentService: VideoCommentsService) {}

  @Get(':id')
  getProductsById(@Param('id') id: string) {
    return this.videoCommentService.getProductComments(id);
  }

  @UseGuards(AuthenticatedGuard)
  @Post(':id')
  submitProductComment(@Param('id') id: string, @Body() dto: SubmitCommentDto) {
    return this.videoCommentService.submitComment(id, dto);
  }
}
