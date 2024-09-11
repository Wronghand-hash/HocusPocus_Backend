/* eslint-disable prettier/prettier */
import {
  Controller,
  UseInterceptors,
  Get,
  Body,
  Post,
  UseGuards,
  Param,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
} from '@nestjs/common';
import { Roles } from 'src/auth/common/decorators/Role.decorator';
import { LocalAuthGuard } from 'src/auth/common/guards/local.guard';
import { RolesGuard } from 'src/auth/common/guards/roleBased.guard';
import { ManagementService } from './management.service';
import { ManagementDto } from './dto/ManagementDto';
import { CategoryDto } from './dto/CategoryDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { VideosDto } from './dto/VideoDto';
import { AuthenticatedGuard } from 'src/auth/authGuards/authenticated.guards';
import { orderItemDto } from './dto/orderItemDto';
import { OrderStatusDto } from './dto/orderStatus';
import { ProductStatusDto } from './dto/productStatus';
import { MembershipItemDto } from './dto/MembershipItemDto';
import { DiscountDto } from './dto/discountDto';

@Controller('management')
export class ManagementController {
  constructor(private readonly managementService: ManagementService) {}

  // products requests

  @Roles('ADMIN') // Only admin role allowed
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Get('/products')
  getProducts() {
    return this.managementService.getProducts();
  }

  @Roles('ADMIN') // Only admin role allowed
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Post('/addproduct')
  addProduct(@Body() dto: ManagementDto) {
    return this.managementService.addProduct(dto);
  }

  @Roles('ADMIN')
  @UseGuards(LocalAuthGuard, RolesGuard)
  @Post('/updateProduct')
  updateProduct() {
    return { msg: 'here we will update some things' };
  }

