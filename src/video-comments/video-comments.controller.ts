import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { VideoCommentsService } from './video-comments.service';
import { SubmitCommentDto } from 'src/comments/dto/SubmitCommentDto';

@Controller('videocomments')
export class VideoCommentsController {
  constructor(private readonly videoCommentService: VideoCommentsService) {}

  @Get(':id')
  getProductsById(@Param('id') id: string) {
    return this.videoCommentService.getProductComments(id);
  }

  @Post(':id')
  submitProductComment(@Param('id') id: string, @Body() dto: SubmitCommentDto) {
    return this.videoCommentService.submitComment(id, dto);
  }
}
