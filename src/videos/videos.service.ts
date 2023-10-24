import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VideosService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllCourses() {
    const courses = await this.prismaService.courses.findMany({
      select: {
        id: true,
        created_at: true,
        title: true,
        preview: true,
        price: true,
        description: true,
        trainer: true,
        CoursesImages: true,
      },
    });
    return { courses: courses };
  }

  async getCourseById(id: string) {
    const course = await this.prismaService.courses.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        created_at: true,
        title: true,
        preview: true,
        price: true,
        description: true,
        trainer: true,
        CoursesImages: true,
        file: true,
      },
    });

    return { course: course };
  }

  async getLatestCourse() {
    const course = await this.prismaService.courses.findMany({
      orderBy: {
        created_at: 'desc',
      },
      take: 1,
      select: {
        id: true,
        created_at: true,
        title: true,
        preview: true,
        price: true,
        description: true,
        trainer: true,
        CoursesImages: true,
      },
    });

    return { course: course };
  }

  async getFourBeforeOne() {
    const courses = await this.prismaService.courses.findMany({
      orderBy: {
        created_at: 'desc',
      },
      skip: 1,
      take: 4,
      select: {
        id: true,
        created_at: true,
        title: true,
        preview: true,
        price: true,
        description: true,
        trainer: true,
        CoursesImages: true,
      },
    });
    return { courses: courses };
  }
  async getImageById(id: string) {
    const image = await this.prismaService.coursesImages.findUnique({
      where: {
        id: Number(id),
      },
    });

    const imageDataURL = `data:image/jpeg;base64,${image.buffer}`;
    return { image: imageDataURL };
  }
}
