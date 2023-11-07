/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class RecoveryDto {
  @IsString()
  @IsNotEmpty({ message: 'لطفا پسوورد خود را وارد کنید' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'لطفا نام کاربری خود را وارد کنید' })
  username: string;
}
