import { Body, Controller, Get, Post } from '@nestjs/common';
import { FiltersService } from './filters.service';
import { filtersDto } from './dto/filtersDto';

@Controller('filters')
export class FiltersController {
  constructor(private readonly filterService: FiltersService) {}

  @Get('')
  getFilters() {
    return this.filterService.getFilters();
  }

  @Get('/filteritems')
  getFilterItems() {
    return this.filterService.getFilterItems();
  }

  @Post('/newfilter')
  addFilter(@Body() dto: filtersDto) {
    return this.filterService.addFilter(dto);
  }
}
