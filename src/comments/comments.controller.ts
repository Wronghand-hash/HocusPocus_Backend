import { Controller, Param, Get, Post, Body } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { SubmitCommentDto } from './dto/SubmitCommentDto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Get(':id')
  getProductsById(@Param('id') id: string) {
    return this.commentService.getProductComments(id);
  }

  @Post(':id')
  submitProductComment(@Param('id') id: string, @Body() dto: SubmitCommentDto) {
    return this.commentService.submitComment(id, dto);
  }
}
