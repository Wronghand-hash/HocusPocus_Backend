import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { EditsService } from './edits.service';
import { Roles } from 'src/auth/common/decorators/Role.decorator';
import { AuthenticatedGuard } from 'src/auth/authGuards/authenticated.guards';
import { RolesGuard } from 'src/auth/common/guards/roleBased.guard';
import { EditDto } from './dto/EditsDto';

@Controller('edits')
export class EditsController {
  constructor(private readonly editServices: EditsService) {}

  @Roles('ADMIN') // Only admin role allowed
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Post('/updateproduct')
  updateProduct(@Body() dto: EditDto) {
    return this.editServices.updateProduct(dto);
  }

  @Roles('ADMIN') // Only admin role allowed
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Post('/updatecourse')
  updateCourse(@Body() dto: EditDto) {
    return this.editServices.updateCourse(dto);
  }
}
