/* eslint-disable prettier/prettier */
import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JWTService {
  constructor(private prisma: PrismaService) {}

  async createToken(email, roles) {
    const expiresIn = process.env.EXPIRESIN,
      secretOrKey = process.env.SECRETORKEY;
    const userInfo = { email: email, roles: roles };
    const token = jwt.sign(userInfo, secretOrKey, { expiresIn });
    return {
      expires_in: expiresIn,
      access_token: token,
    };
  }

  async validateUser(signedUser) {
    const user = await this.prisma.user.findFirstOrThrow({
      where: {
        email: signedUser.email,
      },
    });
    if (user) {
      return user;
    }
    return null;
  }
}
