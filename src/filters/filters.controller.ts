import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { FiltersService } from './filters.service';
import { filtersDto } from './dto/filtersDto';
import { AuthenticatedGuard } from 'src/auth/authGuards/authenticated.guards';
import { RolesGuard } from 'src/auth/common/guards/roleBased.guard';
import { Roles } from 'src/auth/common/decorators/Role.decorator';

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

  @Roles('ADMIN') // Only admin role allowed
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Post('/newfilter')
  addFilter(@Body() dto: filtersDto) {
    return this.filterService.addFilter(dto);
  }
  @Roles('ADMIN') // Only admin role allowed
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Post('/remove/:id')
  removeFilter(@Param('id') id: string) {
    console.log(id);
    return this.filterService.removeFilter(id);
  }
}
