/* eslint-disable prettier/prettier */
import {
  Injectable,
  ForbiddenException,
  NotAcceptableException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Tokens } from './types';
import { RecoveryDto } from './dto/RecoveryDto';
@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateUser(userName: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: {
        username: userName,
      },
    });
    const pwMatch = await argon.verify(user.password, password);
    if (!user) {
      throw new ForbiddenException('user doesnt exists');
    }
    if (user && pwMatch) {
      return {
        userId: user.id,
        username: user.username,
        role: user.role,
      };
    }
    return null;
  }

  async isAuthenticated(username: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!user) {
      throw new NotAcceptableException('نام کاربری پیدا نشد');
    }
    return {
      userId: user.id,
    };
  }

  async getUser(username: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!user) {
      throw new NotAcceptableException('نام کاربری پیدا نشد');
    }
    return {
      userId: user.id,
      username: user.username,
    };
  }

  // async getTokens(userId: number, email: string): Promise<Tokens> {
  //   const [at, rt] = await Promise.all([
  //     this.jwtService.signAsync(
  //       {
  //         sub: userId,
  //         email,
  //       },
  //       {
  //         expiresIn: 60 * 15,
  //         secret: 'at-secret',
  //       },
  //     ),
  //     this.jwtService.signAsync(
  //       {
  //         sub: userId,
  //         email,
  //       },
  //       { expiresIn: 60 * 60 * 24 * 7, secret: 'rt-secret' },
  //     ),
  //   ]);

  //   return {
  //     access_token: at,
  //     refresh_token: rt,
  //   };
  // }

  async signup(dto: AuthDto) {
    // generate the hash password
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          username: dto.username,
          email: dto.email,
          password: hash,
        },
      });
      //delete user.hash;
      // return the saved user
      // const tokens = await this.getTokens(user.id, user.email);
      // await this.updateRT(user.id, tokens.refresh_token);
      // return tokens;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('نام کاربری قبلا استفاده شده');
        }
        throw error;
      }
    }
    // save the user into the dataabase
  }

  async resetPass(dto: RecoveryDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
      },
    });
    if (!user) {
      throw new NotAcceptableException('نام کاربری پیدا نشد');
    }

    // generate the hash password
    const hash = await argon.hash(dto.password);
    const updatedUser = await this.prisma.user.update({
      where: {
        username: dto.username,
      },
      data: {
        password: hash,
      },
    });
    // save the user into the dataabase
  }

  async getForgetPasswordModel(token: string) {
    const forgottenPassword = await this.prisma.forgottenPassword.findFirst({
      where: {
        token: token,
      },
    });

    return forgottenPassword;
  }

  async setPassword(email: string, newPassword: string): Promise<boolean> {
    const hash = await argon.hash(newPassword);
    const userFromDb = await this.prisma.user.update({
      where: { email: email },
      data: {
        password: hash,
      },
    });
    if (!userFromDb)
      throw new HttpException('LOGIN.USER_NOT_FOUND', HttpStatus.NOT_FOUND);

    console.log('till here');

    return true;
  }

  async createForgottenPasswordToken(email: string) {
    const forgottenPassword = await this.prisma.forgottenPassword.findUnique({
      where: {
        email: email,
      },
    });
    if (
      forgottenPassword &&
      (new Date().getTime() - forgottenPassword.date.getTime()) / 60000 < 15
    ) {
      throw new HttpException(
        'RESET_PASSWORD.EMAIL_SENT_RECENTLY',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } else if (forgottenPassword) {
      const forgottenPasswordModel = await this.prisma.forgottenPassword.update(
        {
          where: {
            email: email,
          },
          data: {
            email: email,
            token: (Math.floor(Math.random() * 9000000) + 1000000).toString(), //Generate 7 digits number,
            date: new Date(),
          },
        },
      );
      if (forgottenPasswordModel) {
        return forgottenPasswordModel;
      } else {
        throw new HttpException(
          'LOGIN.ERROR.GENERIC_ERROR',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      const forgottenPasswordModel = await this.prisma.forgottenPassword.create(
        {
          data: {
            email: email,
            token: (Math.floor(Math.random() * 9000000) + 1000000).toString(), //Generate 7 digits number,
            date: new Date(),
          },
        },
      );
      if (forgottenPasswordModel) {
        return forgottenPasswordModel;
      } else {
        throw new HttpException(
          'LOGIN.ERROR.GENERIC_ERROR',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async sendEmailForgotPassword(email: string): Promise<boolean> {
    console.log(email);
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user)
      throw new HttpException('LOGIN.USER_NOT_FOUND', HttpStatus.NOT_FOUND);

    console.log(user);
    const tokenModel = await this.createForgottenPasswordToken(email);
    if (user) {
      return true;
    }
    if (tokenModel && tokenModel.token) {
      // let transporter = nodemailer.createTransport({
      //   host: config.mail.host,
      //   port: config.mail.port,
      //   secure: config.mail.secure, // true for 465, false for other ports
      //   auth: {
      //     user: config.mail.user,
      //     pass: config.mail.pass,
      //   },
      // });

      // let mailOptions = {
      //   from: '"Company" <' + config.mail.user + '>',
      //   to: email, // list of receivers (separated by ,)
      //   subject: 'Frogotten Password',
      //   text: 'Forgot Password',
      //   html:
      //     'Hi! <br><br> If you requested to reset your password<br><br>' +
      //     '<a href=' +
      //     config.host.url +
      //     ':' +
      //     config.host.port +
      //     '/auth/email/reset-password/' +
      //     tokenModel.newPasswordToken +
      //     '>Click here</a>', // html body
      // };

      // var sent = await new Promise<boolean>(async function (resolve, reject) {
      //   return await transporter.sendMail(mailOptions, async (error, info) => {
      //     if (error) {
      //       console.log('Message sent: %s', error);
      //       return reject(false);
      //     }
      //     console.log('Message sent: %s', info.messageId);
      //     resolve(true);
      //   });
      // });

      return true;
    } else {
      throw new HttpException(
        'REGISTER.USER_NOT_REGISTERED',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  // async updateRT(userId: number, rt: string) {
  //   const hash = await argon.hash(rt);
  //   await this.prisma.user.update({
  //     where: {
  //       id: userId,
  //     },
  //     data: {
  //       rt: hash,
  //     },
  //   });
  // }

  // async signIn(dto: AuthDto): Promise<Tokens> {
  //   const user = await this.prisma.user.findUnique({
  //     where: {
  //       email: dto.email,
  //     },
  //   });
  //   if (!user) {
  //     throw new ForbiddenException('incorrect credentials');
  //   }

  //   const pwMatch = await argon.verify(user.password, dto.password);

  //   if (pwMatch) {
  //     // const tokens = await this.getTokens(user.id, user.email);
  //     // await this.updateRT(user.id, tokens.refresh_token);
  //     // return tokens;
  //   } else {
  //     console.log('it is over');
  //   }

  //   return null;
  // }

  // async logout(userId: number) {
  //   await this.prisma.user.updateMany({
  //     where: {
  //       id: userId,
  //     },
  //     data: {
  //       rt: null,
  //     },
  //   });
  // }

  async refreshToken(userId: number, rt: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // if (!user) throw new ForbiddenException('credentials not found');

    // const rtMatches = await argon.verify(rt, user.rt);

    // if (!rtMatches) throw new ForbiddenException('invalid token');

    // const tokens = await this.getTokens(user.id, user.email);
    // await this.updateRT(user.id, tokens.refresh_token);
    // return tokens;
  }
}
