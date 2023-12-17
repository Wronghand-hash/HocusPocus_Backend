import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { filtersDto } from './dto/filtersDto';

@Injectable()
export class FiltersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getFilters() {
    const filters = await this.prismaService.filters.findMany({});

    return { filters: filters };
  }

  async getFilterItems() {
    const filters = await this.prismaService.filterItems.findMany({});

    return { filters: filters };
  }

  async addFilter(dto: filtersDto) {
    const filterItem = await this.prismaService.filterItems.create({
      data: {
        filter_id: Number(dto.filterId),
        name: dto.name,
      },
    });

    return { filteritem: filterItem };
  }
}