  @Roles('ADMIN') // Only admin role allowed
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg||png||webp',
        })
        .addMaxSizeValidator({
          maxSize: 5000000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
    @Body() body: any,
  ) {
    const { filename, path } = file;
    return this.managementService.storeImage(file, body);
  }

  @Roles('ADMIN') // Only admin role allowed
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Post('cover')
  @UseInterceptors(FileInterceptor('file'))
  uploadCover(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg||png||webp',
        })
        .addMaxSizeValidator({
          maxSize: 5000000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
    @Body() body: any,
  ) {
    const { filename, path } = file;
    return this.managementService.storeCover(file, body);
  }

  @Roles('ADMIN') // Only admin role allowed
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Post('/removeproductimage/:id')
  removeProductImage(@Param('id') id: string) {
    return this.managementService.removeProductImage(id);
  }

  @Roles('ADMIN') // Only admin role allowed
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Post('/updateproductstatus')
  updateProductStatus(@Body() dto: ProductStatusDto) {
    return this.managementService.updateProductStatus(dto);
  }

  @Roles('ADMIN') // Only admin role allowed
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Post('/updateweekselection')
  updateProductWeekSelection(@Body() dto: ProductStatusDto) {
    return this.managementService.updateWeekSelection(dto);
  }

  @Roles('ADMIN') // Only admin role allowed
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Post('/deupdateproductstatus')
  deupdateProductStatus(@Body() dto: ProductStatusDto) {
    return this.managementService.deupdateProductStatus(dto);
  }

  @Roles('ADMIN') // Only admin role allowed
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Post('/deupdateweekselection')
  deupdateProductWeekSelection(@Body() dto: ProductStatusDto) {
    return this.managementService.deupdateWeekSelection(dto);
  }

  @Roles('ADMIN') // Only admin role allowed
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Post('/removeproduct/:id')
  removeProduct(@Param('id') id: string) {
    return this.managementService.removeProduct(id);
  }

  @Roles('ADMIN') // Only admin role allowed
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Post('/setdiscount/:id')
  setDiscount(@Param('id') id: string, @Body() dto: ProductStatusDto) {
    return this.managementService.setDiscount(id, dto);
  }

  @Roles('ADMIN') // Only admin role allowed
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Post('/enablemode')
  enableMode() {
    return this.managementService.enableMode();
  }

  @Roles('ADMIN') // Only admin role allowed
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Post('/deablemode')
  deableMode() {
    return this.managementService.deableMode();
  }

  // orders requests

  @Roles('ADMIN') // Only admin role allowed
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Get('/orders')
  getOrders() {
    return this.managementService.getOrders();
  }

  @Roles('ADMIN') // Only admin role allowed
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Post('/orderitems')
  getOrderItems(@Body() dto: orderItemDto) {
    return this.managementService.getOrderItems(dto);
  }

  @Roles('ADMIN') // Only admin role allowed
  @UseGuards(AuthenticatedGuard, RolesGuard)
  // @Roles('ADMIN')
  // @UseGuards(LocalAuthGuard, RolesGuard)
  @Post('/updateorderstatus')
  updateOrderState(@Body() dto: OrderStatusDto) {
    return this.managementService.updateOrderStatus(dto);
  }

  @Roles('ADMIN') // Only admin role allowed
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles('ADMIN')
  @UseGuards(LocalAuthGuard, RolesGuard)
  @Get('info')
  gettingDesiredInfo() {
    return { msg: 'return desired info from database' };
  }

  // membership requests

  @Roles('ADMIN') // Only admin role allowed
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Get('/memberships')
  getMemberships() {
    return this.managementService.getMemberships();
  }

  @Roles('ADMIN') // Only admin role allowed
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Post('/membershipitems')
  getMembershipItems(@Body() dto: MembershipItemDto) {
    return this.managementService.getMembershipItems(dto);
  }

  @Roles('ADMIN') // Only admin role allowed
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Post('/updatemembershipstat')
  updateMembershipStatus(@Body() dto: OrderStatusDto) {
    return this.managementService.updateMembershipStatus(dto);
  }

  // videos and training section requests

  @Roles('ADMIN') // Only admin role allowed
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Get('/courses')
  getAll() {
    return this.managementService.getAllCourses();
  }

  @Roles('ADMIN') // Only admin role allowed
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Post('/addvideo')
  @UseInterceptors(FileInterceptor('file'))
  uploadVideo(
    @UploadedFile(
      new ParseFilePipeBuilder().build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    file: Express.Multer.File,
    @Body() body: any,
  ) {
    return this.managementService.addVideo(file, body);
  }

  @Roles('ADMIN')
  @UseGuards(LocalAuthGuard, RolesGuard)
  @Post('/updatecourse')
  updateCourse() {
    return { msg: 'here we will update some things' };
  }

  // @Roles('ADMIN') // Only admin role allowed
  // @UseGuards(AuthenticatedGuard, RolesGuard)
  @Post('courseimageupload')
  @UseInterceptors(FileInterceptor('file'))
  uploadCourseImage(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg||png||webp',
        })
        .addMaxSizeValidator({
          maxSize: 5000000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
    @Body() body: any,
  ) {
    const { filename, path } = file;
    return this.managementService.storeCourseImage(file, body);
  }

  @Roles('ADMIN') // Only admin role allowed
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Post('/removecourseimage/:id')
  removeCourseImage(@Param('id') id: string) {
    return this.managementService.removeCourseImage(id);
  }

  @Roles('ADMIN') // Only admin role allowed
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Post('/removecourse/:id')
  removeCourse(@Param('id') id: string) {
    return this.managementService.removeCourse(id);
  }

  // category requests

  @Roles('ADMIN') // Only admin role allowed
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Post('/addcategory')
  addCategory(@Body() dto: CategoryDto) {
    return this.managementService.addCategory(dto);
  }

  @Roles('ADMIN') // Only admin role allowed
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Get('/categories')
  getCategories() {
    return this.managementService.getCategories();
  }

  // comment requests

  @Roles('ADMIN') // Only admin role allowed
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Post('/removecomment/:id')
  removeComment(@Param('id') id: string) {
    return this.managementService.removeComment(id);
  }

  @Roles('ADMIN') // Only admin role allowed
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Post('/removevideocomment/:id')
  removeCourseComment(@Param('id') id: string) {
    return this.managementService.removeCourseComment(id);
  }

  // dicount system

  @Get('/discounts')
  getDiscounts() {
    return this.managementService.getDiscounts();
  }

  @Post('/generatediscount')
  getDiscountCode(@Body() dto: DiscountDto) {
    console.log(dto);
    return this.managementService.getDiscountCode(dto);
  }

  @Post('/validatecode')
  validateCode(@Body() dto: DiscountDto) {
    return this.managementService.validateDiscount(dto);
  }

  // shippment cost

  @Post('updateshippmentcost')
  async updateShippment(@Body('cost') cost: string) {
    return await this.managementService.updateShippment(cost);
  }

  @Get('getShippmentCost')
  async getShippmentCost() {
    return await this.managementService.getShippmentCost();
  }
}
