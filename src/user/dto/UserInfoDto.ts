/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserInfoDto {
  @IsNotEmpty({ message: 'لطفا ایمیل خود را وارد کنید' })
  email: string;

  fullname: string;

  phoneNumber: string;

  address: string;

  postalCode: string;

  city: string;

  region: string;
}
