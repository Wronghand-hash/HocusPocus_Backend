import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentsDto } from './dto/CommentsDto';
import { SubmitCommentDto } from './dto/SubmitCommentDto';

@Injectable()
export class CommentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getProductComments(id: string) {
    const comments = await this.prismaService.comments.findMany({
      where: {
        product_id: Number(id),
      },
    });
    return { comments: comments };
  }

  async submitComment(id: string, dto: SubmitCommentDto) {
    const comment = await this.prismaService.comments.create({
      data: {
        rating: dto.rating,
        product_id: Number(id),
        user_id: Number(dto.userId),
        comment: dto.comment,
        username: dto.username,
      },
    });
  }

  async submitVideoComment(id: string, dto: SubmitCommentDto) {
    const comment = await this.prismaService.comments.create({
      data: {
        product_id: Number(id),
        user_id: Number(dto.userId),
        comment: dto.comment,
        username: dto.username,
      },
    });
  }
}
