import { Injectable } from '@nestjs/common';
import { SubmitCommentDto } from 'src/comments/dto/SubmitCommentDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VideoCommentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getProductComments(id: string) {
    const comments = await this.prismaService.videoComments.findMany({
      where: {
        course_id: Number(id),
      },
    });
    return { comments: comments };
  }

  async submitComment(id: string, dto: SubmitCommentDto) {
    console.log(id);
    const comment = await this.prismaService.videoComments.create({
      data: {
        course_id: Number(id),
        user_id: Number(dto.userId),
        comment: dto.comment,
        username: dto.username,
      },
    });
  }
}
