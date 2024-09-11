/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPassword {
  @IsString()
  @IsNotEmpty({ message: 'لطفا پسوورد خود را وارد کنید' })
  readonly newPassword: string;

  readonly newPasswordToken: string;
}
